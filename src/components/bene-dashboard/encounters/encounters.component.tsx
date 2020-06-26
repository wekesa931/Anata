import React from 'react'

type EncountersProps = {
  member: any
}

const Encounters = ({ member }: EncountersProps) => {
  React.useEffect(() => {
    // airtableFetch('').then(response => {
    //     setPreviousFilledForms(response.records[1]);
    // })
  }, [])
  return (
    <div style={{ padding: '40px' }}>
      <h2>Previously Filled Forms {member}</h2>
    </div>
  )
}

export default Encounters
