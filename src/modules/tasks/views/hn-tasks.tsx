import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useLazyQuery } from '@apollo/client'
import { ExternalLink } from 'react-feather'
import airtableFetch from 'src/services/airtable/fetch'
import List from 'src/components/list'
import Tooltip from 'src/components/tooltip'
import { filterFields } from 'src/utils/airtable/field-utils'
import getTaskFields from 'src/modules/tasks/config/hn-tasks-fields'
import useAirtableFetch from 'src/hooks/airtable-fetch'
import FORMS from 'src/modules/workflows/components/forms/form-inputs-definitions'
import { GET_MEMBER_TASKS } from 'src/modules/tasks/services/gql'
import logError from 'src/utils/logging/logger'
import { useFormsRouting } from 'src/modules/workflows/hooks/routing/forms'
import useHandleResponses from 'src/utils/airtable/error-handler'
import useAntaraStaff, {
  mapAssigneeToLookup,
} from 'src/hooks/antara-staff.hook'
import { useMember } from 'src/context/member'
import { useModuleAnalytics } from 'src/modules/analytics'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import DoneIcon from '@mui/icons-material/Done'
import CachedIcon from '@mui/icons-material/Cached'
import { useNotifications } from 'src/context/notifications'
import TaskModal, {
  TTemplateData,
} from 'src/modules/tasks/components/task-modal'
import useTaskModuleData from 'src/modules/tasks/hooks/tasks-module.data'
import { useAirtableMeta } from 'src/context/airtable-meta'
import AirtableField from 'src/types/airtable-field'
import { Checkbox, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import styles from './tasks.module.css'

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
      assignee: 'Assignee Name',
      lastStatusChangedAt: 'Last Status changed at',
      formUrl: 'Open URL',
      reasonForCancellation: 'Reason for cancellation',
      taskDefinition: 'Task definition',
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
        assignee: string
        lastStatusChangedAt: string
        formUrl: string
        reasonForCancellation: string
        taskDefinition: string
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

function getPriorityLabel(priority: any) {
  switch (priority) {
    case 'High':
    case 'P0':
      return 'P0'
    case 'Medium':
    case 'P1':
      return 'P1'
    case 'Low':
    case 'P3':
      return 'P2'
    default:
      return 'P3'
  }
}

function getPriorityStyle(priority: any) {
  switch (priority) {
    case 'High':
    case 'P0':
      return 'bg-[#ffebea] text-[#ff3b30]'
    case 'Medium':
    case 'P1':
      return 'bg-[#fff5e5] text-[#ff9500]'
    case 'Low':
    case 'P3':
      return 'bg-[#e7f3fd] text-[#007aff]'
    default:
      return ''
  }
}
type CheckedItems = Record<string, any | null>

function Tasks() {
  const [activeTasks, setActiveTasks] = useState<any[]>([])
  const { openForm } = useFormsRouting()

  const [inActiveTasks, setInactiveTasks] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [templateData, setTemplateData] = useState<TTemplateData>({
    smsTemplate: ' ',
    interactionLogTemplate: ' ',
    defaultReschedulingDays: 1,
  })

  const allActive = (value: string) =>
    value === 'In Progress' ||
    value === 'Not Started' ||
    value === 'On Hold' ||
    value === 'Overdue'
  const allInActive = (value: string) =>
    value === 'Complete' || value === 'Cancelled' || value === 'Not Applicable'

  const { member } = useMember()
  const { notify } = useNotifications()

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
    'Reason for cancellation',
    'Number of Attempts',
    'Task definition',
    'Appointment',
    'Appointment Record ID',
  ]

  function buildAirtableUrl(memberRecordId: any, queryFields: string[]) {
    if (!memberRecordId) {
      return ''
    }
    const sortArg = `sort=[{"field":"Due Date","direction":"asc"}]`
    const filterArg = `filterByFormula=AND(FIND("${memberRecordId}", {Member Record ID}), FIND("Antara Bot", {Assignee Name})=0)`

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
  } = useAirtableFetch(buildAirtableUrl(member?.airtableRecordId, fields))

  const { handleResponses } = useHandleResponses('Tasks')

  const { allAntaraStaffs, loading: loadingAntaraStaff } = useAntaraStaff()
  const {
    trackActionEdited,
    trackTaskCompletion,
    trackMissedTaskClicked,
    trackActiveTasksSectionOpened,
    trackInActiveTasksSectionOpened,
    trackTaskCompletionForMultipleTasks,
  } = useModuleAnalytics()
  const { handleDataUpdate } = useTaskModuleData()

  const [
    loadTasks,
    { error: apiError, loading: isApiLoading, data: rawApiRecords },
  ] = useLazyQuery(GET_MEMBER_TASKS, {})

  const [taskFields, setTaskFields] = useState<AirtableField[]>([])
  const { airtableMeta, getFieldOptions, taskDefinitions } = useAirtableMeta()
  const [selectedTasks, setSelectedTasks] = useState<CheckedItems>({})
  const [value, setValue] = React.useState<string>('active')
  const [isCompletingTasks, setIsCompletingTasks] = useState<string | boolean>(
    false
  )
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    if (newValue === 'active') {
      trackActiveTasksSectionOpened(activeTasks)
    }
    if (newValue === 'inactive') {
      trackInActiveTasksSectionOpened(inActiveTasks)
    }
  }

  useEffect(() => {
    if (airtableMeta) {
      setTaskFields(
        getTaskFields(
          mapAssigneeToLookup(allAntaraStaffs),
          getFieldOptions,
          taskDefinitions
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airtableMeta, allAntaraStaffs, loadingAntaraStaff])

  // const taskFields = getTaskFields(mapAssigneeToLookup(allAntaraStaffs))
  useEffect(() => {
    if (member?.antaraId) {
      loadTasks({ variables: { antaraId: member?.antaraId } })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member?.antaraId])

  const apiRecords = useTransformedApiRecords(rawApiRecords)
  const mergedRecords = useMergedRecords(airtableRecords, apiRecords)

  function StrikeThrough({ children }: any) {
    return <s className="text-disabled">{children}</s>
  }
  const includeFieldTypes = (data: { [x: string]: any }) => {
    return taskFields.map((field) => ({
      ...field,
      value: data[field.name] || null,
    }))
  }

  const extractPrefills = (url: string) => {
    if (!url) {
      return {}
    }

    const re = /prefill_(?<key>[A-Za-z+]*)=(?<value>[A-Za-z0-9%20+ ]*)/gm
    const matches: MatchType[] = [...url.matchAll(re)].map(
      (r) => r.groups
    ) as MatchType[]

    // parse the matches
    let data = {}
    matches.forEach((m) => {
      let { key, value } = m

      key = key.replace(/\+/g, ' ')
      value = decodeURIComponent(decodeURI(value))
        .replace(/^\[|\]$/g, '')
        .replace(/^'|"|'$/g, '')
        .replace(/\+/g, ' ')

      if (typeof value === 'string' && value.startsWith('rec')) {
        value = [value]
      }

      if (key === 'Received diagnosis') {
        data = {
          ...data,
          [key]: value !== 'none' && value !== 'False' ? 'True' : 'False',
        }
      } else {
        data = {
          ...data,
          [key]: value === '' ? null : value,
        }
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

  const handleTaskCompletion = async (taskIds: string[]) => {
    setIsCompletingTasks(taskIds.length ? taskIds[0] : false)

    const updatedTasks = taskIds.map((taskId) => ({
      id: taskId,
      fields: {
        Status: 'Complete',
      },
    }))

    // Update all selected tasks
    await Promise.all(
      updatedTasks.map((task) =>
        handleDataUpdate(updatedTasks).then(() => {
          trackTaskCompletion(task)
          trackTaskCompletionForMultipleTasks(task)
        })
      )
    )
      .then(() => {
        notify('Selected tasks updated successfully')
      })
      .catch((error) => {
        logError(error)
        notify(error?.message || 'Something went wrong')
      })
      .finally(() => {
        setIsCompletingTasks(false)
        refetchTasks()
        setSelectedTasks({}) // Clear selected tasks after completion
      })
  }

  const extractTaskTemplate = (taskDefs: any[], tasks: any[]) => {
    const getDefaultReschedulingDays = (taskDef: any[]) => {
      return taskDef.length > 0
        ? Math.max(...taskDef.map((t) => t.defaultReschedulingDays || 0))
        : 1
    }

    const defaultReschedulingDays = getDefaultReschedulingDays(taskDefs)

    let smsTemplate = ''
    const smsContent = taskDefs.find((taskDef) => {
      return (
        taskDef['Notification content from template for missed tasks'] &&
        taskDef['Notification content from template for missed tasks'].length >
          0
      )
    })?.['Notification content from template for missed tasks'][0]
    if (smsContent) {
      const memberTaskType = taskDefs
        .map((taskDef) => taskDef['Member facing name for Task type'])
        .filter(Boolean) // Filter out empty values
        .join(', ')
      smsTemplate = smsContent
        .replace(/\{Member Name\}/g, member?.fullName)
        .replace(/\[Services\]/g, memberTaskType.trim())
    } else {
      smsTemplate = ' '
    }

    // Build the interaction log content with clinical preferred names
    let interactionLogContent = ''
    const interactionLogDetails = taskDefs.find(
      (taskDef) => taskDef['Interaction log form content']
    )?.['Interaction log form content']
    if (interactionLogDetails) {
      interactionLogContent = interactionLogDetails.replace(
        /\[SMS content\]/g,
        smsTemplate
      )

      // Loop through tasks to include all clinical preferred names
      const clinicalPreferredNames = tasks.map((task) => task.Type).join(', ')
      interactionLogContent = interactionLogContent.replace(
        /\[Clinical preferred name\]/g,
        clinicalPreferredNames
      )
    } else {
      interactionLogContent = ' '
    }

    const interactionLogTemplate = interactionLogContent

    return {
      smsTemplate,
      interactionLogTemplate,
      defaultReschedulingDays,
    }
  }

  const handleRescheduleDialog = async (tasks: any[]) => {
    // Fetch task definitions for all tasks
    const taskDefinitions = [
      ...new Set(
        tasks
          .map((task) => {
            const taskDefinition = task?.['Task definition'] || []
            return taskDefinition
          })
          .filter((definition) => definition !== null) || []
      ),
    ]

    try {
      const filterFormula = `OR(${taskDefinitions
        .map((definition) => `{Name} = "${definition}"`)
        .join(', ')})`

      const fetchedTaskDefinitions = await airtableFetch(
        `tasksDefinition/list?filterByFormula=${encodeURIComponent(
          filterFormula
        )}`
      )

      const processedDefinitions = fetchedTaskDefinitions.map((def: any) => {
        return {
          ...def,
          recordId: def.id,
        }
      })

      setTemplateData(extractTaskTemplate(processedDefinitions, tasks))
      setModalOpen(true)

      // Track missed task clicked for all tasks
      tasks.forEach((task) => trackMissedTaskClicked(task, tasks.length))
      trackMissedTaskClicked(tasks, tasks.length)
    } catch (error) {
      logError(error)
      notify('Error fetching task definitions')
    }
  }

  useEffect(() => {
    // Display the mergedRecords
    function DisplayInfo({ hnTask }: any) {
      return (
        <div
          className={`${styles.taskContainer} ml-2 p-0 bg-${
            allActive(hnTask.Status) &&
            !!selectedTasks?.[hnTask.recordid]?.selected
              ? 'blue-10'
              : 'white'
          }`}
        >
          <div className={`${styles.taskContainerInner} !p-0`}>
            <div>
              <div className="text-normal font-medium flex justify-between items-center">
                {allActive(hnTask.Status) && (
                  <Tooltip title="Select">
                    <Checkbox
                      onChange={() => {
                        setSelectedTasks((prev) => {
                          const prevChecked = prev?.[hnTask.recordid] || null

                          return {
                            ...prev,
                            [hnTask.recordid]: prevChecked
                              ? null
                              : { ...hnTask, selected: true },
                          }
                        })
                      }}
                      checked={
                        !!selectedTasks?.[hnTask.recordid] &&
                        !!selectedTasks?.[hnTask.recordid]?.selected
                      }
                      sx={{
                        '&:hover': {
                          color: 'var(--dark-blue-70)',
                        },
                        '&.Mui-checked': {
                          color: 'var(--dark-blue-70)',
                        },
                        color: 'var(--dark-blue-50)',
                      }}
                      // className="bg-[#ebfbed]  text-[#34c759]  w-8 h-9 rounded-sm mr-2"
                      onClick={(e) => {
                        e?.stopPropagation()
                      }}
                    />
                  </Tooltip>
                )}
                <span
                  className={`status !m-0 mr-4 ${getPriorityStyle(
                    hnTask['Task Priority']
                  )}`}
                >
                  {getPriorityLabel(hnTask['Task Priority'])}
                </span>

                <p>{hnTask.Type}</p>
                <button className="flex btn !mr-0 w-3/4 justify-end">
                  {allActive(hnTask.Status) &&
                    Object.values(selectedTasks).every((c) => !c?.selected) && (
                      <>
                        {isCompletingTasks === hnTask.recordid ? (
                          <LoadingIcon className="bg-white-100 w-8 h-9" />
                        ) : (
                          <Tooltip title="Complete Task">
                            <DoneIcon
                              className="bg-[#ebfbed]  text-[#34c759]  w-8 h-9 rounded-sm mr-2"
                              onClick={(e) => {
                                e?.stopPropagation()
                                handleTaskCompletion([hnTask.recordid])
                              }}
                            />
                          </Tooltip>
                        )}
                        <Tooltip title="Missed Task">
                          <CachedIcon
                            className="bg-[#fff5e5] text-[#ff9500] w-8 h-9 rounded-sm mr-2"
                            onClick={(e) => {
                              e?.stopPropagation()
                              setSelectedTasks({ [hnTask.recordid]: hnTask })
                              handleRescheduleDialog([hnTask])
                            }}
                          />
                        </Tooltip>
                      </>
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
                              (fm: any) =>
                                fm.formId === url[0] || fm.id === url[0]
                            )
                            formMeta
                              ? openForm(formMeta.name, prefills)
                              : window.open(hnTask['Open URL']?.url)
                          }

                          e.stopPropagation()
                        }}
                      >
                        <ExternalLink
                          className="bg-[#e7f3fd] w-8 h-9 rounded-sm mr-2"
                          color="var(--blue-50)"
                        />
                      </button>
                    </Tooltip>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="border-b border-solid border-[#d9d9d9] mt-2  w-[95%]" />
          <div className="flex justify-between mt-3 text-xs w-full">
            <section>
              <p className="text-dark-blue-50"> Status</p>
              <span className="status !m-0 mt-2">{hnTask.Status}</span>
            </section>
            <div className="border-r border-solid border-[#d9d9d9] m-2" />
            <section>
              <p className="text-dark-blue-50"> Due Date</p>
              <p className="mt-2">
                {dayjs(hnTask['Due Date']).format('DD MMM YYYY')}
              </p>
            </section>
            <div className="border-r border-solid border-[#d9d9d9] m-2" />
            <div>
              <section>
                <p className="text-dark-blue-50">Assigned to</p>
                {hnTask['Assignee Name'] ? (
                  <p className="mt-2">{hnTask['Assignee Name']}</p>
                ) : (
                  <p className="mt-2">-</p>
                )}
              </section>
            </div>
            <div className="border-r border-solid border-[#d9d9d9] m-2" />
            <section>
              <p className="text-dark-blue-50"> # attempts</p>
              <p className="mt-2">{hnTask['Number of Attempts'] || 0} </p>
            </section>
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
      setActiveTasks(
        recordsToDisplay.filter((task) =>
          task.data.find(
            ({ name, value }: any) => name === 'Status' && allActive(value)
          )
        )
      )

      setInactiveTasks(
        recordsToDisplay.filter((task) =>
          task.data.find(
            ({ name, value }: any) => name === 'Status' && allInActive(value)
          )
        )
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedRecords, selectedTasks, isCompletingTasks])

  const getTaskNotes = (record: any) => {
    if (record.Status !== 'Complete') {
      return record['Task Notes']
    }
    return null
  }

  const updateTask = async (task: { id: string; fields: any }) => {
    // validate that the assignee is not reset to null
    if ('Assignee' in task.fields && !task.fields.Assignee) {
      throw new Error('Cannot remove assignee from task')
    }
    await airtableFetch('hntasks', 'post', {
      id: task.id,
      fields: {
        ...task.fields,
        Assignee: task.fields.Assignee
          ? [task.fields.Assignee]
          : task.fields.Assignee,
      },
    })
      .then((res) => {
        trackActionEdited('Tasks', task.fields)
        handleResponses(res)
      })
      .catch((err) => {
        logError(err)
      })
      .finally(() => {
        return refetchTasks()
      })
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
          <div className="flex flex-col h-full">
            <TabContext value={value}>
              <div className="flex justify-between items-center font-rubik font-medium">
                <TabList onChange={handleChange}>
                  <Tab label="Active" className="uppercase" value="active" />
                  <Tab
                    label="Inactive"
                    className="uppercase"
                    value="inactive"
                  />
                </TabList>
              </div>
              <div className="flex justify-between items-center font-rubik font-medium mt-3 ">
                {value === 'active' &&
                  Object.values(selectedTasks).some((c) => !!c?.selected) && (
                    <>
                      <p className="text-dark-blue-50 mr-2 whitespace-pre-wrap">
                        Mark selected tasks as
                      </p>
                      <button className="flex justify-end">
                        <Tooltip>
                          <button
                            onClick={() => {
                              const checkedTaskIds = Object.keys(
                                selectedTasks
                              ).filter((taskId) => selectedTasks[taskId])
                              handleTaskCompletion(checkedTaskIds)
                            }}
                            className={`flex items-center text-[#ebfbed] h-9 p-[5px] rounded mr-2 ${
                              isCompletingTasks
                                ? 'bg-white-100'
                                : 'bg-[#34c759]'
                            }`}
                          >
                            {isCompletingTasks ? (
                              <LoadingIcon />
                            ) : (
                              <>
                                <DoneIcon />
                                <span className="font-bold text-base">
                                  Done
                                </span>
                              </>
                            )}
                          </button>
                        </Tooltip>

                        <Tooltip>
                          <button
                            onClick={() => {
                              const checkedTasks = Object.values(
                                selectedTasks
                              ).filter((task) => !!task)
                              handleRescheduleDialog(checkedTasks)
                            }}
                            className="flex items-center bg-[#ff9500] text-[#fff5e5] h-9 p-[5px] rounded"
                          >
                            <CachedIcon />
                            <span className="font-bold text-base">Missed</span>
                          </button>
                        </Tooltip>
                      </button>
                    </>
                  )}
              </div>
              <div>
                <TabPanel value="active" className="p-0">
                  <List
                    list={activeTasks}
                    getTopRightText={getTaskNotes}
                    modalTitle="Task"
                    data-testid="data-list-1"
                    emptyListText="No tasks found."
                    editable
                    onEdit={updateTask}
                    selectedTasks={Object.values(selectedTasks).filter(
                      (task) => !!task
                    )}
                  />
                </TabPanel>
              </div>
              <div>
                <TabPanel value="inactive" className="p-0">
                  <List
                    list={inActiveTasks}
                    getTopRightText={getTaskNotes}
                    modalTitle="Task"
                    data-testid="data-list-1"
                    emptyListText="No tasks found."
                    editable
                    onEdit={updateTask}
                  />
                </TabPanel>
              </div>
            </TabContext>
          </div>
        </>
      )}
      {/* Only show the Loading Message if either data sources are loading */}
      {(isAirtableLoading || isApiLoading) && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon className="w-6 h-6" />
          <p className="text-small">Loading Tasks...</p>
        </div>
      )}
      {/* TODO: Consider displaying any records already retrieved in addition to error details */}
      {(isAirtableError || apiError) && (
        <p className="text-small text-danger margin-top-24">
          An error occurred while fetching tasks, please refresh the page.
        </p>
      )}
      {modalOpen && (
        <TaskModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modalTitle="Task"
          refetchTasks={() => {
            refetchTasks()
            setSelectedTasks({})
          }}
          templateData={templateData}
          selectedTasks={Object.values(selectedTasks).filter((task) => !!task)}
        />
      )}
    </div>
  )
}

export default Tasks
