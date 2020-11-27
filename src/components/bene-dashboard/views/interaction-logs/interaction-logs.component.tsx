import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useQuery } from '@apollo/client'
import List from '../../../utils/list/list.component'
import analytics from '../../../../helpers/segment'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import { GET_MEMBER_INTERACTIONS } from '../../../../gql/interactions'
import { useMember } from '../../../../context/member.context'

const InteractionLogs = () => {
  const [interactions, setInteractions] = useState<any>()
  const { member } = useMember()
  const { loading, error, data } = useQuery(GET_MEMBER_INTERACTIONS, {
    variables: { antaraId: member['Antara ID'] },
  })

  const getInteractionDate = ({ interactionStartedAt }: any) => {
    return dayjs(interactionStartedAt).format("DD MMM 'YY, H:mm A")
  }

  const getHN = (interaction: any) => {
    return interaction['health Navigator'].fullName
  }

  const toSentenceCase = (str: string) => {
    return str.replace(/([A-Z])/g, ' $1')
  }

  useEffect(() => {
    if (data && data.memberInteractions) {
      const mappedResponse = data.memberInteractions.edges.map(
        ({ node }: any) => ({
          data: Object.keys(node).reduce((acc, key) => {
            if (key === 'healthNavigator') {
              return {
                ...acc,
                [toSentenceCase(key)]: node[key].fullName,
              }
            }
            return {
              ...acc,
              [toSentenceCase(key)]: node[key],
            }
          }, {}),
          name: node.interactionSummaryNotes,
        })
      )
      setInteractions(mappedResponse)
    }
  }, [data])

  useEffect(() => {
    analytics.track('Interaction Logs Opened')
  }, [])

  return (
    <>
      <h4>Interaction Logs</h4>
      {loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Interaction Logs</p>
        </div>
      )}
      {interactions && !loading && (
        <div className="interactions">
          <List
            list={interactions}
            getTopLeftText={getInteractionDate}
            getTopRightText={getHN}
            emptyListText="No interaction logs recorded."
            modalTitle="Interaction log"
            defaultNoElements={6}
            elementIncrement={6}
            paginate
          />
        </div>
      )}
      {error && (
        <p className="text-danger">
          An error occurred while displaying interaction logs, please refresh
          the page, if it persists contact help desk.
        </p>
      )}
    </>
  )
}

export default InteractionLogs
