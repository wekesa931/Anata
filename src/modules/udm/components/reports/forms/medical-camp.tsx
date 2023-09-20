import React from 'react'
import TextField from 'src/components/forms/fields/text'
import DateField from 'src/components/forms/fields/date-field'
import PrimaryForm from 'src/components/forms/primary-form'
import PrimaryButton from 'src/components/buttons/primary'
import FlexRow from 'src/components/layouts/flex-row'
import { Form } from 'formik'
import { Loader, X } from 'react-feather'
import * as yup from 'yup'
import { Typography } from '@mui/material'

interface MedicalCampFormProps {
  handleShowPdfPreview: (values: any) => Promise<void> | void
  handleClose: () => void
  initialData: {
    medicalCampDate?: Date | string
    nextActions?: string
    additionalInsights?: string
  }
  loading?: boolean
  error?: any
  showDateSelection?: boolean
}

function MedicalCampForm({
  handleShowPdfPreview,
  handleClose,
  initialData,
  loading,
  error,
  showDateSelection,
}: MedicalCampFormProps) {
  const handleSubmit = async (values: any) => {
    await handleShowPdfPreview(values)
  }

  const validationSchema = showDateSelection
    ? yup.object().shape({
        medicalCampDate: yup
          .date()
          .typeError('Please fill this required field'),
      })
    : yup.object().shape({
        nextActions: yup.string(),
        additionalInsights: yup.string(),
      })

  return (
    <PrimaryForm
      initialValues={initialData}
      handleSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValidating }: any) => (
        <Form>
          {error && (
            <div className="bg-red-10 p-4 flex items-center mb-[5%]">
              <X
                className="w-16 h-16 text-red-100 mr-2"
                style={{ fontWeight: 'bold' }}
              />
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Unable to Preview Document
                </h2>
                <p className="text-sm break-words">
                  This Document can not be previewed at the moment. Please check
                  the format or try again later. If the problem continues, reach
                  out to our support team.
                </p>
              </div>
            </div>
          )}
          {showDateSelection && (
            <DateField
              name="medicalCampDate"
              label="Date of medical camp"
              placeholder="dd/mm/yyyy"
              openToYear={false}
            />
          )}

          <TextField
            label="Next actions"
            required={false}
            placeholder="Next actions for this member. Type here"
            name="nextActions"
            textarea
          />

          <TextField
            label="Additional insights"
            required={false}
            placeholder="Additional Insights"
            name="additionalInsights"
            textarea
          />

          <FlexRow>
            <PrimaryButton
              fullWidth
              variant="outlined"
              disabled={isValidating}
              onClick={handleClose}
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton
              fullWidth
              type="submit"
              variant="contained"
              disabled={isValidating}
            >
              {loading ? (
                <>
                  <Loader className="text-blue-300" />
                  <Typography className="file-action-button-text text-white font-medium">
                    Preview Report
                  </Typography>
                </>
              ) : (
                'Preview report'
              )}
            </PrimaryButton>
          </FlexRow>
        </Form>
      )}
    </PrimaryForm>
  )
}

export default MedicalCampForm
