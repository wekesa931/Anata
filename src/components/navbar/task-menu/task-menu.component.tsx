import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from 'src/context/user'
import useAirtableFetch from 'src/hooks/airtable-fetch'
import Icon from 'src/components/icon/svg-icon'
import Tabs from 'src/components/tabs/tabs.component'
import analytics from 'src/config/analytics'
import styles from './task-menu.component.css'

function DateInput({ date, onChange }: any) {
  return (
    <input
      className="form-control"
      type="date"
      value={date}
      onChange={onChange}
    />
  )
}

function Task({ name, url }: any) {
  return (
    <Link to={url}>
      <div className={styles.listItem}>{name}</div>
    </Link>
  )
}

function TaskMenu() {
  const user = useUser()
  const email = user && user.email
  const [dueDate, setDueDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [tasks, setTasks] = useState<any[]>([])
  const [url, setUrl] = useState('')
  const { data, isLoading } = useAirtableFetch(url)

  useEffect(() => {
    if (email && dueDate) {
      setUrl(
        `hntasks/list?
         &sort=[{"field":"Due Date","direction":"asc"}]
         &filterByFormula=AND(FIND('${email}', {HN email}), IS_SAME('${dueDate}', {Due Date}, 'days'))`
      )
    }
    analytics.track('Tasks Menu Opened', { date: dueDate })
  }, [dueDate, email])

  useEffect(() => {
    if (data) {
      const mappedResponse = Object.keys(data)
        .map((key) => data[key])
        .map((task) => ({
          name: `${task['Member Name Lookup']} - ${task.Type}`,
          data: task,
        }))

      setTasks(mappedResponse)
    }
  }, [data])

  return (
    <div className={`p-absolute ${styles.container}`}>
      <h4 className="margin-bottom-8">Your Tasks</h4>
      <DateInput date={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <Tabs>
        <div label="Due">
          <div className={styles.list}>
            {!isLoading &&
              tasks
                .filter((task) => task.data.Status !== 'Complete')
                .map((task) => (
                  <Task
                    name={task.name}
                    url={`/member/${task.data['Member Record ID']}`}
                  />
                ))}
            {!isLoading &&
              tasks.filter((task) => task.data.Status !== 'Complete').length ===
                0 && (
                <p className="text-small text-align-center">
                  You have no due tasks today.
                </p>
              )}
            {isLoading && (
              <div className="d-flex flex-direction-column flex-align-center">
                <Icon name="loading" />
                <p className="text-small">Loading your tasks...</p>
              </div>
            )}
          </div>
        </div>
        <div label="Done">
          <div className={styles.list}>
            {!isLoading &&
              tasks
                .filter((task) => task.data.Status === 'Complete')
                .map((task) => (
                  <Task
                    name={task.name}
                    url={`/member/${task.data['Member Record ID']}`}
                  />
                ))}
            {!isLoading &&
              tasks.filter((task) => task.data.Status === 'Complete').length ===
                0 && (
                <p className="text-small text-align-center">
                  You have no completed tasks today.
                </p>
              )}
            {isLoading && (
              <div className="d-flex flex-direction-column flex-align-center">
                <Icon name="loading" />
                <p className="text-small ">Loading your tasks...</p>
              </div>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  )
}

export default TaskMenu
