import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { hmp } from '../../../../types/user'
import styles from './biodata.component.css'
import airtableFetch from '../../../../resources/airtableFetch'

type BioDataProps = {
  member: any
}

function getAssignedHn(assignedHN: any) {
  if (assignedHN) {
    return assignedHN[0].name
  }
  return null
}

const riskFactors = (
  diabetes: string,
  highBloodPressure: string,
  cholesterol: string
) => {
  const riskFactorArray = []

  if (diabetes.toLowerCase() === 'yes') {
    riskFactorArray.push('Diabetes')
  }

  if (highBloodPressure.toLowerCase() === 'yes') {
    riskFactorArray.push('High Blood Pressure')
  }

  if (cholesterol.toLowerCase() === 'yes') {
    riskFactorArray.push('Cholesterol')
  }

  return riskFactorArray
}

const Hmp = () => {
  const [hmpInfo, setHmpInfo] = useState<hmp[]>([])
  const { recId } = useParams()

  useEffect(() => {
    airtableFetch(
      `hmp/list/0?view=HN Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      if (response) {
        const hmps: hmp[] = []

        Object.keys(response).forEach((data: any) => {
          hmps.push({
            hmpSendDate: response[data]['HMP Send Date'],
            hmpNumber: response[data]['HMP #'],
            hmpStatus: response[data]['HMP Status'],
            hmpDay: response[data]['HMP Day'],
            hmpLink: response[data]['HMP Link'],
            hmpPhase: response[data]['HMP Phase'],
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
            HMP {info.hmpNumber} {info.hmpStatus} {info.hmpPhase}
            <div>
              <span className={`text-tiny ${styles.dateHelperText}`}>
                HMP Send Date: {info.hmpSendDate}
              </span>
              <span
                className={`text-tiny ${styles.dateHelperText} ${styles.dateHelperText2}`}
              >
                Days in HMP: {info.hmpDay}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ConditionsSummarry = () => {
  const [conditions, setConditions] = useState<any>([])
  const [interventions, setInterventions] = useState<any>([])
  const [milestones, setMilestones] = useState<any>([])

  const { recId } = useParams()

  useEffect(() => {
    airtableFetch(
      `conditions/list/0?view=HN Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      if (response) {
        const memberInterventions: any[] = []
        const memberConditions: any[] = []
        const memberMilestones: any[] = []

        Object.keys(response).forEach((condition: any) => {
          if (response[condition]['Condition Status'] === 'Active') {
            memberConditions.push({
              condition: response[condition].Condition,
              stage: response[condition].Stage,
            })

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
              if (response[condition][milestoneType]) {
                memberMilestones.push(response[condition][milestoneType])
              }
            })

            if (response[condition].Interventions != null) {
              memberInterventions.push(
                response[condition].Interventions.join(', ')
              )
            }
          }
        })

        setInterventions(memberInterventions)
        setConditions(memberConditions)
        setMilestones(memberMilestones)
      }
    })
  }, [recId])

  return (
    <div>
      <div className={styles.conditionsHeading}>
        <h6 className="text-bold">Conditions</h6>
      </div>
      <div className={`text-small ${styles.conditionsContent}`}>
        {conditions.map((condition: any, index: number) => (
          <li key={index}>
            {condition.condition} Stage {condition.stage} Active
          </li>
        ))}
      </div>

      <Hmp />

      <div className={styles.clinicalBottomRow}>
        <div className={styles.clinicalBottomColumns}>
          <h6 className={`text-bold ${styles.clinicalBottomColumnHeadings}`}>
            Interventions
          </h6>
          {interventions.map((intervention: any, index: number) => (
            <li
              className={`text-small ${styles.clinicalBottomRowContent}`}
              key={index}
            >
              {intervention}{' '}
            </li>
          ))}
        </div>
        <div className={styles.clinicalBottomColumns}>
          <h6 className={`text-bold ${styles.clinicalBottomColumnHeadings}`}>
            Milestones
          </h6>
          {milestones.map((milestone: any, index: number) => (
            <li
              className={`text-small ${styles.clinicalBottomRowContent}`}
              key={index}
            >
              {milestone}{' '}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

const HifSummary = () => {
  const [allergies, setAllergies] = useState<any>([])
  const [riskFactor, setRiskFactor] = useState<any>([])
  const [bloodGroup, setBloodGroup] = useState<any>()

  const { recId } = useParams()

  useEffect(() => {
    airtableFetch(
      `hif/list/0?view=HN Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((response) => {
      if (response) {
        const record_id = Object.keys(response)[0]

        if (record_id != null) {
          const allergiesArray = []
          allergiesArray.push(response[record_id]['What are you allergic to?'])

          allergiesArray.push(
            response[record_id]['What are you allergic to? 2']
          )

          const memberBloodGroup =
            response[record_id]['What is your Blood Type?']

          const riskFactorArray = riskFactors(
            response[record_id][
              'Does anyone in your immediate family (Grandparents, Parents, Siblings) have Diabetes?'
            ],
            response[record_id][
              'Does anyone in your immediate family (Grandparents, Parents, Siblings) have High Blood Pressure??'
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
        {allergies.map((allergy: any, index: number) => (
          <li
            className={`text-small ${styles.clinicalTopRowContent}`}
            key={index}
          >
            {allergy}{' '}
          </li>
        ))}
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
        {riskFactor.map((risk: any, index: number) => (
          <li
            className={`text-small ${styles.clinicalTopRowContent}`}
            key={index}
          >
            FH: {risk}{' '}
          </li>
        ))}
      </div>
    </div>
  )
}

const GeneralSummary = () => {
  return (
    <div className={`text-normal ${styles.topSummaryRow}`}>
      <div className={styles.topSummaryColumns}>
        <h6 className={`text-bold  ${styles.topSummaryColumnHeadings}`}>
          LifeScore
        </h6>
        <span className={`text-small ${styles.topSummaryRowContent}`}>
          (TBD)
        </span>
      </div>
      <div className={styles.topSummaryColumns}>
        <h6 className={`text-bold  ${styles.topSummaryColumnHeadings}`}>FRS</h6>
        <span className={`text-small ${styles.topSummaryRowContent}`}>
          (TBD)
        </span>
      </div>
      <div className={styles.topSummaryColumns}>
        <h6 className={`text-bold  ${styles.topSummaryColumnHeadings}`}>NPS</h6>
        <span className={`text-small ${styles.topSummaryRowContent}`}>
          (TBD)
        </span>
      </div>
      <div className={styles.topSummaryColumns}>
        <h6 className={`text-bold  ${styles.topSummaryColumnHeadings}`}>
          Utilization
        </h6>
        <span className={`text-small ${styles.topSummaryRowContent}`}>
          (TBD)
        </span>
      </div>
    </div>
  )
}

const BioData = ({ member }: BioDataProps) => {
  const assignedHN = getAssignedHn(member['HN Assigned (from HN Meetings)'])

  return (
    <div className={styles.wrapper}>
      <h2>Summary</h2>

      {member && (
        <div className={styles.bioDataCard}>
          <h3 className={styles.beneNameAgeGender}>
            {member['Full Name']}, {member.Age}{' '}
            {member.Sex && member.Sex.charAt(0)}
          </h3>

          <GeneralSummary />

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
                  {assignedHN}
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
                  AHC Number:
                </td>
                <td
                  className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                >
                  {member['AHC Number']}
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
                  Coverage:
                </td>
                <td
                  className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                >
                  {member['Avenue Plan']}
                </td>
              </tr>
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
                  Employer:
                </td>
                <td
                  className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                >
                  {member.Employer}
                </td>
              </tr>
              <tr>
                <td
                  className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
                >
                  Contact Info:
                </td>
                <td
                  className={`${styles.bioDataTableColumn} ${styles.bioDataValue}`}
                >
                  {member['Phone 1']}, {member['Phone 2']}
                </td>
              </tr>
            </tbody>
          </table>

          <hr className={styles.hrLine} />

          <h4 className={styles.clinicalHeading}>Clinical Summary</h4>

          <HifSummary />

          <ConditionsSummarry />
        </div>
      )}
    </div>
  )
}

export default BioData
