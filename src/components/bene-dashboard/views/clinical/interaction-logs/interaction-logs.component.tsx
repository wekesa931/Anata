import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import airtableFetch from '../../../../../resources/airtableFetch'
import List from '../../../../utils/list/list.component'

const InteractionLogs = () => {
  const [interactions, setInteractions] = useState<any>()
  const { recId } = useParams()
  useEffect(() => {
    airtableFetch(
      `interactions/list/0?view=HN Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})&fields[]=encounter_datetime&fields[]=Interactor Type&fields[]=Mode of Communication&fields[]=Interaction Summary Notes&fields[]=HN Name&fields[]=Member Name&fields[]=Antara ID&fields[]=Reporting Week`
    ).then((response) => {
      const mappedResponse = Object.keys(response)
        .map((key) => response[key])
        .map((data) => ({
          data,
          name: data['Interaction Summary Notes'],
        }))
      setInteractions(mappedResponse)
    })
  }, [recId])

  const getInteractionDate = ({ encounter_datetime }: any) => {
    return dayjs(encounter_datetime).format("DD MMM 'YY, H:mm A")
  }

  return interactions ? (
    <div>
      <h4>Interaction Logs</h4>
      <div className="interactions">
        <List
          list={interactions}
          getTopLeftText={getInteractionDate}
          getTopRightText={(data) => data['HN Name']}
          emptyListText="No interaction logs recorded."
          modalTitle="Interaction log"
          defaultNoElements={6}
          elementIncrement={6}
          paginate
        />
      </div>
    </div>
  ) : null
}

export default InteractionLogs
