import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import airtableFetch from '../../../../resources/airtable-fetch'
import List from '../../../utils/list/list.component'
import Icon from '../../../utils/icon/icon.component'
import Tooltip from '../../../utils/tooltip/tooltip.component'
import styles from './tasks.component.css'
import filterFields from '../../../../helpers/filter-fields'
import TASK_FIELDS from './tasks-fields'
import useAirtableFetch from '../../../../hooks/airtable-fetch.hook'
import analytics from '../../../../helpers/segment'
import PrescriptionName from './PrescriptionNames'
import CallsCallout from '../calls/calls.component'

import { GET_MEMBER_TASKS } from '../../../../gql/hn_tasks'
import { useMember } from '../../../../context/member.context'

type RecordWithId = { data: any; id: string }

function useTransformedApiRecords(rawApiRecords) {
  // Transforms HN Task records from Scribe API into the same format used by Airtable records
  const [apiRecords, setApiRecords] = useState<any[]>([])

  useEffect(() => {
    // Transform the rawApiRecords into apiRecords, which is the same format as airtableRecords
    const apiToAirtableFieldMap = {
      type: 'Type',
      dueDate: 'Due Date',
      taskNotes: 'Task Notes',
      status: 'Status',
      taskPriority: 'Task Priority',
      measurementsToTake: 'Collect Condition Data',
      assignee: {
        fullName: 'Assigned HN Name',
      },
      lastStatusChangedAt: 'Last Status changed at',
      formUrl: 'Open URL',
    }
    // TODO: Replace this with a callback so that this custom hook
    // can be reused for other record types
    const transformApiRecord = (node, mapData: any) => {
      const data = Object.keys(node).reduce((acc, key) => {
        let airKey = mapData[key]
        let value = node[key]

        if (key === 'assignee') {
          // TODO: Change to use recursive walk
          airKey = airKey.fullName
          value = [value] // api returns a scalar but airtable returns a list
        }

        if (airKey) {
          return {
            ...acc,
            [airKey]: value,
          }
        }
        return acc
      }, {})

      return {
        [node.recordId]: {
          ...data,
        },
      }
    }
    const transformApiRecords = (records, mapData) => {
      const mappedResponse = records.memberHnTasks.edges.reduce(
        (acc, { node }: any) => {
          const newEntry = transformApiRecord(node, mapData)
          Object.assign(acc, newEntry)
          return acc
        },
        {}
      )
      return mappedResponse
    }
    if (rawApiRecords) {
      const transformed = transformApiRecords(
        rawApiRecords,
        apiToAirtableFieldMap
      )
      setApiRecords(transformed)
    }
  }, [rawApiRecords])

  return apiRecords
}

