import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { User, ExternalLink } from 'react-feather'
import airtableFetch from 'src/services/airtable/fetch'
import List from 'src/components/list'
import Icon from 'src/components/icon/svg-icon'
import Tooltip from 'src/components/tooltip'
import { filterFields } from 'src/utils/airtable/field-utils'
import getTaskFields from 'src/modules/tasks/config/hn-tasks-fields'
import useAirtableFetch from 'src/hooks/airtable-fetch'
import CallsCallout from 'src/modules/comms/calls/views'
import FORMS from 'src/modules/workflows/components/forms/form-inputs-definitions'
import { GET_MEMBER_TASKS } from 'src/modules/tasks/services/gql'
import logError from 'src/utils/logging/logger'
import { useFormsRouting } from 'src/modules/workflows/hooks/routing/forms'
import useHandleResponses from 'src/utils/airtable/error-handler'
import useAntaraStaff, {
  mapAssigneeToLookup,
} from 'src/hooks/antara-staff.hook'
import styles from './tasks.component.css'
import PrescriptionName from '../components/prescription-name'

type RecordWithId = { data: any; id: string }
type MatchType = { key: string; value: string }

function useTransformedApiRecords(rawApiRecords: any) {
  // Transforms HN Task records from src API into the same format used by Airtable records
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
        fullName: 'Assignee Name',
      },
      lastStatusChangedAt: 'Last Status changed at',
      formUrl: 'Open URL',
    }
    // TODO: Replace this with a callback so that this custom hook
    // can be reused for other record types
    const transformApiRecord = (node: any, mapData: any) => {
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
    const transformApiRecords = (
      records: { memberHnTasks: { edges: any[] } },
      mapData: {
        type: string
        dueDate: string
        taskNotes: string
        status: string
        taskPriority: string
        measurementsToTake: string
        assignee: { fullName: string }
        lastStatusChangedAt: string
        formUrl: string
      }
    ) => {
      const mappedResponse = records.memberHnTasks.edges.reduce(
        (acc: any, { node }: any) => {
          const newEntry = transformApiRecord(node, mapData)
          Object.assign(acc, newEntry)
          return acc
        },
        {}
      )
      return mappedResponse
    }
    if (rawApiRecords) {
      let cleanedRecords = rawApiRecords.memberHnTasks.edges.filter(
        (rec) => rec.node.status !== 'Not Started'
      )
      cleanedRecords = { memberHnTasks: { edges: cleanedRecords } }
      const transformed = transformApiRecords(
        cleanedRecords,
        apiToAirtableFieldMap
      )
      setApiRecords(transformed)
    }
  }, [rawApiRecords])

  return apiRecords
}

