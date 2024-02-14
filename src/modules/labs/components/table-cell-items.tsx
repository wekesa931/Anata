import dayjs from 'dayjs'
import { Form } from 'formik'
import React, { useEffect } from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import SelectField from 'src/components/forms/fields/select-field'
import PrimaryForm from 'src/components/forms/primary-form'
import PrimaryModal from 'src/components/modals/primary'
import { useAirtableMeta } from 'src/context/airtable-meta'
import { LabRequest, UpdateLabRequest } from 'src/modules/labs/types'
import { LabRequestHook } from 'src/modules/labs/hooks/labs.hook'
import { useNotifications } from 'src/context/notifications'
import TextField from 'src/components/forms/fields/text'
import { DateTimeField } from 'src/components/forms/fields/date-field'

type Props = {
  value: LabRequest
  labsApi: LabRequestHook
}

export function EditLab({ value, labsApi }: Props) {
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [labStatusOptions, setLabStatusOptions] = React.useState<
    { label: string; value: string }[]
  >([])
  const [labStatus, setLabStatus] = React.useState<string>(value?.status)
  const [reason, setReason] = React.useState<string>(value?.reason)
  const [resultDate, setResultDate] = React.useState<string>(value?.resultDate)
  const { airtableMeta } = useAirtableMeta()
  const { updateLabRequest, updating, refetch } = labsApi
  const { notify } = useNotifications()

  const initialFormValues: Partial<LabRequest> = {
    status: labStatus,
    reason: value?.reason,
    resultDate: value?.resultDate,
  }

  const getOptions = (fields: any) => {
    const labsTable: any =
      Object.values(fields).find(
        (f: any) => f.name === 'Lab/imaging management'
      ) || {}

    const statusField: any = Object.values(labsTable?.fields)?.find(
      (f: any) => f.name === 'Status'
    )
    const statusOptions =
      statusField?.options?.choices?.map((choice: any) => ({
        label: choice.name,
        value: choice.name,
      })) || []

    setLabStatusOptions(statusOptions)
  }

  const setVisibility = (show: boolean) => (e: any) => {
    e?.stopPropagation()
    setShowEditModal(show)
  }

  const handleSubmit = async (e: any) => {
    e?.stopPropagation()

    const rawUpdate: UpdateLabRequest = {
      id: value?.recordId,
      fields: {
        Status: labStatus,
        'Result Date': resultDate,
        Reason: reason,
      },
    }

    updateLabRequest(rawUpdate)
      .then(() => {
        notify('Lab request updated succesfully')
        refetch()
      })
      .catch((err: any) => {
        notify(
          typeof err?.message === 'string'
            ? err?.message
            : 'An error occured updating lab request '
        )
      })
      .finally(() => {
        setShowEditModal(false)
      })
  }

  useEffect(() => {
    if (airtableMeta) {
      getOptions(airtableMeta)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airtableMeta])

  return (
    <div className="font-rubik">
      <PrimaryButton
        className="text-midnight-blue text-xs rounded-md border-midnight-blue border px-2 py-1"
        variant="outlined"
        onClick={setVisibility(true)}
      >
        Edit
      </PrimaryButton>
      <PrimaryModal open={showEditModal} onClose={setVisibility(false)}>
        <div className="flex flex-col gap-2 items-start justify-normal w-full">
          <h1 className="text-black text-xl font-medium">Edit Lab Request</h1>
          <div className="flex flex-col gap-2 text-base">
            <p className=" text-grey-main font-medium">Date of request</p>
            <p className="text-dark-blue-50">
              {dayjs(value?.dateOfRequest).format('DD MMM YYYY')}
            </p>
          </div>
          <PrimaryForm
            initialValues={initialFormValues}
            handleSubmit={handleSubmit}
            className="w-full pb-0"
          >
            {() => (
              <Form className="flex flex-col gap-2">
                <SelectField
                  name="status"
                  label="Status"
                  options={labStatusOptions}
                  onClick={(e: any) => {
                    e?.stopPropagation()
                  }}
                  handleChange={(v: any) => {
                    setLabStatus(v)
                  }}
                  bottomPadding={false}
                />
                <DateTimeField
                  name="resultDate"
                  label="Result Date"
                  openToYear={false}
                  maxDate={new Date()}
                  handleChange={(v: any) => {
                    setResultDate(v)
                  }}
                />
                <TextField
                  name="reason"
                  label="Reason"
                  textarea
                  rows={3}
                  bottomPadding={false}
                  handleChange={(e: any) => {
                    setReason(e.target.value)
                  }}
                />
              </Form>
            )}
          </PrimaryForm>

          <div className="flex flex-col gap-2 text-base">
            <p className=" text-grey-main font-medium">Lab Type</p>
            <p className="text-dark-blue-50">{value?.labType || '-'}</p>
          </div>
          <div className="flex flex-col gap-2 text-base">
            <p className=" text-grey-main font-medium">Imaging Type</p>
            <p className="text-dark-blue-50">{value?.imagingType || '-'}</p>
          </div>
          <div className="flex flex-col gap-2 text-base">
            <p className=" text-grey-main font-medium">Notes</p>
            <p className="text-dark-blue-50">{value?.notes || '-'}</p>
          </div>
          <div className="flex flex-col gap-2 text-base">
            <p className=" text-grey-main font-medium">Created by</p>
            <p className="text-dark-blue-50">{value?.createdBy?.name || '-'}</p>
          </div>
          <div className="flex flex-col gap-2 text-base w-full">
            <PrimaryButton
              className="bg-disabled-grey hover:bg-disabled-grey w-full text-white rounded-md px-2 py-1 font-medium"
              fullWidth
              onClick={setVisibility(false)}
              disabled={updating}
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton
              className="font-medium"
              fullWidth
              onClick={handleSubmit}
              disabled={updating}
              loading={updating}
            >
              Save
            </PrimaryButton>
          </div>
        </div>
      </PrimaryModal>
    </div>
  )
}

export function Status({ value }: any) {
  return (
    <div className="border border-dark-blue-50 text-dark-blue-70 font-rubik text-xs rounded-2xl px-2 py-1 text-center break-normal">
      {value?.status}
    </div>
  )
}
