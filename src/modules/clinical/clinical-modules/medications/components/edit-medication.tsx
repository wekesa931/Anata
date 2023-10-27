import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import PrimaryModal from 'src/components/modals/primary'
import PrimaryForm from 'src/components/forms/primary-form'
import { Form } from 'formik'
import DateField from 'src/components/forms/fields/date-field'
import { useAirtableMeta } from 'src/context/airtable-meta'
import { LookupOption } from 'src/modules/member/types'
import { useLazyQuery } from '@apollo/client'
import { OPTIMIZED_SEARCH } from 'src/gql/search'
import SelectField from 'src/components/forms/fields/select-field'
import dayjs from 'dayjs'
import SearchField from 'src/components/forms/fields/search'
import PrimaryButton from 'src/components/buttons/primary'
import Loading from 'src/components/loaders/centered'
import useMedicationData from 'src/modules/clinical/clinical-modules/medications/hooks'
import { useNotifications } from 'src/context/notifications'

export function EditMedication({ value }: any) {
  const { editMedication, updatingMedications } = useMedicationData()
  const [showModal, setShowModal] = useState(false)
  const [statusOptions, setStatusOptions] = useState<LookupOption[]>([])
  const { notify } = useNotifications()
  const initialValues = {
    'Start Date': dayjs(value?.['Start Date']).toDate(),
    Status: value?.Status || '',
    refillFacility: {
      displayName: value?.['Refill facility name from Provider base'] || '',
      id: value?.['Refill facility from Provider base'],
      name: value?.['Refill facility name from Provider base'] || '',
    },
    prescribingFacility: {
      displayName:
        value?.['Prescribing facility name from Provider base'] || '',
      name: value?.['Prescribing facility name from Provider base'] || '',
      id: value?.['Prescribing facility from Provider base'],
    },
  }
  const handleSubmit = (values: any = {}) => {
    const prescribingFacilityId = values?.prescribingFacility?.id
    const refillFacility = values?.refillFacility?.id
    const updatedValues = {
      ...(prescribingFacilityId && {
        'Prescribing facility from Provider base': [prescribingFacilityId],
      }),
      ...(refillFacility && {
        'Refill facility from Provider base': [refillFacility],
      }),
      Status: values?.Status,
      'Start Date': dayjs(values?.['Start Date']).format('YYYY-MM-DD'),
    }

    editMedication(value, updatedValues)
      .then(() => {
        notify('Medication updated succesfully')
        setShowModal(false)
      })
      .catch((e: any) => {
        notify(
          typeof e?.message === 'string'
            ? e?.message
            : 'An error occured updating medication '
        )
      })
  }
  const { airtableMeta, loading } = useAirtableMeta()

  const findTableFromAirtable = (airtable: any, tableName: string) => {
    return Object.values(airtable).find((t: any) => t?.name === tableName)
  }

  const setMedicationStatuses = (airtable: any) => {
    const presTable: any = findTableFromAirtable(airtable, 'Prescriptions')
    if (presTable) {
      const fields: any = presTable?.fields || {}
      const status: any = Object.values(fields)?.find(
        (f: any) => f?.name === 'Status'
      )
      if (status) {
        const options = status?.options?.choices || []
        setStatusOptions(
          options.map((o: any) => ({ label: o?.name, value: o?.name }))
        )
      }
    }
  }

  const [search] = useLazyQuery(OPTIMIZED_SEARCH, {
    context: {
      clientName: 'search',
    },
  })

  const getUniqueRecords = (records: any[]) => {
    return records.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
  }

  const searchQuery = (id: string) => async (keyword: string) => {
    const { data } = await search({ variables: { keyword, table: id } })
    const response = data.optimizedSearch.data || {}
    const displayKey = response?.displayName || 'name'
    const searchResults = response?.results || []
    return (
      getUniqueRecords([
        ...searchResults.map((rec: any) => ({
          id: rec.id,
          name: rec[displayKey],
          displayName: rec[displayKey],
        })),
      ]) || []
    )
  }

  const FACILITIES_ID =
    process.env.PROD === 'true' ? 'tbltmQuqyuKPc4Ffo' : 'tblLsYlG4IiNEbWWs'

  const searchFacilities = searchQuery(FACILITIES_ID)

  useEffect(() => {
    if (airtableMeta) {
      setMedicationStatuses(airtableMeta)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airtableMeta])

  return (
    <div className="font-rubik">
      <Button
        className="border border-solid border-midnight-blue rounded-md text-center normal-case text-xs text-midnight-blue"
        onClick={() => setShowModal(!showModal)}
      >
        Edit
      </Button>
      <PrimaryModal open={showModal} onClose={() => setShowModal(false)}>
        {loading ? (
          <div className="p-2 flex items-center justify-center">
            <Loading message="Loading options" />
          </div>
        ) : (
          <div className="p-2">
            <p className="text-xl font-medium text-black">Edit medication</p>
            <div className="mt-1">
              <PrimaryForm
                initialValues={initialValues}
                handleSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <DateField
                      name="Start Date"
                      label="Start Date"
                      openToYear={false}
                    />
                    <SearchField
                      initialValue={initialValues.prescribingFacility}
                      search={searchFacilities}
                      label="Prescribing facility"
                      handleChange={(f: any) => {
                        setFieldValue('prescribingFacility', f)
                      }}
                    />
                    <SearchField
                      initialValue={initialValues.refillFacility}
                      search={searchFacilities}
                      label="Refill facility"
                      handleChange={(f: any) => {
                        setFieldValue('refillFacility', f)
                      }}
                    />
                    <SelectField
                      name="Status"
                      label="Status"
                      options={statusOptions || []}
                    />
                    <div className="flex flex-col gap-2">
                      <PrimaryButton
                        type="button"
                        fullWidth
                        className="bg-disabled-grey hover:bg-disabled-grey"
                        onClick={() => setShowModal(false)}
                        disabled={updatingMedications}
                      >
                        Cancel
                      </PrimaryButton>
                      <PrimaryButton
                        type="submit"
                        fullWidth
                        disabled={updatingMedications}
                        loading={updatingMedications}
                      >
                        Save
                      </PrimaryButton>
                    </div>
                  </Form>
                )}
              </PrimaryForm>
            </div>
          </div>
        )}
      </PrimaryModal>
    </div>
  )
}
