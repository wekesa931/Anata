import React, { useState, useEffect } from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import * as Yup from 'yup'
import { useLazyQuery } from '@apollo/client'
import { Button, CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import FormBuilder from './form-builder/form-builder.component'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'
import { useMember } from '../../../../../context/member.context'
import { V2MemberType } from '../../../../../types/member'
import {
  GET_INSURANCE_COMPANIES,
  LOOKUP_ENTRIES_QUERY,
} from '../../../../../gql/comms'
import { GET_ANTARA_STAFF } from '../../../../../gql/staff'
import logError from '../../../../utils/error_handling/sentry'
import PortalWindow from '../../../../lib/portal/portal.component'
import styles from '../biodata.component.css'
import { LookupOption, getFormFields } from './member-details.fields'
import ToastNotification, {
  defaultToastMessage,
  ToastMessage,
} from '../../../../utils/toast/toast-notification'

type MemberDetailsProps = {
  closeWindow: () => void
  successCb: (msg: string) => void
  errorCb: (error: string) => void
}

const phoneRe = /^(\+254|0)\d{9}$/

export const memberDetailsValidationSchema = Yup.object().shape({
  memberDetails: Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  }),
  memberPhones: Yup.array().of(
    Yup.object().shape({
      phone: Yup.string().matches(phoneRe, 'Invalid phone format.'),
    })
  ),
  memberContact: Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    emergencyContactPhone: Yup.string()
      .matches(phoneRe, 'Invalid phone format.')
      .nullable(),
  }),
  memberInsurance: Yup.array().of(
    Yup.object().shape({
      insuranceCompany: Yup.string().when('toDelete', {
        is: (val: any) => !val,
        then: Yup.string().required('Insurance company is required'),
      }),
      insuranceId: Yup.string().when(['insuranceCompany', 'toDelete'], {
        is: (val: string, toDelete: any) => val !== '' && !toDelete,
        then: Yup.string().required('Insurance ID is required'),
      }),
    })
  ),
})

export const createInitialFormState = (member: V2MemberType) => {
  const getInsurancesState = () => {
    const insuranceDetails = member?.insuranceDetails || []

    return insuranceDetails.map((e: any) => ({
      insuranceCompany: e?.insuranceCompany?.name,
      insuranceId: e?.insuranceId,
      benefits: e?.benefitUtilizations?.map((b: any) => b?.benefit?.name),
      priority: e?.priority,
      healthPolicy: e?.memberPolicy?.healthPolicy?.name,
      principalMemberInsuranceId: e?.principalMemberInsuranceId,
      relationshipToPrincipalMember: e?.relationshipToPrincipalMember,
    }))
  }

  // // get the memberAddress information
  const getMemberAddress = () => {
    const memberAddresses = member?.memberAddresses || []
    let constituency = ''

    const addresses = memberAddresses.map((e: any) => {
      if (e?.constituency) {
        constituency = e?.constituency
      }

      return {
        residentialAddress: {
          description: e?.residentialAddress,
          place_id: e?.geolocation,
          latitude: e?.latitude,
          longitude: e?.longitude,
          residentialCountry: e?.residentialCountry,
          residentialCounty: e?.residentialCounty,
          residentialTown: e?.residentialTown,
        },
        label: e?.label,
        deliveryInstructions: e?.deliveryInstructions,
      }
    })

    // filter out addresses with null geolocation
    const filteredAddresses = addresses.filter(
      (e: any) => e?.residentialAddress?.place_id
    )

    return filteredAddresses.map((a: any, i: number) => ({
      ...a,
      constituency,
      priority: i,
    }))
  }

  return {
    memberDetails: {
      birthDate: member?.birthDate,
      firstName: member?.firstName,
      lastName: member?.lastName,
      middleName: member?.middleName,
      sex: member?.sex,
      maritalStatus: member?.maritalStatus,
      primaryMemberAntaraId: member?.primaryMemberAntaraId,
    },
    memberPhones: member?.phones,
    memberContact: {
      email: member?.email,
      emergencyContactName: member?.emergencyContactName,
      emergencyContactPhone: member?.emergencyContactPhone,
      emergencyContactRelationship: member?.emergencyContactRelationship,
    },
    memberInsurance: [...getInsurancesState()],
    memberAddress: [...getMemberAddress()],
    memberStatus: {
      onboardStage: member?.onboardStage,
      status: member?.status,
      employer: member?.employer,
      tags: member?.tags,
    },
    memberStaff: {
      assignedHn: member?.assignedHn,
      assignedMe: member?.assignedMe,
    },
  }
}

const cleanObject = (obj: any) => {
  const cleanedObj = { ...obj }
  Object.keys(cleanedObj).forEach((key) => {
    if (cleanedObj[key] === undefined || cleanedObj[key] === null) {
      cleanedObj[key] = ''
    } else if (typeof cleanedObj[key] === 'object') {
      if (Array.isArray(cleanedObj[key])) {
        cleanedObj[key] = cleanedObj[key].map((e: any) => {
          if (typeof e === 'object') {
            return cleanObject(e)
          }
          return e
        })
      } else {
        cleanedObj[key] = cleanObject(cleanedObj[key])
      }
    }
  })
  return cleanedObj
}

