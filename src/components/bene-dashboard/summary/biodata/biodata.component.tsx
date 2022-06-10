import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Info } from 'react-feather'
import { Button, CardContent, Typography, Chip, Checkbox } from '@mui/material'
import { useQuery, useMutation } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'
import dayjs from 'dayjs'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { hmp } from '../../../../types/user'
import styles from './biodata.component.css'
import airtableFetch from '../../../../resources/airtable-fetch'
import { useMember } from '../../../../context/member.context'
import analytics from '../../../../helpers/analytics'
import { GET_TERMS_CONDITIONS } from '../../../../gql/ts_cs'
import { SEND_SMS } from '../../../../gql/sms'
import logError from '../../../utils/Bugsnag/Bugsnag'
import DependentCard from '../dependents/dependent-card.component'

const getRiskFactors = (
  diabetes: string,
  highBloodPressure: string,
  cholesterol: string
) => {
  const riskFactorArray = []

  if (diabetes && diabetes.toLowerCase() === 'yes') {
    riskFactorArray.push('Diabetes')
  }

  if (highBloodPressure && highBloodPressure.toLowerCase() === 'yes') {
    riskFactorArray.push('High Blood Pressure')
  }

  if (cholesterol && cholesterol.toLowerCase() === 'yes') {
    riskFactorArray.push('Cholesterol')
  }

  return riskFactorArray
}

