/* eslint-disable jsx-a11y/label-has-associated-control */
import { useLazyQuery } from '@apollo/client'
import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import {
  GET_ALL_FLAGGED_INTERACTIONS,
  GET_ALL_INTERACTIONS,
} from 'src/modules/interactions/services/gql'
import LoadingIcon from 'src/assets/img/icons/loading.svg'
import List from 'src/components/list'
import analytics from 'src/config/analytics'
import Icon from 'src/components/icon/svg-icon'
import airtableFetch from 'src/services/airtable/fetch'
import MultiSelect from 'src/components/forms/multiselect.field'
import styles from './styles.component.css'

const ALL_INTERACTIONS = 'All'

function FlagForReview() {
  const [startDate, setStartDate] = React.useState<Date>(new Date())
  const [endDate, setEndDate] = React.useState<Date>(new Date())
  const [filter, setFilter] = React.useState<string>(ALL_INTERACTIONS)
  const [team, setTeam] = React.useState<any[]>([])
  const [showFiltersMenu, setShowFiltersMenu] = React.useState(false)

  const [interactions, setInteractions] = React.useState([])
  const [assignees, setAssignees] = React.useState<string[]>([])

  const [getInteractions, { loading, error, data }] = useLazyQuery(
    filter === ALL_INTERACTIONS
      ? GET_ALL_INTERACTIONS
      : GET_ALL_FLAGGED_INTERACTIONS,
    {
      onCompleted: (data) => {
        if (data) {
          setInteractions(data.allInteractions.edges)
        }
      },
    }
  )

  React.useEffect(() => {
    getInteractions({
      variables: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    analytics.track('Flagged for review opened')
    airtableFetch('team/list?fields[]=Name').then((response) => {
      const mappedResponse = Object.keys(response)
        .map((key) => response[key])
        .map((person) => ({
          label: person.Name,
          value: person.Name,
        }))
      setTeam(mappedResponse)
    })
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
            Open Dashboard
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

  const filterByAssigned = (hns: string[]) => {
    setAssignees(hns)
    if (hns.length > 0) {
      const filteredInteractions = data.allInteractions.edges.filter(
        (interaction: any) =>
          hns.includes(interaction.node.healthNavigator.fullName)
      )
      setInteractions(filteredInteractions)
    } else {
      setInteractions(data.allInteractions.edges)
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

  // eslint-disable-next-line react/no-unstable-nested-components
  return (
    <>
      <div className={styles.form}>
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => setShowFiltersMenu(!showFiltersMenu)}
          >
            {!showFiltersMenu ? (
              <>
                <Icon
                  name="filter"
                  fill="var(--orange-base)"
                  height={16}
                  width={16}
                />
                Filters
              </>
            ) : (
              <>
                <Icon name="close_16" fill="var(--orange-base)" />
                Close
              </>
            )}
          </button>
        </div>
        <div>
          {showFiltersMenu && (
            <div className={`card ${styles.filtersMenu}`}>
              <Formik
                initialValues={{
                  assignee: '',
                  startDate: '',
                  endDate: '',
                  status: 'All',
                }}
                onSubmit={(values) => {
                  return Promise.resolve(values)
                }}
              >
                <Form>
                  <div className="d-flex flex-align-center">
                    <div className="d-flex flex-direction-column">
                      <label htmlFor="start">
                        From
                        <Field
                          name="from"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setStartDate(new Date(e.target.value))
                          }
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
                        <Field
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEndDate(new Date(e.target.value))
                          }
                          className={`form-control ${styles.filter}`}
                          type="date"
                          value={dayjs(endDate).format('YYYY-MM-DD')}
                          id="end"
                          name="end"
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="flagged">
                      Status
                      <Field
                        as="select"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFilter(e.target.value)
                        }
                        className={`form-control ${styles.filter}`}
                        id="flagged"
                        value={filter}
                      >
                        <option value="All">All</option>
                        <option value="Flagged">Flagged</option>
                      </Field>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="Assignee">
                      Assignees
                      <Field name="assignee">
                        {({ field, form }: any) => (
                          <MultiSelect
                            form={form}
                            field={field}
                            options={team}
                            onChange={(members: string[]) =>
                              filterByAssigned(members)
                            }
                            initialSelectedItems={assignees.map((assignee) => ({
                              label: assignee,
                              value: assignee,
                            }))}
                          />
                        )}
                      </Field>
                    </label>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
        </div>
      </div>
      {!loading && !error && interactions && (
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
            </span>{' '}
            {!!assignees.length && (
              <span>
                and were assigned to{' '}
                <span className="text-primary">{assignees.join(' or ')}</span>
              </span>
            )}
          </h5>
          <List
            list={interactions.map(({ node }) => {
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
    </>
  )
}

export default FlagForReview
