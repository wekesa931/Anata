import React from 'react'

type EncountersProps = {
  member: any
}

const Encounters = ({ member }: EncountersProps) => {
  return <h1>Encounters for {member.name}</h1>
}

export default Encounters
