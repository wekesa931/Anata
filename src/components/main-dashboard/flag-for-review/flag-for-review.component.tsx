import { useQuery } from '@apollo/client'
import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import {
  GET_ALL_FLAGGED_INTERACTIONS,
  GET_ALL_INTERACTIONS,
} from '../../../gql/interactions'
import LoadingIcon from '../../../assets/img/icons/loading.svg'
import List from '../../utils/list/list.component'
import styles from './flag-for-review.component.css'
import analytics from '../../../helpers/segment'

const ALL_INTERACTIONS = 'All'

const FlagForReview = () => {
  const [startDate, setStartDate] = React.useState<Date>(new Date())
  const [endDate, setEndDate] = React.useState<Date>(new Date())
  const [filter, setFilter] = React.useState<string>(ALL_INTERACTIONS)
  const { loading, error, data } = useQuery(
    filter === ALL_INTERACTIONS
      ? GET_ALL_INTERACTIONS
      : GET_ALL_FLAGGED_INTERACTIONS,
    {
      variables: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    }
  )

  React.useEffect(() => {
    analytics.track('Flagged for review opened')
  }, [])

  const listItemDisplay = (node: any) => {
    return (
      <div className="d-flex flex-justify-space-between flex-align-center">
        <div>
          <p>
            {node.member.firstName} {node.member.surname}
          </p>
          <p className="text-success">
            {node.outboundInteractionCategory ||
              node.inboundInteractionCategory}
          </p>
        </div>
        <div>
          <Link
            className="btn btn-secondary"
            to={`/member/${node.member.atRecordId}`}
          >
            Open
          </Link>
        </div>
      </div>
    )
  }

  const getReviewStatus = (node) => {
    switch (node['flag For Review']) {
      case 'YES':
        return <span className="text-danger">Flagged</span>
      case 'REVIEWED':
        return <span className="text-success">Reviewed</span>
      default:
        return null
    }
  }

  const toSentenceCase = (str: string) => {
    return str.replace(/([A-Z])/g, ' $1')
  }

  const formatData = (node, key, acc) => {
    if (key === 'healthNavigator') {
      return {
        ...acc,
        [toSentenceCase(key)]: node[key].fullName,
      }
    }
    if (key === 'member') {
      return {
        ...acc,
        [toSentenceCase(
          key
        )]: `${node[key].firstName} ${node[key].surname} - ${node[key].antaraMemberId}`,
      }
    }
    return {
      ...acc,
      [toSentenceCase(key)]: node[key],
    }
  }

  return (
    <div>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <div>
            <div className="d-flex flex-align-center">
              <div className="d-flex flex-direction-column">
                <label htmlFor="start">
                  From
                  <input
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    className={`form-control ${styles.filter}`}
                    type="date"
                    value={dayjs(startDate).format('YYYY-MM-DD')}
                    id="start"
                  />
                </label>
              </div>
              <span className="margin-top-16">&rarr;</span>
              <div className="d-flex flex-direction-column">
                <label htmlFor="end">
                  To
                  <input
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    className={`form-control ${styles.filter}`}
                    type="date"
                    value={dayjs(endDate).format('YYYY-MM-DD')}
                    id="end"
                  />
                </label>
              </div>
            </div>
          </div>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className={`form-control ${styles.filter}`}
          >
            <option value="All">All</option>
            <option value="Flagged">Flagged</option>
          </select>
        </div>
      </div>
      {!loading && !error && data && (
        <>
          <h5 className="text-blue-dark">
            Showing <span className="text-primary">{filter.toLowerCase()}</span>{' '}
            interactions that occurred
            <span className="text-primary">
              {dayjs(startDate).isSame(endDate, 'd')
                ? ` on ${dayjs(startDate).format('DD MMM YYYY')}`
                : ` from ${dayjs(startDate).format('DD MMM YYYY')} to ${dayjs(
                    endDate
                  ).format('DD MMM YYYY')}`}
            </span>
          </h5>
          <List
            list={data.allInteractions.edges.map(({ node }) => {
              return {
                name: listItemDisplay(node),
                data: Object.keys(node).reduce(
                  (acc, key) => formatData(node, key, acc),
                  {}
                ),
              }
            })}
            getTopRightText={(node) => (
              <span>
                {node['health Navigator']} {getReviewStatus(node)}
              </span>
            )}
            getTopLeftText={(node) =>
              dayjs(node['interaction Started At']).format('DD MMM YYYY HH:mm')
            }
            modalTitle="Interaction"
            defaultNoElements={10}
            elementIncrement={10}
            paginate
          />
        </>
      )}
      {loading && <LoadingIcon />}
      {error && (
        <p className="text-danger">
          An error occured while attempting to fetch flagged interactions,
          please refresh the page.
        </p>
      )}
    </div>
  )
}

export default FlagForReview
