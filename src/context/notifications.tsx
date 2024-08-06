import React from 'react'
import { useSnackbar } from 'notistack'

type MessageVariants = 'default' | 'success' | 'error' | 'warning' | 'info'

type NotificationsContextType = {
  notify: (text: string, variant?: MessageVariants, time?: number) => void
}

const NotificationsContext = React.createContext<NotificationsContextType>({
  notify: () => null,
})

function NotificationsProvider({ children }: any) {
  const { enqueueSnackbar } = useSnackbar()

  const notify = (
    text: string,
    variant: MessageVariants = 'default',
    time = 5000
  ) => {
    const allMessages = text?.split(';')

    allMessages.map((m) =>
      enqueueSnackbar(m, {
        autoHideDuration: time,
        variant,
      })
    )
  }

  const providerValue = React.useMemo(() => {
    return {
      notify,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NotificationsContext.Provider value={providerValue}>
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
