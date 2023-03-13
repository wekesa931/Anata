import React from 'react'
import Table from '../../../../utils/table/table.component'

type BMIInfoProps = {
  Height: number
  Date: string
  Weight: number
  BMI: number
}

type BMIProps = {
  bmiInfo: BMIInfoProps[]
}
function Bmi({ bmiInfo }: BMIProps) {
  const columns = [
    {
      name: 'Date',
      format: 'dd/mmm/yy',
      key: 'Date',
    },
    { name: 'Height', format: 'm', key: 'Height' },
    { name: 'Weight', format: 'kg', key: 'Weight' },
    {
      name: 'BMI',
      format: 'kg/m2',
      key: 'BMI',
      info: `Stage 1: BMI 25.0-29.9
               Stage 2: BMI 30.0-39.9
               Stage 3: BMI >=40`,
    },
  ]

  return (
    bmiInfo && (
      <Table
        title="BMI"
        columns={columns}
        data={bmiInfo}
        dateColumnKey="Date"
        filterByDate
      />
    )
  )
}

export default Bmi
