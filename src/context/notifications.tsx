import React from 'react'
import ToastNotification, {
  ToastMessage,
  defaultToastMessage,
} from 'src/components/toasts/toast-notification'

type NotificationsContextType = {
  notify: (text: string, time?: number) => void
}

const NotificationsContext = React.createContext<NotificationsContextType>({
  notify: () => null,
})

function NotificationsProvider({ children }: any) {
  const [toastMessage, setToastMessage] =
    React.useState<ToastMessage>(defaultToastMessage)

  const notify = (text: string, time = 5000) => {
    setToastMessage({
      ...toastMessage,
      message: text,
      type: 'GENERAL',
      time,
    })
  }

  const providerValue = React.useMemo(() => {
    return {
      notify,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NotificationsContext.Provider value={providerValue}>
      {toastMessage.type === 'GENERAL' && (
        <ToastNotification
          message={toastMessage}
          isOpen={!!toastMessage.message}
          handleToastClose={() => setToastMessage(defaultToastMessage)}
        />
      )}

      {children}
    </NotificationsContext.Provider>
  )
}

function useNotifications() {
  const context = React.useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationsProvider'
    )
  }
  return context
}

export { NotificationsProvider, useNotifications }