function useMergedRecords(
  airtableRecords: React.SetStateAction<any[]>,
  apiRecords: any[]
) {
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

function Tasks() {
  const [allTasks, setAllTasks] = useState<any[]>([])
  const [filteredTasks, setFilteredTasks] = useState<any[]>([])
  const { openForm } = useFormsRouting()

  const [upnextTasks, setUpnextTasks] = useState<any[]>([])

  const defaultTaskFilterStatus = 'All Incomplete'
  const allIncomplete = (value: string) =>
    value === 'In Progress' || value === 'Not Started' || value === 'On Hold'

  const status = [
    'Not Started',
    'Complete',
    'In Progress',
    'Cancelled',
    'Not Applicable',
    'On Hold',
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
    'Last Status changed at',
    'Open URL',
    'Prescription Drug Names',
    'Other Prescription Drug Name',
    'Assignee Name',
    'recordid',
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

  const { antaraId } = useParams()

  const { handleResponses } = useHandleResponses('Tasks')

  const { allAntaraStaffs, loading: loadingAntaraStaff } = useAntaraStaff()

  const [
    loadTasks,
    { error: apiError, loading: isApiLoading, data: rawApiRecords },
  ] = useLazyQuery(GET_MEMBER_TASKS, {})

  const taskFields = getTaskFields(mapAssigneeToLookup(allAntaraStaffs))

  useEffect(() => {
    if (antaraId) {
      loadTasks({ variables: { antaraId } })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antaraId])

  const apiRecords = useTransformedApiRecords(rawApiRecords)
  const mergedRecords = useMergedRecords(airtableRecords, apiRecords)

  function StrikeThrough({ children }: any) {
    return <s className="text-disabled">{children}</s>
  }

  const includeFieldTypes = (data: { [x: string]: any }) => {
    return Object.keys(data).map((key) => {
      const field = taskFields.find(({ name }) => name === key)
      return field ? { value: data[key], ...field } : data
    })
  }

  const extractPrefills = (url: string) => {
    if (!url) {
      return {}
    }

    const re = /prefill_(?<key>[A-Za-z+]*)=(?<value>[A-Za-z0-9%20 ]*)/gm
    const matches: MatchType[] = [...url.matchAll(re)].map((r) => r.groups)

    // parse the matches
    let data = {}
    matches.forEach((m) => {
      let { key, value } = m

      key = key.replace(/\+/g, ' ')
      value = decodeURI(value)

      if (typeof value === 'string' && value.startsWith('rec')) {
        value = [value]
      }

      data = {
        ...data,
        [key]: value === '' ? null : value,
      }
    })

    return data
  }

  function addKeyToValue(records: { [x: string]: any }): RecordWithId[] {
    // Given a dictionary of records, insert each key into the record it maps to.
    // records is a dictionary mapping key -> record
    // Return a dictionary mapping key -> {data: record, id: key}
    return Object.keys(records).map((key) => ({ data: records[key], id: key }))
  }

  useEffect(() => {
    function getAssigneeName(assigned: string | { fullName: string }) {
      return typeof assigned === 'string' ? assigned : assigned?.fullName || ''
    }

    // Display the mergedRecords
    function DisplayInfo({ hnTask }: any) {
      return (
        <div className={styles.taskContainer}>
          <div className={styles.taskContainerInner}>
            <div className={styles.taskDiv}>
              <div className={styles.taskNameWrap}>
                <span>{hnTask.Type}</span>
                {hnTask['Assignee Name'] && (
                  <div className={styles.taskAssignee}>
                    <User width={14} height={14} />
                    {Array.isArray(hnTask['Assignee Name']) &&
                      hnTask['Assignee Name'].map(
                        (
                          assigned: string | { fullName: string },
                          index: number
                        ) => (
                          <span key={index}>{getAssigneeName(assigned)}</span>
                        )
                      )}
                  </div>
                )}
              </div>

              {hnTask['Prescription Drug Names'] && (
                <PrescriptionName
                  value={hnTask['Prescription Drug Names']}
                  otherMeds={hnTask['Other Prescription Drug Name']}
                />
              )}
              {hnTask['Open URL'] && hnTask['Open URL'].url && (
                <Tooltip title="Open URL">
                  <button
                    className="btn-unstyled"
                    data-testid="task-url-link"
                    onClick={(e) => {
                      let url = hnTask['Open URL']?.url
                      if (url) {
                        const prefills = extractPrefills(url)

                        url = url.split('/')[3].split('?')
                        const formMeta = FORMS.find(
                          (fm: any) => fm.formId === url[0] || fm.id === url[0]
                        )
                        formMeta && openForm(formMeta.name, prefills)
                      }
                      e.stopPropagation()
                    }}
                  >
                    <ExternalLink
                      color="var(--blue-50)"
                      width={16}
                      height={16}
                    />
                  </button>
                </Tooltip>
              )}
              {hnTask.Type && hnTask.Type.toLowerCase().includes('call') && (
                <CallsCallout tasksType="CALLBACK" airtableId={hnTask.airtId} />
              )}
            </div>
          </div>
          <div className={styles.taskDue}>
            <span className="status">{hnTask.Status}</span>
            <span>{dayjs(hnTask['Due Date']).format('DD MMM YYYY')}</span>
          </div>
        </div>
      )
    }

    const renderTaskRecord = (hnTask: any) => {
      return hnTask.Status === 'Complete' ? (
        <StrikeThrough>
          <DisplayInfo hnTask={hnTask} />
        </StrikeThrough>
      ) : (
        <DisplayInfo hnTask={hnTask} />
      )
    }

    const renderTaskRecords = (
      records: any,
      getDisplayedInfo: (data: any) => JSX.Element
    ) => {
      const recordsWithMetadata = addKeyToValue(records).map(({ data }) => {
        return {
          data: includeFieldTypes(data),
          name: getDisplayedInfo({ ...data, airtId: data.recordid }),
          id: data.recordid, // Airtable Record ID
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
            ({ name, value }: any) => name === 'Status' && allIncomplete(value)
          )
        )
      )

      setUpnextTasks(
        recordsToDisplay
          .filter((task) =>
            task.data.find(
              ({ name, value }: any) =>
                name === 'Status' && value === 'Not Started'
            )
          )
          .slice(0, 2)
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      fields: {
        ...task.fields,
        Assignee: task.fields.Assignee ? [task.fields.Assignee] : [],
      },
    })
      .then((res) => {
        handleResponses(res)
      })
      .catch((err) => {
        logError(err)
      })
      .finally(() => {
        return refetchTasks()
      })
  }

  const filterByStatus = (val: string) => {
    if (val === 'All Incomplete') {
      return allTasks.filter((task) =>
        task.data.find(
          ({ name, value }: any) => name === 'Status' && allIncomplete(value)
        )
      )
    }
    return allTasks.filter((task) =>
      task.data.find(
        ({ name, value }: any) => name === 'Status' && value === val
      )
    )
  }

  const isReadytoShowTasks =
    !isAirtableLoading &&
    !isApiLoading &&
    !isAirtableError &&
    !apiError &&
    !loadingAntaraStaff

  return (
    <div className="margin-top-0">
      {isReadytoShowTasks && (
        <>
          <p className="up-next">Up next</p>
          <div data-testid="data-list-2">
            <List
              list={upnextTasks}
              getTopLeftText={getPriority}
              getTopRightText={getTaskNotes}
              modalTitle="Task"
              emptyListText="No tasks found."
              editable
              onEdit={updateTask}
            />
          </div>
        </>
      )}
      <div className="d-flex flex-align-center justify-start">
        <h4>Tasks</h4>
        <div>
          <select
            onChange={(e) => setFilteredTasks(filterByStatus(e.target.value))}
            className="remove-border form-control"
            data-testid="status-filter"
          >
            <option key={defaultTaskFilterStatus}>
              {defaultTaskFilterStatus}
            </option>
            {status.map((stat) => (
              <option key={stat}>{stat}</option>
            ))}
          </select>
        </div>
      </div>
      {isReadytoShowTasks && (
        <div data-testid="data-list-1">
          <List
            list={filteredTasks}
            getTopLeftText={getPriority}
            getTopRightText={getTaskNotes}
            modalTitle="Task"
            data-testid="data-list-1"
            emptyListText="No tasks found."
            editable
            onEdit={updateTask}
          />
        </div>
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
  )
}

export default Tasks
