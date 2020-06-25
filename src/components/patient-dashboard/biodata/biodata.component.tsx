import React from 'react'
import styles from './biodata.component.css'

type BioDataProps = {
  member: any
}

const BioData = ({ member }: BioDataProps) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Biodata</h2>
      <div className="card" style={{ height: '300px' }}>
        <div className={styles.biodata}>
          <div>
            <div style={{ textAlign: 'center' }} />
            <div>{member['Full Name']}</div>
          </div>
          <div style={{ fontSize: 12 }}>
            <div>Antara ID: {member['Antara ID']}</div>
            <div>AHC #: {member['AHC Number']}</div>
            <div>NHIF: {member['NHIF Number']}</div>
          </div>
        </div>
        <div className={styles.biodata} />
      </div>
    </div>
  )
}

export default BioData
