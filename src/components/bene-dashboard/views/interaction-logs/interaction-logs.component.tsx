import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useQuery } from '@apollo/client'
import List from '../../../utils/list/list.component'
import analytics from '../../../../helpers/segment'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'
import { GET_MEMBER_INTERACTIONS } from '../../../../gql/interactions'
import { useMember } from '../../../../context/member.context'
import { useSortFilter } from '../../../../context/sort-filter-views.context'

const InteractionLogs = () => {
  const [interactions, setInteractions] = useState<any>([])
  const [filteredInteractions, setFilteredInteractions] = useState<any>([])
  const { member } = useMember()
  const { loading, error, data } = useQuery(GET_MEMBER_INTERACTIONS, {
    variables: { antaraId: member['Antara ID'] },
  })
  const {
    ops: {
      filters: { interactions: filters },
    },
  } = useSortFilter()

  const getInteractionDate = (interaction: any) => {
    // temporary workaround until timezones are fixed on the database
    // remove .utc after
    return dayjs
      .utc(interaction['interaction Started At'])
      .format("DD MMM 'YY, HH:mm A")
  }

  const getHN = (interaction: any) => {
    return interaction['health Navigator']
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
