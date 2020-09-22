import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import airtableFetch from '../../../../resources/airtableFetch'
import List from '../../../utils/list/list.component'
import Icon from '../../../utils/icon/icon.component'
import Tooltip from '../../../utils/tooltip/tooltip.component'
import styles from './tasks.component.css'
import Radio from '../../../utils/radio/radio.component'
import Modal from '../../../utils/modals/modal.component'
import AirtableIframe from '../../../utils/airtableIframe/airtableIframe.component'
import { useAuth } from '../../../../context/auth-context'

const Tasks = () => {
  const { recId } = useParams()
  const [allTasks, setAllTasks] = useState<any[]>([])
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [openForm, setOpenForm] = useState<any>()
  const [hn, setHN] = useState<any>({})
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.profileObj) {
      airtableFetch(
        `team/list/0?view=Grid%20view&filterByFormula=FIND("${user.profileObj.email}", {Email})`
      ).then((res) => {
        const currentHN = Object.keys(res).map((key: any) => res[key])
        if (currentHN.length) {
          setHN(currentHN[0])
        }
      })
    }
  }, [user])

  const taskForms = [
    {
      name: 'Health Navigator Task Form',
      url: 'shrSPv5zEGvh1nm22',
      hnField: 'Assignee',
    },
    {
      name: 'Interaction Log Form',
      url: 'shrKQ5efAEh9z3618',
      hnField: 'Health Navigator',
    },
    {
      name: 'PAFU',
      url: 'shrCRi52uE0oDSpme',
    },
    {
      name: 'Medication Prescription Form',
      url: 'shrH0jDDogdH2ySWr',
    },
    {
      name: 'Appointment Form',
      url: 'shrZWjIcj1g2zMA5S',
      hnField: 'Health Navigator',
    },
    {
      name: 'Nutritional Consultation Form',
      url: 'shrFmDt0AU4XjbsAr',
    },
    {
      name: 'Vitals Intake Form',
      url: 'shr0VkCzeprnRSIhA',
      hnField: 'Staff',
    },
    {
      name: 'BP Monitoring Intake',
      url: 'shrJo1OLcSNVTTA0w',
    },
    {
      name: 'CHL Monitoring Intake',
      url: 'shreiiEvt7m7qg6az',
    },
    {
      name: 'DM Monitoring',
      url: 'shrbn21wPY6Vj0Ufv',
    },
    {
      name: 'Baseline Form',
      url: 'shrPou8GMbw9pKWpZ',
    },
    {
      name: 'HIF',
      url: 'shrQlDyAynyeYDxT0',
    },
  ]

  const getDisplayedInfo = (data: any) => {
    return data.Status !== 'Complete' ? (
      <span
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <span className="text-bold">
          {dayjs(data['Due Date']).format('DD MMM YYYY')}
        </span>
        <span>{data.Type}</span>
        <div style={{ position: 'relative' }}>
          {data['Assigned HN Name'] && (
            <Tooltip title={data['Assigned HN Name']}>
              {!data['Assigned HN Name'].includes('Antara Bot') ? (
                <Icon name="user" fill="var(--greyscale-2)" />
              ) : (
                <Icon name="lightning" fill="var(--greyscale-2)" />
              )}
            </Tooltip>
          )}
        </div>
      </span>
    ) : (
      <div className="d-flex">
        <s
          className="text-disabled"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {dayjs(data['Due Date']).format('DD MMM YYYY')} {data.Type}
        </s>
        <span style={{ position: 'relative' }}>
          {data['Assigned HN Name'] && (
            <Tooltip title={data['Assigned HN Name']}>
              {!data['Assigned HN Name'].includes('Antara Bot') ? (
                <Icon name="user" fill="var(--greyscale-3)" />
              ) : (
                <Icon name="lightning" fill="var(--greyscale-3)" />
              )}
            </Tooltip>
          )}
        </span>
      </div>
    )
  }
  useEffect(() => {
    airtableFetch(
      `hntasks/list/0?view=HN Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      const mappedResponse = Object.keys(response)
        .map((key) => response[key])
        .map((data) => ({
          data,
          name: getDisplayedInfo(data),
        }))
      const completedTasks = mappedResponse.filter(
        (task) => task.data.Status === 'Complete'
      )
      const uncompletedTasks = mappedResponse.filter(
        (task) =>
          task.data.Status !== 'Complete' &&
          !dayjs().isSame(dayjs(task.data['Due Date']), 'day')
      )
      const todaysTasks = mappedResponse.filter(
        (task) =>
          task.data.Status !== 'Complete' &&
          dayjs().isSame(dayjs(task.data['Due Date']), 'day')
      )
      const tasks = []
      if (completedTasks.length) {
        tasks.push(completedTasks[0])
      }
      if (todaysTasks.length) {
        tasks.push(...todaysTasks)
      }
      if (uncompletedTasks.length) {
        tasks.push(...uncompletedTasks)
      }
      setAllTasks(tasks)
    })
  }, [recId])

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-danger'
      case 'medium':
        return 'text-success'
      case 'low':
        return 'text-warning'
      default:
        return ''
    }
  }
  const getPriority = (record: any) => {
    if (record['Task Priority']) {
      return record.Status !== 'Complete' ? (
        <span className={getPriorityColor(record['Task Priority'])}>
          <span className="text-bold text-capitalize">
            {record['Task Priority']} priority
          </span>
          <span className="text-capitalize">{` (${record.Status})`}</span>
        </span>
      ) : (
        <span className={getPriorityColor(record['Task Priority'])}>
          <span className="text-bold text-capitalize">
            {record['Task Priority']} priority
          </span>
          <span className="text-capitalize">{` (${record.Status}, ${dayjs(
            record['Last Status changed at']
          ).format('DD MMM YYYY')})`}</span>
        </span>
      )
    }
    return `No Priority (${record.Status})`
  }
  const getTaskNotes = (record: any) => {
    if (record.Status !== 'Complete') {
      return record['Task Notes']
    }
    return null
  }

  return (
    <>
      <div className="margin-top-16">
        <div className="d-flex" style={{ justifyContent: 'space-between' }}>
          <h4>Tasks</h4>
          <div style={{ position: 'relative', display: 'flex' }}>
            {showNewTaskForm && (
              <div className={styles.newTaskCard}>
                <div className={styles.cardTitle}>
                  <h6 className="text-primary">Create New:</h6>
                </div>
                <div className={styles.taskForms}>
                  {taskForms.map(({ name, url, hnField }) => {
                    return (
                      <Radio
                        label={name}
                        value={url}
                        name={name}
                        onChange={() => setOpenForm({ name, url, hnField })}
                        checked={
                          showNewTaskForm && openForm && openForm.url === url
                        }
                        key={name}
                      />
                    )
                  })}
                </div>
              </div>
            )}
            <button
              className="btn-icon btn-small btn-primary"
              onClick={() => setShowNewTaskForm(!showNewTaskForm)}
            >
              <div
                className={`${styles.add} ${
                  showNewTaskForm ? `${styles.close}` : null
                }`}
              >
                <Icon name="plus" fill="white" width={16} height={16} />
              </div>
            </button>
          </div>
        </div>

        {allTasks ? (
          <List
            list={allTasks}
            getTopLeftText={getPriority}
            getTopRightText={getTaskNotes}
            modalTitle="Task"
            emptyListText="No tasks found."
          />
        ) : null}
      </div>
      {openForm && (
        <Modal open={openForm} setModalOpen={setOpenForm} heading="">
          <AirtableIframe
            src={`https://airtable.com/embed/${openForm.url}?prefill_${openForm.hnField}=${hn['Record ID']}&prefill_Member=${recId}`}
            style={{ border: 'none', height: '95%', padding: '12px' }}
          />
        </Modal>
      )}
    </>
  )
}

export default Tasks