const Hmp = () => {
  const [hmpInfo, setHmpInfo] = useState<hmp[]>([])
  const { recId } = useParams()

  useEffect(() => {
    airtableFetch(
      `hmp/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      if (response) {
        const hmps: hmp[] = []
        Object.keys(response).forEach((data: any) => {
          hmps.push({
            hmpSendDate: response[data]['HMP Send Date']?.toString(),
            hmpNumber: response[data]['HMP #']?.toString(),
            hmpStatus: response[data]['HMP Status']?.toString(),
            hmpDay: response[data]['HMP Day']?.toString(),
            hmpLink: response[data]['HMP Link']?.toString(),
            hmpPhase: response[data]['HMP Phase']?.toString(),
          })
        })
        setHmpInfo(hmps)
      }
    })
  }, [recId])

  return (
    <div>
      <div className={styles.conditionsHeading}>
        <h6 className="text-bold">HMP</h6>
      </div>
      <div className={`text-small ${styles.conditionsContent}`}>
        {hmpInfo.map((info, index) => (
          <div key={index} className={styles.hmps}>
            {/* HMP {info.hmpNumber} {info.hmpStatus} {info.hmpPhase} */}
            <div className={`${styles.hmpValRow}`}>
              <div>
                <span className={`${styles.hmpValLabel}`}>HMP #: </span>
                <span className={`${styles.hmpVal}`}>{info.hmpNumber}</span>
              </div>
              <div>
                <span className={`${styles.hmpValLabel}`}>HMP Status: </span>
                <span className={`${styles.hmpVal}`}>{info.hmpStatus}</span>
              </div>
            </div>
            <div className={`${styles.hmpValRow}`}>
              <div>
                <span className={`${styles.hmpValLabel}`}>HMP Send Date: </span>
                <span className={`${styles.hmpVal}`}>{info.hmpSendDate}</span>
              </div>
              <div>
                <span className={`${styles.hmpValLabel}`}>Days in HMP: </span>
                <span className={`${styles.hmpVal}`}>{info.hmpDay}</span>
              </div>
            </div>
            <div className={`${styles.hmpValRow}`}>
              <div>
                <span className={`${styles.hmpValLabel}`}>HMP Phase: </span>
                <span className={`${styles.hmpVal}`}>{info.hmpPhase}</span>
              </div>
              {info.hmpLink && (
                <div>
                  <a
                    href={info.hmpLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ConditionsSummary = () => {
  const [conditions, setConditions] = useState<any>([])
  const [interventions, setInterventions] = useState<any>([])
  const [milestones, setMilestones] = useState<any>([])

  const { recId } = useParams()

  useEffect(() => {
    airtableFetch(
      `interventions/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((intervention_response) => {
      if (intervention_response) {
        const memberInterventions: any[] = []

        Object.keys(intervention_response).forEach((key) => {
          if (intervention_response[key].Status === 'Active')
            memberInterventions.push(intervention_response[key].Intervention)
        })
        setInterventions(Array.from(new Set(memberInterventions.flat())))
      }
    })

    airtableFetch(
      `conditions/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      if (response) {
        const memberConditions: any[] = []
        const uniqueConditions = new Set()
        const memberMilestones: any[] = []

        Object.keys(response).forEach((key) => {
          if (
            (!uniqueConditions.has(response[key].Condition) ||
              response[key].Condition === 'Other') &&
            response[key]['Condition Status'] === 'Active'
          ) {
            memberConditions.push(response[key])
            uniqueConditions.add(response[key].Condition)
          }
        })

        memberConditions.forEach((condition: any) => {
          const milestoneTypes = [
            'Other Caloric Milestones',
            'Other Caloric Reduction Milestone',
            'Salt Reduction Milestone',
            'Diabetes Control Milestone',
            'Activity Milestone',
            'Asthma Action Plan Milestone',
            'Physical Therapy Milestone',
            'Other functional Milestone',
            'Other BMI Milestone',
            'Medication Reduction Plan Milestone',
            'Functional Milestone',
          ]

          milestoneTypes.forEach((milestoneType) => {
            if (condition[milestoneType]) {
              memberMilestones.push(condition[milestoneType])
            }
          })
        })

        setConditions(memberConditions)
        setMilestones(memberMilestones)
      }
    })
  }, [recId])
  return (
    <div>
      <div className={styles.conditionsHeading}>
        <h6 className="text-bold">Active Conditions</h6>
      </div>
      <div className={`text-small ${styles.conditionsContent}`}>
        {conditions.map((condition: any, index: number) => {
          return (
            <li
              key={index}
              style={{
                borderBottom: '0.5px lightgrey solid',
                paddingBottom: '2px',
                marginBottom: '5px',
                color: 'var(--dark-blue-100)',
                fontSize: '14px',
              }}
            >
              {index + 1}.{' '}
              {condition.Condition === 'Other'
                ? condition['Other, specify']
                : `${condition.Condition}, `}
              {condition['Current stage'] && (
                <>
                  {condition['Current stage'] === 'At risk' ? (
                    <span style={{ color: 'var(--red-base)' }}>
                      <span style={{ color: 'var(--dark-blue-50)' }}>
                        Current stage:
                      </span>
                      {condition['Current stage']}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--dark-blue-50)' }}>
                      Current stage:
                      {condition['Current stage']}
                    </span>
                  )}
                </>
              )}
            </li>
          )
        })}
      </div>

      <Hmp />

      <div className={styles.clinicalBottomRow}>
        <div className={styles.clinicalBottomColumns}>
          <h6 className={`text-bold ${styles.clinicalBottomColumnHeadings}`}>
            Interventions
          </h6>
          {interventions.length ? (
            interventions.map((intervention: any, index: number) => (
              <li
                className={`text-small ${styles.clinicalBottomRowContent}`}
                key={index}
              >
                {intervention}{' '}
              </li>
            ))
          ) : (
            <p className={`text-small ${styles.clinicalTopRowContent}`}>None</p>
          )}
        </div>
        <div className={styles.clinicalBottomColumns}>
          <h6 className={`text-bold ${styles.clinicalBottomColumnHeadings}`}>
            Milestones
          </h6>
          {milestones.length ? (
            milestones.map((milestone: any, index: number) => (
              <li
                className={`text-small ${styles.clinicalBottomRowContent}`}
                key={index}
              >
                {milestone}{' '}
              </li>
            ))
          ) : (
            <p className={`text-small ${styles.clinicalTopRowContent}`}>None</p>
          )}
        </div>
      </div>
    </div>
  )
}

const HifSummary = () => {
  const [allergies, setAllergies] = useState<any>([])
  const [riskFactor, setRiskFactor] = useState<any>([])
  const [bloodGroup, setBloodGroup] = useState<string>('Not recorded')

  const { recId } = useParams()

  useEffect(() => {
    airtableFetch(
      `hif/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      if (response) {
        const record_id = Object.keys(response)[0]

        if (record_id != null) {
          const allergiesArray = []
          allergiesArray.push(
            response[record_id]['Which food are you allergic to?']
          )

          allergiesArray.push(
            response[record_id]['Which medications are you allergic to?']
          )

          const memberBloodGroup =
            response[record_id]['What is your Blood Type?']

          const riskFactorArray = getRiskFactors(
            response[record_id][
              'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Diabetes?'
            ],
            response[record_id][
              'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Blood Pressure?'
            ],
            response[record_id][
              'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Cholesterol Levels?'
            ]
          )

          setAllergies(allergiesArray)
          setRiskFactor(riskFactorArray)
          setBloodGroup(memberBloodGroup)
        }
      }
    })
  }, [recId])

  return (
    <div className={styles.clinicalTopRow}>
      <div className={styles.clinicalTopColumns}>
        <h6 className={`text-bold ${styles.clinicalTopColumnHeadings}`}>
          Allergies
        </h6>
        {allergies.length ? (
          allergies.map((allergy: any, index: number) => (
            <li
              className={`text-small ${styles.clinicalTopRowContent}`}
              key={index}
            >
              {allergy}{' '}
            </li>
          ))
        ) : (
          <p className={`text-small ${styles.clinicalTopRowContent}`}>None</p>
        )}
      </div>
      <div className={styles.clinicalTopColumns}>
        <h6 className={`text-bold ${styles.clinicalTopColumnHeadings}`}>
          Blood Type
        </h6>
        <span className={`text-small ${styles.clinicalTopRowContent}`}>
          {bloodGroup}
        </span>
      </div>
      <div className={styles.clinicalTopColumns}>
        <h6 className={`text-bold ${styles.clinicalTopColumnHeadings}`}>
          Risk Factors
        </h6>
        {riskFactor.length ? (
          riskFactor.map((risk: any, index: number) => (
            <li
              className={`text-small ${styles.clinicalTopRowContent}`}
              key={index}
            >
              FH: {risk}{' '}
            </li>
          ))
        ) : (
          <p className={`text-small ${styles.clinicalTopRowContent}`}>None</p>
        )}
      </div>
    </div>
  )
}

