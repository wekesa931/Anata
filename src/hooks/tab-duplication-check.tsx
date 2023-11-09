import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const useCheckTabDuplication = () => {
  // check if this hook is being used inside router context
  if (!useParams)
    throw new Error('useCheckTabDuplication must be used inside router context')

  const { antaraId } = useParams()
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (!antaraId) return

    const broadcastChannel = new BroadcastChannel('scribe-tab-check')
    let alertTimeout: any

    // check if another tab is open
    broadcastChannel.postMessage({ type: 'newTabCheck', antaraId })

    // listen for messages from other tabs
    broadcastChannel.onmessage = (event) => {
      if (event.data.antaraId === antaraId) {
        if (event.data.type === 'newTabCheck') {
          broadcastChannel.postMessage({ type: 'existingTabAlert', antaraId })
        } else if (event.data.type === 'existingTabAlert') {
          setShowAlert(true)
          clearTimeout(alertTimeout)
        } else if (event.data.type === 'tabClosed') {
          setShowAlert(false)
          window.location.reload()
        }
      }
    }

    // after 5 seconds, stop listening for messages from other tabs
    alertTimeout = setTimeout(() => {
      setShowAlert(false)
    }, 5000)

    const handleBeforeUnload = () => {
      broadcastChannel.postMessage({ type: 'tabClosed', antaraId })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearTimeout(alertTimeout)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      broadcastChannel.close()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antaraId])

  return {
    showAlert,
  }
}
