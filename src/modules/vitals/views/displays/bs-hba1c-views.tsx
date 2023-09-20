import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import BsViews from 'src/modules/vitals/views/displays/blood-sugar'
import HbViews from 'src/modules/vitals/views/displays/hba1c'

enum Views {
  BS = 'bs',
  HBA1C = 'hba1c',
}

function BSHbViews() {
  const [value, setValue] = React.useState<Views>(Views.BS)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value as Views)
  }

  return (
    <div className="font-rubik">
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value={Views.BS}
            control={<Radio />}
            label="Fasted & Random Blood Glucose"
            className={
              value === Views.BS
                ? 'font-bold text-dark-blue-100'
                : 'font-medium text-dark-blue-50'
            }
          />
          <FormControlLabel
            value={Views.HBA1C}
            control={<Radio />}
            label="HbA1c"
            className={
              value === Views.HBA1C
                ? 'font-bold text-dark-blue-100'
                : 'font-medium text-dark-blue-50'
            }
          />
        </RadioGroup>
      </FormControl>
      <div className="mt-4">{value === 'bs' ? <BsViews /> : <HbViews />}</div>
    </div>
  )
}

export default BSHbViews
