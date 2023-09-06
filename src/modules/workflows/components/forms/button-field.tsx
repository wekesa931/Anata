import { Button } from '@mui/material'
import React from 'react'
import FORM_DEFINITIONS from 'src/modules/workflows/components/forms/form-inputs-definitions'
import useFormsRouting from 'src/modules/workflows/hooks/routing/forms'

interface Field {
  ctlabel?: string
  name: string
}

type Props = {
  field: Field
}

function ButtonField({ field }: Props) {
  const { openForm } = useFormsRouting()

  const handleOpenForm = (fieldId: string) => {
    const formSchema = (FORM_DEFINITIONS as any).find(
      (f: any) => f?.formId === fieldId
    )
    if (formSchema) {
      openForm(formSchema.name)
    }
  }

  return (
    <Button
      variant="contained"
      className="relative z-1000 mb-2.5 font-rubik text-xs capitalize"
      onClick={() => handleOpenForm(field.name)}
    >
      {field?.ctlabel || 'Open Form'}
    </Button>
  )
}

export default ButtonField
