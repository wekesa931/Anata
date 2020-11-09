import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import List from '../../../utils/list/list.component'
import analytics from '../../../../helpers/segment'
import useAirtableFetch from '../../../../hooks/airtable-fetch.hook'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'

const InteractionLogs = () => {
  const [interactions, setInteractions] = useState<any>()
  const { recId } = useParams()
  const url = `interactions/list/0?filterByFormula=FIND("${recId}", {Member Record ID})&fields[]=encounter_datetime&fields[]=Interactor Type&fields[]=Mode of Communication&fields[]=Interaction Summary Notes&fields[]=HN Name&fields[]=Member Name&fields[]=Antara ID&fields[]=Reporting Week`
  const { data, isLoading, isError } = useAirtableFetch(url)
  useEffect(() => {
    if (data) {
      const mappedResponse = Object.keys(data)
        .map((key) => data[key])
        .map((log) => ({
          data: log,
          name: log['Interaction Summary Notes'],
        }))
      setInteractions(mappedResponse)
      analytics.track('Interaction Logs View Opened')
    }
  }, [data])

  const getInteractionDate = ({ encounter_datetime }: any) => {
    return dayjs(encounter_datetime).format("DD MMM 'YY, H:mm A")
  }

  return (
    <>
      <h4>Interaction Logs</h4>
      {isLoading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Interaction Logs</p>
        </div>
      )}
      {interactions && interactions.length > 0 && (
        <div className="interactions">
          <List
            list={interactions}
            getTopLeftText={getInteractionDate}
            getTopRightText={(log) => log['HN Name']}
            emptyListText="No interaction logs recorded."
            modalTitle="Interaction log"
            defaultNoElements={6}
            elementIncrement={6}
            paginate
          />
        </div>
      )}
      {isError && (
        <p className="text-danger">
          An error occurred while displaying interaction logs, please refresh
          the page, if it persists contact help desk.
        </p>
      )}
    </>
  )
}

export default InteractionLogs
