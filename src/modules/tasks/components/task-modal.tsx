import React, { useState, useEffect } from 'react'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import { useMutation } from '@apollo/client'
import { SEND_SMS } from 'src/modules/comms/services/gql'
import dayjs from 'dayjs'
import { useNotifications } from 'src/context/notifications'
import { logError } from 'src/utils/logging/logger'
import useTaskModuleData from 'src/modules/tasks/hooks/tasks-module.data'
import { useModuleAnalytics } from 'src/modules/analytics'
import TaskModalView from './task-modal.component'

type TOpenItem = {
  name: string
  id: string
  data: any[]
}

type TTemplateData = {
  smsTemplate: string
  interactionLogTemplate: string
  defaultReschedulingDays: number
  taskAttempt: number
}

type TasksModalProps = {
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  modalTitle?: string
  openItem?: TOpenItem
  refetchTasks: () => void
  templateData: TTemplateData
}

function TasksModalContainer({
  modalOpen,
  setModalOpen,
  openItem,
  refetchTasks,
  templateData,
}: TasksModalProps) {
  const { handleDataUpdate, submitInteractionLogRequest } = useTaskModuleData()
  const [initialValues, setInitialValues] = useState<any>({
    interactionLog: '',
    sms: '',
    dueDate: 1,
    taskAttempt: 0,
    smsCheck: false,
    interactionLogCheck: false,
    rescheduleTaskCheck: false,
  })
  const [dueDate, setDueDate] = useState<number>(1)
  const [checkboxes, setCheckboxes] = useState({
    smsCheck: false,
    interactionLogCheck: false,
    rescheduleTaskCheck: false,
  })
  const [editModes, setEditModes] = useState({
    sms: true,
    interactionLog: true,
  })
  const {
    trackTemplateEdit,
    trackReshedulingDueDate,
    trackAutomaticActionSubmitted,
  } = useModuleAnalytics()
  const [progress, setProgress] = useState(0)
  const [stepLabel, setStepLabel] = useState('')
  const [progressState, setProgressState] = useState('active')
  const [failedTasks, setFailedTasks] = useState<
    {
      name: string
      task: () => Promise<void>
      progressStart: number
      progressEnd: number
      retryCount: number
    }[]
  >([])

  const [sendSms] = useMutation(SEND_SMS)

  const { member } = useMember()
  const user = useUser()

  const { notify } = useNotifications()

  const getInitialValues = () => ({
    interactionLog: templateData?.interactionLogTemplate || '',
    sms: templateData?.smsTemplate || '',
    dueDate: templateData?.defaultReschedulingDays,
    taskAttempt: templateData?.taskAttempt,
    smsCheck: false,
    interactionLogCheck: false,
    rescheduleTaskCheck: false,
  })

  const handleIncrement = () =>
    setDueDate((prevDueDate) => Math.min(prevDueDate + 1, 14))

  const handleDecrement = () =>
    setDueDate((prevDueDate) => Math.max(prevDueDate - 1, 1))

  const handleCheckboxChange = (event: any, formik: any) => {
    const { name, checked } = event.target
    formik.handleChange(event)

    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }))
  }

  useEffect(() => {
    if (openItem?.data) setInitialValues(getInitialValues())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openItem])

  useEffect(() => {
    setInitialValues((prevValues: any) => ({ ...prevValues, dueDate }))
    trackReshedulingDueDate(openItem?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dueDate])

  useEffect(() => {
    const updateCheckboxes = () => {
      const newCheckboxes = { ...checkboxes }
      if (!initialValues.sms) {
        newCheckboxes.smsCheck = false
      }
      if (!initialValues.interactionLog) {
        newCheckboxes.interactionLogCheck = false
      }
      setCheckboxes(newCheckboxes)
    }

    updateCheckboxes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues])

  const handleEditClick = (fieldName: any, data: any) => {
    setInitialValues(data.values)
    setEditModes((prevEditModes: any) => ({
      ...prevEditModes,
      [fieldName]: !prevEditModes[fieldName],
    }))
    trackTemplateEdit(
      `${fieldName} template edited - ${initialValues[fieldName]}`
    )
  }
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < progress) {
        setCount((prevCount) => prevCount + 1)
      }
    }, 10)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, progress])

  const handleTask = async (
    taskName: string,
    task: () => Promise<void>,
    progressStart: number,
    progressEnd: number,
    retryCount: number = 0
  ) => {
    try {
      setProgress(progressStart)
      setStepLabel(`${taskName} ...`)
      await task()
      setProgress(progressEnd)
    } catch (error) {
      logError(error)
      notify(`Error executing ${taskName}`)
      setFailedTasks((prevFailedTasks) => [
        ...prevFailedTasks,
        {
          name: taskName,
          task,
          progressStart,
          progressEnd,
          retryCount: retryCount + 1,
        },
      ])
      throw error
    } finally {
      if (progressEnd === 100) {
        setModalOpen(false)
        notify('Updated successfully')
        trackAutomaticActionSubmitted()
        refetchTasks()
      }
    }
  }

  const retryFailedTasks = async () => {
    if (failedTasks.length === 0) return

    const task = failedTasks.shift()
    if (!task) return

    try {
      setProgressState('active')
      await handleTask(
        task.name,
        task.task,
        task.progressStart,
        task.progressEnd,
        task.retryCount
      )
    } catch (error) {
      setProgressState('error')
      logError(error)
      notify(`Error retrying failed task : ${error?.message}`)
    }
  }

  const executeTasks = async (
    tasks: {
      name: string
      task: () => Promise<void>
      progressStart: number
      progressEnd: number
    }[]
  ) => {
    try {
      for (const { name, task, progressStart, progressEnd } of tasks) {
        // eslint-disable-next-line no-await-in-loop
        await handleTask(name, task, progressStart, progressEnd)
      }
    } catch (error) {
      setProgressState('error')
      logError(error)
      notify('Error executing tasks')
      throw error
    }
  }

  const prepareTasks = (values: any) => {
    const updatedValue = {
      Status: 'In Progress',
      'Number of Attempts': templateData.taskAttempt + 1,
      ...(checkboxes.rescheduleTaskCheck
        ? {
            'Due Date': dayjs().add(values.dueDate, 'day').format('YYYY-MM-DD'),
          }
        : {}),
    }
    const tasks = []

    if (checkboxes.smsCheck) {
      tasks.push({
        name: 'Sending SMS',
        task: () =>
          sendSms({
            variables: { message: values.sms, antaraId: member?.antaraId },
          }),
        progressStart: 0,
        progressEnd: 33,
      })
    }

    if (checkboxes.interactionLogCheck) {
      tasks.push({
        name: 'Submitting Interaction Log',
        task: () => submitInteractionLogRequest(values, user, member),
        progressStart: 33,
        progressEnd: 66,
      })
    }

    tasks.push({
      name: 'Rescheduling task, changing status, and increasing attempt',
      task: () => handleDataUpdate(updatedValue, openItem?.id),
      progressStart: 66,
      progressEnd: 100,
    })

    return tasks
  }

  const handleSubmit = async (values: any) => {
    try {
      const tasks = prepareTasks(values)
      await executeTasks(tasks)
    } catch (error) {
      logError(error)
      notify('Error submitting actions')
    }
  }
  return (
    <TaskModalView
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleCheckboxChange={handleCheckboxChange}
      handleEditClick={handleEditClick}
      handleIncrement={handleIncrement}
      handleDecrement={handleDecrement}
      checkboxes={checkboxes}
      editModes={editModes}
      progress={progress}
      progressState={progressState}
      stepLabel={stepLabel}
      count={count}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      retryFailedTasks={retryFailedTasks}
      dueDate={dueDate}
    />
  )
}

export default TasksModalContainer