const prepareData = (vars: any, antaraId: string) => {
  const inputVariables = { ...vars }

  if (inputVariables.memberDetails) {
    const { primaryMemberAntaraId, ...rest } = inputVariables.memberDetails
    inputVariables.memberDetails =
      primaryMemberAntaraId !== '' ? { ...rest, primaryMemberAntaraId } : rest
  }

  if (inputVariables.memberPhones) {
    inputVariables.memberPhones = {
      phones: inputVariables.memberPhones,
      antaraId,
    }
  }

  if (inputVariables.memberInsurance) {
    inputVariables.memberInsurance = inputVariables.memberInsurance.filter(
      (e: any) => e.insuranceCompany !== '' && e.insuranceId !== ''
    )

    inputVariables.memberInsurance = {
      insuranceDetails: inputVariables.memberInsurance.map((ins: any) => ({
        ...(!!ins.benefits && { benefits: ins.benefits }),
        ...(!!ins.healthPolicy && { healthPolicy: ins.healthPolicy }),
        insuranceCompany: ins.insuranceCompany,
        insuranceId: ins.insuranceId,
        priority: ins.priority,
        toDelete: !!ins?.toDelete,
        principalMemberInsuranceId: ins?.principalMemberInsuranceId,
        relationshipToPrincipalMember: ins?.relationshipToPrincipalMember,
      })),
      antaraId,
    }
  }

  const floatOrNull = (val: any) => {
    const parsed = parseFloat(val)
    return isNaN(parsed) ? null : parsed
  }

  if (inputVariables.memberAddress) {
    inputVariables.memberAddress = {
      addresses: inputVariables.memberAddress.map((e: any) => ({
        ...e,
        geolocation: e?.residentialAddress?.place_id,
        residentialAddress: e?.residentialAddress?.description,
        residentialCountry: e?.residentialAddress?.residentialCountry,
        latitude: floatOrNull(e?.residentialAddress?.latitude),
        longitude: floatOrNull(e?.residentialAddress?.longitude),
        residentialCounty: e?.residentialAddress?.residentialCounty,
        residentialTown: e?.residentialTown?.residentialTown,
      })),
      antaraId,
    }

    // omit the key priority from addresses in memberAddress
    inputVariables.memberAddress.addresses.forEach((e: any) => {
      delete e.priority
    })
  }

  Object.keys(inputVariables).forEach((key) => {
    if (key !== 'antaraId') {
      inputVariables[key] = {
        ...inputVariables[key],
        antaraId,
      }
    }
  })

  return inputVariables
}

export const handleFormSubmissionErrors = (data: any) => {
  const errors = Object.keys(data).filter((key) => data[key].errors)
  const errorMessages = errors.map(
    (e) =>
      `There was an error updating ${e
        ?.replace('update', '')
        ?.replace('Member', '')}`
  )

  return errorMessages
}

/**
 * Parse the details into a selectable elements
 * @param data - graphql response for fetch company details
 */

const parseDataToOptions = (data: any, key: string) => {
  const raw: any[] = data?.edges

  return raw?.map((e) => ({ label: e?.node[key], value: e?.node[key] }))
}

