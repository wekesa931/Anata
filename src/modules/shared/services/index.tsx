import { useEffect, useState, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useMember } from 'src/context/member'
import airtableFetch from 'src/services/airtable/fetch'
import { useAppointmentsData } from 'src/modules/clinical/clinical-modules/appointments/hooks/appointments-data'
import { ServicePricingType } from 'src/modules/member/types'
import { useSetQueryParam } from '../hooks'

interface ServiceType {
  service: {
    name: string
  }
}

export interface OTPCollectionModalInterface {
  name: string
  modalOpen: boolean
  service: ServiceType
  price?: number
}

export const useCheckForOTPPrompt = () => {
  const { member } = useMember()
  const location = useLocation()

  const setQueryParam = useSetQueryParam()

  const services: ServicePricingType[] =
    member?.activeBillingPackageEnrollment?.billingSchemeSubscription
      ?.billingScheme?.servicePricing || []

  /** prompt otp collection is member is FFS and billed via smart */
  const isMemberSmartAndFFS =
    member?.isMemberBilledThroughSmart &&
    (member?.shouldRenewMembership || member?.isFFSMembershipMember)

  /** prompt otp collection is member under subscription and sub is outdated */
  const isMemberUnderSub = member?.shouldRenewMembership

  const scheme = isMemberSmartAndFFS ? 'FFS' : 'SUBSCRIPTION'

  const promptOTP = isMemberSmartAndFFS || isMemberUnderSub

  const { getAppointments } = useAppointmentsData()
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAppointments()
      setAppointments(data)
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [getAppointments])

  // extract the action param only, we need to fetch new appointments only if
  // action param equals workflows or forms
  const urlSource: string | null = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('action')
  }, [location.search])

  useEffect(() => {
    const shouldFetch = urlSource === 'workflows' || urlSource === 'forms'
    if (shouldFetch && promptOTP) {
      fetchAppointments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSource, promptOTP])

  // has future appointment and appoinment lacks visit id(not billed)
  const hasAppointments = appointments.some((item) => {
    return (
      item.Status.includes('Scheduled') ||
      item.Status.includes('Schedule needed')
    )
  })

  const promptOtpFromSource = ['forms', 'workflows']

  // show loading backdrop while fetching appointments
  const showLoading =
    urlSource !== null && promptOtpFromSource.includes(urlSource) && loading

  // hide select appointment field prompt modal is not under forms & workflows
  const showAppointmentField =
    urlSource !== null && promptOtpFromSource.includes(urlSource)

  const updateAppointment = async (
    visitCode: string,
    appointmentId: string | null
  ) => {
    if (appointmentId) {
      const serverPayload = { 'visit id': visitCode }
      return airtableFetch('appointments', 'post', {
        id: appointmentId,
        fields: serverPayload,
      }).then((res) => {
        setQueryParam('reloadAppt', 'true')
        return res
      })
    }
  }

  return {
    scheme,
    services,
    promptOTP,
    appointments,
    hasAppointments,
    loading,
    setLoading,
    error,
    urlSource,
    showLoading,
    showAppointmentField,
    updateAppointment,
  }
}
