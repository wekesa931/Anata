import React from 'react'

interface IProps {
  value: string
  otherMeds: string | null
}

const PrescriptionName = ({ value, otherMeds }: IProps) => {
  const prescription = value !== 'Other' ? value : otherMeds
  return (
    <span data-testid="prescription-name" className="badge badge-warning">
      {prescription}
    </span>
  )
}

export default PrescriptionName