const GeneralSummary = ({ member }: any) => {
  const [frs, setFrs] = useState<number | null>()
  const [riskScore, setRiskScore] = useState<number | string>('Not Available')

  const { recId } = useParams()

  useEffect(() => {
    airtableFetch(
      `hif/list?filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      if (response) {
        const record_id = Object.keys(response)[0]

        if (record_id != null) {
          const riskValue = response[record_id]['Risk score']
          const percenRiskScore = riskValue
            ? (parseFloat(riskValue) * 100).toFixed(2)
            : null
          setRiskScore(
            percenRiskScore ? `${percenRiskScore}%` : 'Not Available'
          )
        }
      }
    })
  }, [recId])

  useEffect(() => {
    airtableFetch(
      `fcvd/list?filterByFormula=FIND("${member['Antara ID']}", {Antara Member ID})`
    ).then((res) => {
      const record = Object.keys(res).map((key) => res[key])[0]
      if (record) {
        setFrs(record['Percent Risk'])
      }
    })
  }, [member])

  return (
    <div className={`text-normal ${styles.topSummaryRow}`}>
      <div className={styles.topSummaryColumns}>
        <h6 className={`text-bold  ${styles.topSummaryColumnHeadings}`}>
          Risk Score
        </h6>
        <span className={`text-small ${styles.topSummaryRowContent}`}>
          {riskScore && riskScore}
        </span>
      </div>
      <div className={styles.topSummaryColumns}>
        <h6 className={`text-bold  ${styles.topSummaryColumnHeadings}`}>FRS</h6>
        <span className={`text-small ${styles.topSummaryRowContent}`}>
          {frs || 'Unavailable'}
        </span>
      </div>
    </div>
  )
}

const lastSentBeforeDay = (date: string): boolean => {
  const lastSent = dayjs(date)
  const dateToday = dayjs()
  const hours = dateToday.diff(lastSent, 'hours')
  return hours > 24
}

const TsCs = ({ member, contact }: any) => {
  const [showTerms, setTerms] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messageSent, setMessageSent] = useState(false)
  const {
    data: tscs,
    loading: tscsLoading,
    error: tscsError,
  } = useQuery(GET_TERMS_CONDITIONS, {
    variables: { antaraId: member['Antara ID'] },
  })

  const bnname = member['Bene First Name']
  const [showBasedOnTime, setShowBasedOnTime] = useState<boolean>(false)
  const [sendSms, { loading }] = useMutation(SEND_SMS)
  const [showCard, setShowCard] = useState<boolean>(true)
  const { addToast } = useToasts()
  const showCardNoMsg =
    showTerms &&
    !showBasedOnTime &&
    showCard &&
    member['Onboard Stage'] === 'Onboarded'
  const showCardWithMsg =
    showTerms &&
    showBasedOnTime &&
    showCard &&
    member['Onboard Stage'] === 'Onboarded'
  useEffect(() => {
    airtableFetch(
      `msgTemplates/list?filterByFormula=FIND("Consent reminder", {Title})`
    )
      .then((res) => {
        const { Message } = Object.keys(res).map((key) => res[key])[0]
        const msg = Message.replace('{bnname}', bnname)
        setMessage(msg)
      })
      .catch((error) => {
        logError(error.message)
      })
  }, [bnname])

  useEffect(() => {
    if (contact?.lastConsentReminder) {
      setShowBasedOnTime(lastSentBeforeDay(contact?.lastConsentReminder))
    }
    if (messageSent) {
      setShowBasedOnTime(lastSentBeforeDay(contact?.lastConsentReminder))
    }
  }, [messageSent, contact])

  useEffect(() => {
    if (tscs) {
      const terms = tscs.termsAndConditions.edges
      const newTermAvailable = terms.every(
        (term) => term.node.accepted === false
      )
      setTerms(newTermAvailable)
    }
  }, [member, tscs])

  const renderCard = () => {
    return (
      <CardContent className={styles.terms}>
        <Typography
          className={styles.termsText}
          color="text.secondary"
          gutterBottom
        >
          <Info width="16px" height="16px" style={{ marginRight: 10 }} />
          This member has not given consent to our latest Terms and Conditions
        </Typography>
        <Typography variant="body2">
          Send an SMS to encourage the member to give consent via App Download
        </Typography>
        <Button
          size="small"
          variant="contained"
          className={styles.termsButton}
          onClick={() =>
            message &&
            sendSms({
              variables: {
                message,
                antaraId: member['Antara ID'],
                type: 'Consent Reminder',
              },
            })
              .then((res) => {
                if (res?.data.sendSms.status === 200) {
                  addToast(res?.data.sendSms.message, {
                    appearance: 'success',
                    autoDismiss: true,
                  })

                  setMessageSent(true)
                  setShowCard(false)
                  analytics.track(
                    'Terms and Condition update message sent',
                    member['Phone 1']
                  )
                } else {
                  addToast(res?.data.sendSms.message, {
                    appearance: 'error',
                    autoDismiss: true,
                  })
                }
              })
              .catch((error) => {
                addToast(error.message, {
                  appearance: 'error',
                  autoDismiss: true,
                })
                logError(error.message)
              })
          }
        >
          {loading ? 'Notifying member' : 'Notify member'}
        </Button>
      </CardContent>
    )
  }

  if (tscsError) {
    return <div>Error Loading terms and conditions! ${tscsError.message}</div>
  }
  if (tscsLoading) {
    return <div>Loading updated terms and conditions</div>
  }

  return (
    <>
      {showCardNoMsg && renderCard()}
      {showCardWithMsg && renderCard()}
    </>
  )
}
const Tags = ({ member }: any) => {
  const [tags, setTags] = useState<string[] | undefined>(
    undefined && 'No tag set'
  )
  useEffect(() => {
    if (member.Tags) {
      setTags(member.Tags)
    }
  }, [member])

  return (
    <div style={styles.Tags}>
      {tags &&
        tags.map((tag, index) => {
          return <Chip key={index} className={styles.tags} label={tag} />
        })}
    </div>
  )
}

const BioData = () => {
  const { member, memberContact } = useMember()
  const hasDependants = memberContact?.dependents.length > 0
  const minorDependents = []
  const majorDependents = []

  if (hasDependants) {
    for (const dep of memberContact.dependents) {
      const today = new Date()
      if (today.getFullYear() - new Date(dep.birthDate).getFullYear() > 18) {
        majorDependents.push(dep)
      } else {
        minorDependents.push(dep)
      }
    }
  }
  const hasPrimary = memberContact?.primary && memberContact?.primary.length > 0
  const isMinor = (age: number) => age < 18
  const trackAccess = () =>
    analytics.track(
      `${
        hasPrimary
          ? "Dependant's dashboard accesed from primary member's"
          : "Primary member's dashboard accesed from dependant's"
      }`
    )

  const gaInsuranceLink = 'https://health.gakenya.com/app'
  const mixPanelLink = `https://mixpanel.com/project/2141047/view/293995/app/profile#distinct_id=${member['Antara ID']}`

  return (
    <div className={styles.wrapper}>
      {member && (
        <div className={styles.bioDataCard}>
          <div className={styles.beneNameContainer}>
            <h3 className={styles.beneNameAgeGender}>
              {member['Full Name']}, {member.Age}{' '}
              {member.Sex && member.Sex.charAt(0)}
            </h3>
          </div>
          <TsCs member={member} contact={memberContact} />
          <div className={styles.tagContainer}>
            <Tags member={member} />
          </div>

          <div className={styles.summariesContainer}>
            <GeneralSummary member={member} />

            <hr className={styles.hrLine} />

            <table className={`text-normal ${styles.bioDataTable}`}>
              <tbody>
                <tr>
                  <td
                    className={`text-bold ${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Lead HN:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member['Lead HN']}
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    National ID:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member['Kenya National ID Number']}
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Insurance ID:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member['Insurance ID']}
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Corporate ID:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member['Corporate ID']}
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Start Date:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member['Antara Start Date']}
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Smart ID:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member['SMART ID']}
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Active Since:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member['Midterm Inclusion Date']}
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Insurance Plan:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member['Insurance Plan']}
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Insurance Dashboard:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    <CopyToClipboard text={`${member['Insurance ID']}`}>
                      <a
                        href={`${gaInsuranceLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Dashboard
                      </a>
                    </CopyToClipboard>
                  </td>
                </tr>

                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    MixPanel Dashboard:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    <a
                      href={`${mixPanelLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Dashboard
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Chronic Care Consent:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    <Checkbox
                      disabled
                      color="primary"
                      checked={member['Chronic Care Consent']}
                    />
                  </td>
                </tr>
                {member['Chronic Care Consent'] ? (
                  <tr>
                    <td
                      className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                    >
                      Chronic Care Consent Date:
                    </td>
                    <td
                      className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                    >
                      {member['Chronic Care Consent Date']}
                    </td>
                  </tr>
                ) : null}

                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Riders:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member.Riders && member.Riders.join(', ')}
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    Status:
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {member.Employer || member['Account Name']}
                    <span
                      className={
                        member['Member Status'] === 'Active'
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      {` (${member['Member Status']})`}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                  >
                    {isMinor(member.Age)
                      ? 'Guardian Contact Info'
                      : 'Contact Info:'}
                  </td>
                  <td
                    className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                  >
                    {isMinor(member.Age)
                      ? member['Primary Phone 1']
                      : member['Phone 1']}
                    {!isMinor(member.Age) && member['Phone 2']
                      ? `, ${member['Phone 2']}`
                      : null}
                  </td>
                </tr>
              </tbody>
            </table>

            <hr className={styles.hrLine} />

            <h4 className={styles.clinicalHeading}>Clinical Summary</h4>

            <HifSummary />

            <ConditionsSummary />
            {hasDependants && (
              <>
                <hr className={styles.hrLine} />

                <h4 className={styles.clinicalHeading}>Dependents</h4>

                <div className={styles.dependentsDiv}>
                  {majorDependents.length > 0 && (
                    <span
                      className={styles.dependentLength}
                    >{`Major ${majorDependents.length}`}</span>
                  )}

                  {majorDependents.map((dep) => (
                    <React.Fragment key={dep.airtableRecordId}>
                      <DependentCard
                        dependent={dep}
                        trackAccess={trackAccess}
                      />
                    </React.Fragment>
                  ))}
                </div>

                <div className={styles.dependentsDiv}>
                  {minorDependents.length > 0 && (
                    <span
                      className={styles.dependentLength}
                    >{`Minor ${minorDependents.length}`}</span>
                  )}

                  {minorDependents.map((dep) => (
                    <React.Fragment key={dep.airtableRecordId}>
                      <DependentCard
                        dependent={dep}
                        trackAccess={trackAccess}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
            {hasPrimary && (
              <>
                <hr className={styles.hrLine} />

                <h4 className={styles.clinicalHeading}>Primary Dependent</h4>
                <div className={styles.dependentsDiv}>
                  {memberContact?.primary.map((mem) => (
                    <React.Fragment key={mem.airtableRecordId}>
                      <DependentCard
                        dependent={mem}
                        trackAccess={trackAccess}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default BioData
