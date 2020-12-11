import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../resources/airtable-fetch'
import List from '../../../utils/list/list.component'
import Icon from '../../../utils/icon/icon.component'
import Tooltip from '../../../utils/tooltip/tooltip.component'
import styles from './tasks.component.css'
import filterFields from '../../../../helpers/filter-fields'
import TASK_FIELDS from './tasks-fields'
import useAirtableFetch from '../../../../hooks/airtable-fetch.hook'
import analytics from '../../../../helpers/segment'

const Tasks = () => {
  const [allTasks, setAllTasks] = useState<any[]>([])
  const [filteredTasks, setFilteredTasks] = useState<any[]>([])
  const status = [
    'Complete',
    'Not Started',
    'In Progress',
    'Cancelled',
    'Not Applicable',
  ]
  const { recId } = useParams()
  const fields = [
    'Type',
    'Due Date',
    'Task Notes',
    'Status',
    'Task Priority',
    'Collect Condition Data',
    'Assignee',
    'Assigned HN Name',
    'Last Status changed at',
    'Open URL',
  ]
  const url = `hntasks/list?sort=[{"field":"Due Date","direction":"asc"}]&filterByFormula=FIND("${recId}", {Member Record ID})`
  const {
    data: response,
    refresh: refetchTasks,
    isLoading,
    isError,
  } = useAirtableFetch(url)

  const StrikeThrough = ({ children }: any) => {
    return <s className="text-disabled">{children}</s>
  }

  const includeFieldTypes = (data) => {
    return Object.keys(data).map((key) => {
      const field = TASK_FIELDS.find(({ name }) => name === key)
      return field ? { value: data[key], ...field } : data
    })
  }
  useEffect(() => {
    const getDisplayedInfo = (data: any) => {
      const DisplayInfo = () => (
        <div className={styles.taskContainer}>
          <span className="text-bold">
            {dayjs(data['Due Date']).format('DD MMM YYYY')}
          </span>
          <span>{data.Type}</span>
          <div className="d-flex flex-align-center">
            {data['Open URL'] && data['Open URL'].url && (
              <Tooltip title="Open URL">
                <a
                  href={data['Open URL'].url}
                  target="__blank"
                  className="btn-unstyled"
                  data-testid="task-url-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon
                    name="external-link"
                    width={16}
                    height={16}
                    fill="var(--blue-base)"
                  />
                </a>
              </Tooltip>
            )}
            <div className="p-relative margin-left-8">
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
          </div>
        </div>
      )
      return data.Status === 'Complete' ? (
        <StrikeThrough>
          <DisplayInfo />
        </StrikeThrough>
      ) : (
        <DisplayInfo />
      )
    }
    if (response) {
      const mappedResponse = Object.keys(response)
        .map((key) => ({ data: response[key], id: key }))
        .map(({ data, id }) => ({
          data: includeFieldTypes(data),
          name: getDisplayedInfo(data),
          id,
        }))
      setAllTasks(mappedResponse)
      setFilteredTasks(
        mappedResponse.filter((task) =>
          task.data.find(
            ({ name, value }: any) => name === 'Status' && value !== 'Complete'
          )
        )
      )
    }
  }, [response])

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
  const getPriority = (record: any[]) => {
    const field = record.reduce(
      (obj, { name, value }) => ({ ...obj, [name]: value }),
      {}
    )

    if (field['Task Priority']) {
      return field.Status !== 'Complete' ? (
        <span className={getPriorityColor(field['Task Priority'])}>
          <span className="text-bold text-capitalize">
            {field['Task Priority']} priority
          </span>
          <span className="text-capitalize">{` (${field.Status})`}</span>
        </span>
      ) : (
        <span className={getPriorityColor(field['Task Priority'])}>
          <span className="text-bold text-capitalize">
            {field['Task Priority']} priority
          </span>
          <span className="text-capitalize">{` (${field.Status}, ${dayjs(
            field['Last Status changed at']
          ).format('DD MMM YYYY')})`}</span>
        </span>
      )
    }
    return `No Priority (${field.Status})`
  }
  const getTaskNotes = (record: any) => {
    if (record.Status !== 'Complete') {
      return record['Task Notes']
    }
    return null
  }
  const updateTask = async (task: { id: string; fields: any }) => {
    await airtableFetch('hntasks', 'post', {
      id: task.id,
      fields: { ...task.fields, Assignee: [task.fields.Assignee] },
    })
    analytics.track(`Tasks Updated`, {
      bene: recId,
    })
    return refetchTasks()
  }

  const filterByStatus = (val: string) => {
    if (val === 'All Incomplete') {
      return allTasks.filter((task) =>
        task.data.find(
          ({ name, value }: any) => name === 'Status' && value !== 'Complete'
        )
      )
    }
    return allTasks.filter((task) =>
      task.data.find(
        ({ name, value }: any) => name === 'Status' && value === val
      )
    )
  }

  return (
    <>
      <div className="margin-top-16">
        <div
          className="d-flex flex-align-center"
          style={{ justifyContent: 'space-between' }}
        >
          <h4>Tasks</h4>
          <div>
            <select
              onChange={(e) => setFilteredTasks(filterByStatus(e.target.value))}
              className="form-control"
              data-testid="status-filter"
            >
              <option selected>All Incomplete</option>
              {status.map((stat) => (
                <option>{stat}</option>
              ))}
            </select>
          </div>
        </div>

        {allTasks && !isLoading && !isError && (
          <List
            list={filteredTasks}
            getTopLeftText={getPriority}
            getTopRightText={getTaskNotes}
            modalTitle="Task"
            emptyListText="No tasks found."
            editable
            onEdit={updateTask}
          />
        )}
        {isLoading && (
          <div className="d-flex flex-direction-column flex-align-center margin-top-32">
            <Icon name="loading" />
            <p className="text-small">Loading Tasks...</p>
          </div>
        )}
        {isError && (
          <p className="text-small text-danger margin-top-24">
            An error occurred while fetching tasks, please refresh the page.
          </p>
        )}
      </div>
    </>
  )
}

export default Tasks
