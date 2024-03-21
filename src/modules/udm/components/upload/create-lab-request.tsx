import { Button } from '@mui/material'
import { Form, FormikProps } from 'formik'
import React, { useState } from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import { MultiselectField } from 'src/components/forms/fields/select-field'
import PrimaryForm from 'src/components/forms/primary-form'
import { DocumentUploadHook } from 'src/modules/udm/hooks/document-upload'
import * as yup from 'yup'
import { LabRequest, LabTypes } from 'src/modules/labs/types'
import { Plus } from 'react-feather'
import { useModuleAnalytics } from 'src/modules/analytics'
import { UploadDocumentFormValues } from '../../types'

type CreateNewLabRequestProps = {
  closeWindow: () => void
  updateLabRequests: (labRequests: LabRequest[]) => void
  data: DocumentUploadHook
}

export function CreateNewLabRequest({
  closeWindow,
  updateLabRequests,
  data,
}: CreateNewLabRequestProps) {
  const [uploading, setUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const { labTypes, createNewLabRequests } = data
  const { trackLabRequestCreatedFromDocs } = useModuleAnalytics()

  const handleSubmit = async (values: any) => {
    try {
      setUploading(true)
      const created = await createNewLabRequests(values.newLabTypes)
      updateLabRequests(created)
      trackLabRequestCreatedFromDocs(
        values.newLabTypes.map((lab: any) => lab.name)
      )
      closeWindow()
    } catch (e: any) {
      setError(e.message ?? 'An error occurred saving lab requests')
    } finally {
      setUploading(false)
    }
  }

  const initialValues = {
    newLabTypes: [],
  }

  const newLabValidationSchema = yup.object().shape({
    newLabTypes: yup
      .array()
      .typeError('Select a lab type')
      .of(
        yup
          .mixed<LabTypes>()
          .typeError('Invalid lab type')
          .test('is-valid', 'Invalid lab type', (value: any) => {
            return 'name' in value && 'recordId' in value
          })
          .required()
      ),
  })

  return (
    <div className="bg-white font-rubik">
      <div className="border rounded-md p-2">
        <PrimaryForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          validationSchema={newLabValidationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <MultiselectField
                  options={labTypes}
                  name="newLabTypes"
                  label="Lab Type"
                />

                <div className="flex flex-col gap-2">
                  <PrimaryButton
                    onClick={closeWindow}
                    className="bg-disabled-grey hover:bg-disabled-grey normal-case text-white font-medium px-4 py-2 rounded-md"
                  >
                    Cancel
                  </PrimaryButton>
                  <PrimaryButton
                    className="bg-orange-100 hover:bg-orange-100 normal-case text-white font-medium px-4 py-2 rounded-md"
                    fullWidth
                    variant="contained"
                    type="button"
                    onClick={(e) => {
                      e?.preventDefault()
                      handleSubmit(formik.values)
                    }}
                  >
                    {uploading ? 'Saving...' : 'Save'}
                  </PrimaryButton>
                </div>
                {error && <p className="text-red-100">{error}</p>}
              </Form>
            )
          }}
        </PrimaryForm>
      </div>
    </div>
  )
}

type DocumentLabLinkFieldProps = {
  data: DocumentUploadHook
  formik: FormikProps<UploadDocumentFormValues>
}

export function DocumentLabLinkField({
  data,
  formik,
}: DocumentLabLinkFieldProps) {
  const [show, setShow] = useState(false)

  const { labRequests, submittingDocument, loadingLabRequests } = data

  return (
    <div>
      <MultiselectField
        name="linkedLabRequest"
        options={labRequests}
        label="Search lab request..."
        placeholder="Search..."
        disabled={submittingDocument}
        required={false}
        loading={loadingLabRequests}
        ExtraOptionsComponent={
          <Button
            fullWidth
            variant="text"
            startIcon={<Plus />}
            className="bg-white mt-1 w-full normal-case flex items-center justify-start text-blue-100 py-2 px-8 font-medium  "
            onClick={() => {
              setShow(true)
            }}
          >
            Add new Lab Request
          </Button>
        }
      />
      {show && (
        <CreateNewLabRequest
          closeWindow={() => setShow(false)}
          updateLabRequests={(labs) => {
            formik.setFieldValue('linkedLabRequest', [
              ...(formik.values?.linkedLabRequest ?? []),
              ...labs,
            ])
          }}
          data={data}
        />
      )}
    </div>
  )
}

export default DocumentLabLinkField