function useMergedRecords(airtableRecords, apiRecords) {
  // Produces Merged Records from airtableRecords and apiRecords
  const [mergedRecords, setMergedRecords] = useState<any[]>([])

  useEffect(() => {
    const mergeRecords = (
      primary_records: { [x: string]: any },
      added_records: { [x: string]: any }
    ) => {
      // Merge two lists of records together by starting with primary_records
      // and adding items from added_records if they do not already appear in primary_records
      return Object.keys(added_records).reduce(
        (existingRecords: { [x: string]: any }, recordId: string) => {
          if (recordId in existingRecords === false) {
            return {
              ...existingRecords,
              [recordId]: added_records[recordId],
            }
          }
          return existingRecords
        },
        primary_records
      )
    }

    if (airtableRecords) {
      if (apiRecords) {
        // Both sets of records are available so merge them together.
        // airtableRecords is first argument, so records in that collection
        // take precedence over apiRecords
        setMergedRecords(mergeRecords(airtableRecords, apiRecords))
      } else {
        // If only airtable records are available, show those
        setMergedRecords(airtableRecords)
      }
    }
  }, [airtableRecords, apiRecords])

  return mergedRecords
}

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
    'Prescription Drug Names',
    'Other Prescription Drug Name',
  ]

  function buildAirtableUrl(memberRecordId: any, queryFields: string[]) {
    const sortArg = `sort=[{"field":"Due Date","direction":"asc"}]`
    const filterArg = `filterByFormula=FIND("${memberRecordId}", {Member Record ID})`
    // Avoid fetching Complete tasks from Airtable in order to test that they are fetched from API
    // const filterArg = `filterByFormula=AND(FIND("${memberRecordId}", {Member Record ID}), {Status} != "Complete")`
    const fieldsArg = filterFields(queryFields)
    return `hntasks/list?${fieldsArg}&${sortArg}&${filterArg}`
  }

  const {
    data: airtableRecords,
    refresh: refetchTasks,
    isLoading: isAirtableLoading,
    isError: isAirtableError,
  } = useAirtableFetch(buildAirtableUrl(recId, fields))

  const { member } = useMember()

  const {
    loading: isApiLoading,
    error: apiError,
    data: rawApiRecords,
  } = useQuery(GET_MEMBER_TASKS, {
    variables: { antaraId: member['Antara ID'] },
  })

  const apiRecords = useTransformedApiRecords(rawApiRecords)
  const mergedRecords = useMergedRecords(airtableRecords, apiRecords)

  const StrikeThrough = ({ children }: any) => {
    return <s className="text-disabled">{children}</s>
  }

  const includeFieldTypes = (data) => {
    return Object.keys(data).map((key) => {
      const field = TASK_FIELDS.find(({ name }) => name === key)
      return field ? { value: data[key], ...field } : data
    })
  }

  function addKeyToValue(records: { [x: string]: any }): RecordWithId[] {
    // Given a dictionary of records, insert each key into the record it maps to.
    // records is a dictionary mapping key -> record
    // Return a dictionary mapping key -> {data: record, id: key}
    return Object.keys(records).map((key) => ({ data: records[key], id: key }))
  }

  useEffect(() => {
    // Display the mergedRecords
    function renderDisplayInfo(hnTask: any) {
      return () => (
        <div className={styles.taskContainer}>
          <span className="text-bold">
            {dayjs(hnTask['Due Date']).format('DD MMM YYYY')}
          </span>
          <span>{hnTask.Type}</span>
          {hnTask['Prescription Drug Names'] && (
            <PrescriptionName
              value={hnTask['Prescription Drug Names']}
              otherMeds={hnTask['Other Prescription Drug Name']}
            />
          )}
          <div className="d-flex flex-align-center">
            {hnTask['Open URL'] && hnTask['Open URL'].url && (
              <Tooltip title="Open URL">
                <a
                  href={hnTask['Open URL'].url}
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

            {hnTask.Type && hnTask.Type.toLowerCase().includes('call') && (
              <CallsCallout />
            )}

            <div className="p-relative margin-left-8">
              {hnTask['Assigned HN Name'] && (
                <Tooltip title={hnTask['Assigned HN Name']}>
                  {!hnTask['Assigned HN Name'].includes('Antara Bot') ? (
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
    }

    const renderTaskRecord = (hnTask: any) => {
      const DisplayInfo = renderDisplayInfo(hnTask)
      return hnTask.Status === 'Complete' ? (
        <StrikeThrough>
          <DisplayInfo />
        </StrikeThrough>
      ) : (
        <DisplayInfo />
      )
    }

    const renderTaskRecords = (
      records: any,
      getDisplayedInfo: (data: any) => JSX.Element
    ) => {
      const recordsWithMetadata = addKeyToValue(records).map(({ data, id }) => {
        return {
          data: includeFieldTypes(data),
          name: getDisplayedInfo(data),
          id, // Airtable Record ID
        }
      })
      return recordsWithMetadata
    }

    if (mergedRecords) {
      const recordsToDisplay = renderTaskRecords(
        mergedRecords,
        renderTaskRecord
      )

      setAllTasks(recordsToDisplay)
      setFilteredTasks(
        recordsToDisplay.filter((task) =>
          task.data.find(
            ({ name, value }: any) => name === 'Status' && value !== 'Complete'
          )
        )
      )
    }
  }, [mergedRecords])

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
      <div>
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
              <option key="all">All Incomplete</option>
              {status.map((stat) => (
                <option key={stat}>{stat}</option>
              ))}
            </select>
          </div>
        </div>

        {allTasks &&
          !isAirtableLoading &&
          !isApiLoading &&
          !isAirtableError &&
          !apiError && (
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
        {/* Only show the Loading Message if either data sources are loading */}
        {(isAirtableLoading || isApiLoading) && (
          <div className="d-flex flex-direction-column flex-align-center margin-top-32">
            <Icon name="loading" />
            <p className="text-small">Loading Tasks...</p>
          </div>
        )}
        {/* TODO: Consider displaying any records already retrieved in addition to error details */}
        {(isAirtableError || apiError) && (
          <p className="text-small text-danger margin-top-24">
            An error occurred while fetching tasks, please refresh the page.
          </p>
        )}
      </div>
    </>
  )
}

export default Tasks
