import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAirtableFetch from '../../../../hooks/airtable-fetch.hook'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import List from '../../../utils/list/list.component'

const MemberTask = () => {
  const { recId } = useParams()
  const [memberTask, setMemberTask] = useState<any[]>([])

  const { data, isLoading, isError } = useAirtableFetch(
    `memberTask/list?filterByFormula=FIND("${recId}", {Member Record ID})`
  )

  React.useEffect(() => {
    if (data) {
      const mappedData = Object.keys(data).map((key) => {
        return {
          data: data[key],
          name: data[key].Name,
        }
      })
      setMemberTask(mappedData)
    }
  }, [data])
  const isReadytoShowTasks = memberTask?.length > 0 && !isLoading && !isError

  const getCreatedDate = (task: any) => {
    return task.Created
  }
  const getStatus = (task: any) => {
    return task.Status
  }
  return (
    <div className="full-width">
      {isReadytoShowTasks && (
        <div data-testid="data-list-1">
          <List
            list={memberTask}
            getTopLeftText={getCreatedDate}
            getTopRightText={getStatus}
            modalTitle="Member Task"
            data-testid="data-list-1"
            emptyListText="No tasks found."
            dateColumnKey="task Created At"
          />
        </div>
      )}
      {isLoading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Member tasks</p>
        </div>
      )}

      {isError && (
        <p className="text-danger">
          An error occurred while displaying Member tasks, please refresh the
          page, if it persists contact help desk.
        </p>
      )}
    </div>
  )
}

export default MemberTask
