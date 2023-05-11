import Toasts from 'src/components/toasts/alert-toast'
import useAnalytics from 'src/hooks/analytics'

const useTrackEvents = (type: string) => {
  const { track } = useAnalytics(`${type}`)

  const trackRecordUpdated = () => {
    track(`${type} Updated`)
  }

  const trackRecordUpdateFailed = () => {
    track(`${type} Not Updated`)
  }

  return {
    trackRecordUpdated,
    trackRecordUpdateFailed,
  }
}

const useHandleResponses = (type: string) => {
  const { trackRecordUpdated, trackRecordUpdateFailed } = useTrackEvents(type)

  const handleResponses = (res: any) => {
    const errorTypes = ['INVALID_RECORDS', 'INVALID_VALUE_FOR_COLUMN']

    const errorChecks = (errRes: any[]) =>
      errRes.some((el: any) => errorTypes.includes(el.error)) ||
      errRes.some((el: any) => el.statusCode >= 300)

    if (typeof res === 'object' && res !== null) {
      Toasts.showSuccessNotification('Record updated')
      trackRecordUpdated()
    }
    if (Array.isArray(res) && errorChecks(res)) {
      Toasts.showErrorNotification('Record Not Updated')
      trackRecordUpdateFailed()
    }
  }

  return {
    handleResponses,
  }
}

export default useHandleResponses
