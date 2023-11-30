import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useLazyQuery } from '@apollo/client'
import List from 'src/components/list'
import analytics from 'src/config/analytics'
import LoadingIcon from 'src/assets/img/icons/loading.svg?react'
import { GET_MEMBER_INTERACTIONS } from 'src/modules/interactions/services/gql'
import { useSortFilter } from 'src/context/sort-filter'
import { useParams } from 'react-router-dom'

function InteractionLogs() {
  const [interactions, setInteractions] = useState<any>([])
  const [filteredInteractions, setFilteredInteractions] = useState<any>([])
  const { antaraId } = useParams()
  const [getInteractions, { loading, error }] = useLazyQuery(
    GET_MEMBER_INTERACTIONS,
    {
      onCompleted: (data) => {
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
      },
    }
  )

  const {
    ops: {
      filters: { interactions: filters },
    },
  } = useSortFilter()

  const getInteractionDate = (interaction: any) => {
    return dayjs(interaction['interaction Started At']).format(
      "DD MMM 'YY, HH:mm A"
    )
  }

  const getHN = (interaction: any) => {
    return interaction['health Navigator']
  }

  const toSentenceCase = (str: string) => {
    return str.replace(/([A-Z])/g, ' $1')
  }

  useEffect(() => {
    if (antaraId) {
      getInteractions({ variables: { antaraId } })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [antaraId])

  useEffect(() => {
    let filteredInts = interactions
    if (filters) {
      if (filters.direction) {
        filteredInts = filteredInts.filter(
          (interaction: any) =>
            interaction.data[toSentenceCase('interactionDirection')] ===
            filters.direction
        )
      }
      if (filters.mode_of_communication) {
        filteredInts = filteredInts.filter(
          (interaction: any) =>
            interaction.data[toSentenceCase('modeOfCommunication')] ===
            filters.mode_of_communication
        )
      }
    }
    setFilteredInteractions(filteredInts)
  }, [interactions, filters])

  useEffect(() => {
    analytics.track('Interaction Logs Opened')
  }, [])

  return (
    <>
      <div className="d-flex flex-align-center">
        <h4>Interaction Logs</h4>
        {filters && filters.mode_of_communication && (
          <span className="badge badge-success">
            Communication: {filters.mode_of_communication}
          </span>
        )}
        {filters && filters.direction && (
          <span className="badge badge-success">
            Interaction Direction: {filters.direction}
          </span>
        )}
      </div>
      {loading && (
        <div className="d-flex flex-direction-column flex-align-center margin-top-32">
          <LoadingIcon />
          <p className="text-small">Loading Interaction Logs</p>
        </div>
      )}
      {filteredInteractions && !loading && (
        <div className="interactions">
          <List
            list={filteredInteractions}
            getTopLeftText={getInteractionDate}
            getTopRightText={getHN}
            emptyListText="No interaction logs recorded."
            modalTitle="Interaction log"
            dateColumnKey="interaction Started At"
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
