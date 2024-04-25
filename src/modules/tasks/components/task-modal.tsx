import React, { useState, useEffect } from 'react'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import { useNotifications } from 'src/context/notifications'
import { logError } from 'src/utils/logging/logger'
import useTaskModuleData from 'src/modules/tasks/hooks/tasks-module.data'
import { useModuleAnalytics } from 'src/modules/analytics'
import type { InitialValues } from 'src/modules/tasks/types'
import { updateTasks, getAppointmentToUpdate } from 'src/modules/tasks/utils'
import TaskModalView from './task-modal.component'

type Task = any

export type TTemplateData = {
  smsTemplate: string
  interactionLogTemplate: string
  defaultReschedulingDays: number
}

type TasksModalProps = {
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  modalTitle?: string
  selectedTasks: Task[]
  refetchTasks: () => void
  templateData: TTemplateData
}

function TasksModalContainer({
  modalOpen,
  setModalOpen,
  selectedTasks,
  refetchTasks,
  templateData,
}: TasksModalProps) {
  const {
    handleDataUpdate,
    submitInteractionLogRequest,
    submitSmsRequest,
    handleUpdateAppointmnet,
  } = useTaskModuleData()
  const [initialValues, setInitialValues] = useState<InitialValues>({
    interactionLog: '',
    sms: '',
    dueDate: 1,
    taskAttempt: 0,
    reasonForApptMissed: '',
    smsCheck: false,
    interactionLogCheck: true,
    rescheduleTaskCheck: false,
    rescheduleApptCheck: true,
  })
  const [checkboxes, setCheckboxes] = useState({
    smsCheck: false,
    interactionLogCheck: true,
    rescheduleTaskCheck: false,
    rescheduleApptCheck: true,
  })

  const { trackAutomaticActionSubmitted } = useModuleAnalytics()
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

  const { member } = useMember()
  const user = useUser()

  const { notify } = useNotifications()

  const getInitialValues = () => {
    return {
      interactionLog: templateData?.interactionLogTemplate || '',
      sms: templateData?.smsTemplate || '',
      dueDate: templateData?.defaultReschedulingDays || 1,
      reasonForApptMissed: '',
      smsCheck: false,
      interactionLogCheck: true,
      rescheduleTaskCheck: false,
      rescheduleApptCheck: true,
    }
  }

  const handleCheckboxChange = (event: any, formik: any) => {
    const { name, checked } = event.target
    formik.handleChange(event)

    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }))
  }
  useEffect(() => {
    const initValues = getInitialValues()
    if (initValues) {
      setInitialValues(initValues as InitialValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData, selectedTasks])

  useEffect(() => {
    const updateCheckboxes = () => {
      const newCheckboxes = { ...checkboxes }
      if (!initialValues.sms) {
        newCheckboxes.smsCheck = false
      }
      setCheckboxes(newCheckboxes)
    }

    updateCheckboxes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues])

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
    } catch (error: any) {
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
    } catch (error: any) {
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
    const updatedValues = updateTasks(selectedTasks, values, checkboxes)
    const appointmentToUpdate = getAppointmentToUpdate(selectedTasks, values)

    let tasks = []

    if (checkboxes.smsCheck) {
      tasks.push({
        name: 'Sending SMS',
        task: () => submitSmsRequest(values.sms, member),
        progressStart: 0,
        progressEnd: 25,
      })
    }

    if (checkboxes.interactionLogCheck) {
      tasks.push({
        name: 'Submitting Interaction Log',
        task: () => submitInteractionLogRequest(values, user, member),
        progressStart: 25,
        progressEnd: 50,
      })
    }
    if (updatedValues?.length) {
      tasks = [
        ...tasks,
        {
          name: 'Rescheduling task, changing status, and increasing attempt',
          task: () => handleDataUpdate(updatedValues),
          progressStart: 50,
          progressEnd: appointmentToUpdate?.length ? 75 : 100,
        },
      ]
    }

    if (appointmentToUpdate?.length) {
      tasks = [
        ...tasks,
        {
          name: 'Updating appointment status',
          task: () => handleUpdateAppointmnet(appointmentToUpdate),
          progressStart: 75,
          progressEnd: 100,
        },
      ]
    }

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
      checkboxes={checkboxes}
      progress={progress}
      progressState={progressState}
      stepLabel={stepLabel}
      count={count}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      retryFailedTasks={retryFailedTasks}
      showUpdateAppointment={
        selectedTasks?.some((task) => task?.Appointment) || false
      }
    />
  )
}

export default TasksModalContainer
