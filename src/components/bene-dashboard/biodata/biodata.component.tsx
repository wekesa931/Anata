import React from 'react'
import styles from './biodata.component.css'

type BioDataProps = {
  member: any
}

function getAssignedHn(assignedHN: any) {
  if (assignedHN) {
    return assignedHN[0]['name']
  }
  return null
}

const BioData = ({ member }: BioDataProps) => {
  const assignedHN = getAssignedHn(member['HN Assigned (from HN Meetings)'])

  return (
    <div>
      <h2 className={styles.heading}> Summary</h2>

      <div className={styles.bioDataCard}>
        <h3 className={styles.beneNameAgeGender}>
          {member['Full Name']}, {member['Age']} {member['Sex'].charAt(0)}
        </h3>

        <table className={styles.bioDataTable}>
          <tbody>
            <tr>
              <td
                className={`${styles.bioDataTableColumn} ${styles.bioDataKey}`}
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
                {member['Riders'].join(', ')}
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
                {member['Employer']}
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
      </div>
    </div>
  )
}

export default BioData
