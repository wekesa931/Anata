import {
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Button,
} from '@mui/material'
import { Form } from 'formik'
import React from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import GroupedSearchField from 'src/components/forms/fields/grouped-search-field'
import {
  Options,
  MultiselectField,
} from 'src/components/forms/fields/select-field'
import TextField from 'src/components/forms/fields/text'
import PrimaryForm from 'src/components/forms/primary-form'
import { DocMeta } from 'src/modules/udm/types'
import {
  useDocumentUpload,
  DocumentUploadHook,
} from 'src/modules/udm/hooks/document-upload'
import * as yup from 'yup'
import { LabRequest, LabTypes } from 'src/modules/labs/types'
import { Plus } from 'react-feather'
import { useModuleAnalytics } from 'src/modules/analytics'

const validationSchema = yup.object().shape({
  docType: yup.string().required(),
  title: yup.string().required(),
  creator: yup.string().required(),
  description: yup.string().optional(),
  linkedLabRequest: yup
    .array()
    .of(
      yup
        .mixed<LabRequest>()
        .typeError('Invalid lab request')
        .test('is-valid', 'Invalid lab request', (value: any) => {
          return 'labType' in value && 'imagingType' in value // this is a rudimentary test to check for the type
        })
    )
    .optional(),
  createReviewTask: yup.boolean().optional(),
  shareDocument: yup.boolean().optional(),
  folder: yup.string().when('shareDocument', {
    is: true,
    then: yup.string().required(),
    otherwise: yup.string().optional(),
  }),
})

type Props = {
  options: Options[]
  uploadDocument: (docMeta: DocMeta) => Promise<any>
  folders: Options[]
  markAsDone: () => void
}

const LAB_REPORT_DOC_TYPE = 'Laboratory Report'

type CreateNewLabRequestProps = {
  closeWindow: () => void
  show: boolean
  toggle: () => void
  updateLabRequests: (labRequests: LabRequest[]) => void
  data: DocumentUploadHook
}

function CreateNewLabRequest({
  show,
  toggle,
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
    newLabTypes: yup.array().of(
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
      {show && (
        <div className="border rounded-md p-2">
          <PrimaryForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            validationSchema={newLabValidationSchema}
          >
            {() => {
              return (
                <Form>
                  <MultiselectField
                    options={labTypes}
                    name="newLabTypes"
                    label="Lab Type"
                  />

                  <div className="flex flex-col gap-2">
                    <PrimaryButton
                      onClick={toggle}
                      className="bg-disabled-grey hover:bg-disabled-grey normal-case text-white font-medium px-4 py-2 rounded-md"
                    >
                      Cancel
                    </PrimaryButton>
                    <PrimaryButton
                      className="bg-orange-100 hover:bg-orange-100 normal-case text-white font-medium px-4 py-2 rounded-md"
                      fullWidth
                      variant="contained"
                      type="submit"
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
      )}
      <Button
        fullWidth
        variant="text"
        startIcon={<Plus />}
        className="bg-white mt-1 w-full normal-case flex items-center justify-start text-blue-100 py-2 px-6"
        onClick={(e: any) => {
          e?.preventDefault()
          e?.stopPropagation()
          toggle()
        }}
      >
        Add new Lab Request
      </Button>
    </div>
  )
}

function UploadDocumentForm({
  options,
  uploadDocument,
  folders,
  markAsDone,
}: Props) {
  const uploadDocumentHook: DocumentUploadHook = useDocumentUpload({
    markAsDone,
    uploadDocument,
  })
  const {
    labRequests,
    submitDocument,
    showProgressFeedback,
    retryCurrentProcess,
    error,
    formValues,
    submittingDocument,
    progress,
    currentProcessTitle: processTitle,
  } = uploadDocumentHook

  // console.log('Form values  ', formValues)

  const [showCreateLabRequest, setShowCreateLabRequest] = React.useState(false)

  const toggleCreateLabRequest = () => {
    setShowCreateLabRequest(!showCreateLabRequest)
  }

  return (
    <PrimaryForm
      initialValues={formValues}
      handleSubmit={submitDocument}
      className="font-rubik"
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <GroupedSearchField
              name="docType"
              options={options}
              label="Search document type..."
              placeholder="Search..."
              multiple
              disabled={submittingDocument}
            />

            {formik.values.docType === LAB_REPORT_DOC_TYPE && (
              <MultiselectField
                name="linkedLabRequest"
                options={labRequests}
                label="Search lab request..."
                placeholder="Search..."
                disabled={submittingDocument}
                required={false}
                ExtraOptionsComponent={
                  <CreateNewLabRequest
                    toggle={toggleCreateLabRequest}
                    show={showCreateLabRequest}
                    closeWindow={() => setShowCreateLabRequest(false)}
                    data={uploadDocumentHook}
                    updateLabRequests={(labs: any) => {
                      formik.setFieldValue('linkedLabRequest', [
                        ...formik.values.linkedLabRequest,
                        ...labs,
                      ])
                    }}
                  />
                }
                isOpen={showCreateLabRequest}
              />
            )}

            <TextField
              name="title"
              label="Enter the title"
              placeholder="Title"
              disabled={submittingDocument}
            />
            <TextField
              name="description"
              label="Description"
              placeholder="Description"
              textarea
              required={false}
              disabled={submittingDocument}
            />
            <TextField
              name="creator"
              label="Creator"
              disabled
              required={false}
            />
            <p className="text-dark-blue-50 text-base font-medium">Sharing</p>
            <div className="mb-4">
              <FormControlLabel
                disabled={submittingDocument}
                control={
                  <Checkbox
                    checked={formik.values.createReviewTask}
                    onChange={formik.handleChange}
                    sx={{
                      '&.Mui-checked': {
                        color: 'var(--blue-100)',
                      },
                      color: 'var(--dark-blue-50)',
                    }}
                  />
                }
                label={
                  <p className="font-rubik text-base text-dark-blue-70">
                    Automatically create a document review task for the assigned
                    HN
                  </p>
                }
                name="createReviewTask"
              />
            </div>
            <div className="mb-4">
              <FormControlLabel
                disabled={submittingDocument}
                control={
                  <Checkbox
                    checked={formik.values.shareDocument}
                    onChange={formik.handleChange}
                    sx={{
                      '&.Mui-checked': {
                        color: 'var(--blue-100)',
                      },
                      color: 'var(--dark-blue-50)',
                    }}
                  />
                }
                label={
                  <p className="font-rubik text-base text-dark-blue-70">
                    Share doc with member once it&apos;s uploaded
                  </p>
                }
                name="shareDocument"
              />
            </div>
            {formik.values.shareDocument && (
              <GroupedSearchField
                name="folder"
                options={folders}
                label="Choose upload folder"
                placeholder="Search Folder..."
                disabled={submittingDocument}
              />
            )}

            {showProgressFeedback ? (
              <div className="w-full flex flex-col gap-2 font-rubik">
                <div className="w-full flex justify-between items-center text-base text-dark-blue-100">
                  {processTitle}
                  <span>{progress} %</span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={Math.round(progress)}
                  sx={{
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: error ? '#972323' : '#007AFF',
                    },
                  }}
                />
                {error && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-dark-red-100">{error}</p>
                    <div className="w-full flex justify-end">
                      <PrimaryButton onClick={retryCurrentProcess}>
                        Retry
                      </PrimaryButton>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full flex justify-end mt-2">
                <PrimaryButton type="submit" disabled={submittingDocument}>
                  Save
                </PrimaryButton>
              </div>
            )}
          </Form>
        )
      }}
    </PrimaryForm>
  )
}

export default UploadDocumentForm