function MemberDetailsUpdateForm({
  closeWindow,
  successCb,
  errorCb,
}: MemberDetailsProps) {
  const {
    v2Member,
    errorLoadingMember,
    isLoading,
    refetchMember,
    handleMemberUpdate,
  } = useMember()
  const [companies, setCompanies] = useState<any[]>([])
  const [healthPolicies, setHealthPolicies] = useState<LookupOption[]>([])
  const [phoneTypes, setPhoneTypes] = useState<LookupOption[]>([])
  const [memberStatus, setMemberStatus] = useState<LookupOption[]>([])
  const [insuranceCompanies, setInsuranceCompanies] = useState<LookupOption[]>(
    []
  )
  const [onboardingStages, setOnboardingStages] = useState<LookupOption[]>([])
  const [sexOptions, setSexOptions] = useState<LookupOption[]>([])
  const [maritalStatus, setMaritalStatus] = useState<LookupOption[]>([])
  const [benefits, setBenefits] = useState<LookupOption[]>([])
  const [antaraHNs, setAntaraHNs] = useState<LookupOption[]>([])
  const [antaraMEs, setAntaraMEs] = useState<LookupOption[]>([])
  const [tags, setTags] = useState<LookupOption[]>([])
  const [dataLoading, setDataLoading] = useState<boolean>(false)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [toastMessage, setToastMessage] =
    useState<ToastMessage>(defaultToastMessage)
  const [initialValues, setInitialValues] = useState<any>(null)

  useEffect(() => {
    if (v2Member) setInitialValues(createInitialFormState(v2Member))
  }, [v2Member])

  const parseLookupEntries = (rawLookupData: any) => {
    setCompanies(
      rawLookupData?.getCompanies?.edges?.map((e: any) => e?.node?.name) || []
    )
    setHealthPolicies(parseDataToOptions(rawLookupData?.healthPolicies, 'name'))
    setMemberStatus(parseDataToOptions(rawLookupData?.memberStatus, 'status'))
    setOnboardingStages(
      parseDataToOptions(rawLookupData?.onboardStage, 'onboardStage')
    )
    setSexOptions(parseDataToOptions(rawLookupData?.sex, 'sex'))
    setMaritalStatus(
      parseDataToOptions(rawLookupData?.maritalStatus, 'maritalStatus')
    )
    setPhoneTypes(parseDataToOptions(rawLookupData?.phoneTypes, 'phoneType'))
    setBenefits(parseDataToOptions(rawLookupData?.benefits, 'name'))
    setTags(parseDataToOptions(rawLookupData?.tags, 'name'))
  }

  const [getLookupEntries] = useLazyQuery(LOOKUP_ENTRIES_QUERY, {
    context: {
      clientName: 'v2',
    },
  })
  const [getInsurances] = useLazyQuery(GET_INSURANCE_COMPANIES)
  const [getAntaraStaff] = useLazyQuery(GET_ANTARA_STAFF)

  const getStaffTeam = (team: string) => (staffMembers: any[]) => {
    return staffMembers
      .filter((e: any) => e?.node?.team === team)
      .map((staff: any) => ({
        label: staff?.node?.fullName,
        value: staff?.node?.emailUsername,
      }))
  }

  const loadLooups = () => {
    setDataLoading(true)
    Promise.all([getLookupEntries(), getInsurances(), getAntaraStaff()])
      .then((data) => {
        const [lookupData, insuranceData, staffData] = data

        parseLookupEntries(lookupData?.data)
        const getMes = getStaffTeam('MEMBER_EXPERIENCE')
        const getHns = getStaffTeam('HEALTH_NAVIGATOR')

        setAntaraHNs(getHns(staffData?.data?.antaraStaff?.edges))
        setAntaraMEs(getMes(staffData?.data?.antaraStaff?.edges))

        setInsuranceCompanies(
          parseDataToOptions(insuranceData?.data?.insuranceCompanies, 'name')
        )
      })
      .catch((err) => logError(err))
      .finally(() => setDataLoading(false))
  }

  useEffect(() => {
    loadLooups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateMemberDetails = (values: any) => {
    setIsSaving(true)
    const antaraId = v2Member?.antaraId
    const memberDetails = prepareData(cleanObject(values), antaraId)

    handleMemberUpdate(memberDetails)
      .then((res: any) => {
        const errors = handleFormSubmissionErrors(res?.data)
        if (errors.length > 0) {
          errorCb('Error saving member details.')
        } else {
          successCb('Member details saved successfully')
          closeWindow()
        }
      })
      .catch((e: any) => errorCb(e.message))
      .finally(() => {
        refetchMember()
        setIsSaving(false)
      })
  }

  const { errors, setFieldValue, values, validateForm } = useFormik({
    initialValues,
    onSubmit: updateMemberDetails,
    validationSchema: memberDetailsValidationSchema,
    enableReinitialize: true,
  })

  const lookupData: any = {
    healthPolicies,
    phoneTypes,
    memberStatus,
    insuranceCompanies,
    onboardingStages,
    sexOptions,
    maritalStatus,
    benefits,
    tags,
    v2Member,
    companies,
    antaraHNs,
    antaraMEs,
  }

  return (
    <>
      <ToastNotification
        isOpen={!!toastMessage.message}
        message={toastMessage}
        handleToastClose={() => setToastMessage(defaultToastMessage)}
      />
      <PortalWindow
        title="Edit Member Details"
        closeWindow={closeWindow}
        windowActions={
          <Button
            variant="outlined"
            className={styles.actionBtn}
            disabled={dataLoading || isLoading}
            onClick={() => {
              validateForm(values).then((formikErrors) => {
                if (Object.keys(formikErrors).length === 0) {
                  updateMemberDetails(values)
                } else {
                  errorCb('Please correct the errors before saving')
                }
              })
            }}
            id="submit-details"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        }
        isEdited={isEdited}
        setIsEdited={setIsEdited}
      >
        {dataLoading || isLoading ? (
          <div className="d-flex flex-direction-column flex-align-center margin-top-32">
            <LoadingIcon />
            <p className="text-small">Loading Member Data...</p>
          </div>
        ) : (
          <>
            {errorLoadingMember || !v2Member ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  padding: '2rem',
                }}
              >
                <ErrorIcon color="error" />

                <p style={{ marginLeft: '1rem', color: `var(--red-100)` }}>
                  There was a problem loading this member details from v2
                  schema.
                </p>
              </div>
            ) : (
              <>
                {isSaving && (
                  <div className={styles.universalLoader}>
                    <span className={styles.backdropText}>
                      <CircularProgress color="inherit" />
                    </span>
                  </div>
                )}
                {values && (
                  <FormBuilder
                    formFields={getFormFields(lookupData)}
                    errors={errors}
                    values={values}
                    setFieldValue={setFieldValue}
                    setIsEdited={setIsEdited}
                  />
                )}
              </>
            )}
          </>
        )}
      </PortalWindow>
    </>
  )
}

export default MemberDetailsUpdateForm
