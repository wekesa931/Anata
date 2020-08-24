import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import airtableFetch from '../../../../resources/airtableFetch'
import List from '../../../utils/list/list.component'
import Icon from '../../../utils/icon/icon.component'
import Tooltip from '../../../utils/tooltip/tooltip.component'

const Tasks = () => {
  const { recId } = useParams()
  const [allTasks, setAllTasks] = useState<any[]>([])

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

      setAllTasks(mappedResponse)
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
        <span style={{ color: 'var(--blue-base)' }}>
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
    <div className="margin-top-16">
      <h4>Tasks</h4>
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
  )
}

export default Tasks
