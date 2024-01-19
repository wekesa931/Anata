import { ClickAwayListener } from '@mui/material'
import dayjs from 'dayjs'
import { Form } from 'formik'
import React, { useEffect } from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import SelectField from 'src/components/forms/fields/select-field'
import PrimaryForm from 'src/components/forms/primary-form'
import PrimaryModal from 'src/components/modals/primary'
import { useAirtableMeta } from 'src/context/airtable-meta'
import { LabRequest, UpdateLabRequest } from 'src/modules/labs/types'
import { useLabsData } from 'src/modules/labs/hooks/labs.hook'
import { useNotifications } from 'src/context/notifications'

type Props = {
  value: LabRequest
}

export function EditLab({ value }: Props) {
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [labStatusOptions, setLabStatusOptions] = React.useState<
    { label: string; value: string }[]
  >([])
  const [labStatus, setLabStatus] = React.useState<string>(value?.status)
  const { airtableMeta } = useAirtableMeta()
  const { updateLabRequest, updating, refetch } = useLabsData()
  const { notify } = useNotifications()

  const initialFormValues = {
    status: labStatus,
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

  const handleSubmit = () => {
    if (labStatus !== value?.status) {
      const rawUpdate: UpdateLabRequest = {
        id: value?.recordId,
        fields: {
          Status: labStatus,
        },
      }

      updateLabRequest(rawUpdate)
        .then(() => {
          notify('Lab request updated succesfully')
          refetch()
        })
        .catch((e: any) => {
          notify(
            typeof e?.message === 'string'
              ? e?.message
              : 'An error occured updating lab request '
          )
        })
        .finally(() => {
          setShowEditModal(false)
        })
    }
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
      <ClickAwayListener onClickAway={setVisibility(false)}>
        <PrimaryModal open={showEditModal} onClose={setVisibility(false)}>
          <div className="flex flex-col gap-6 items-start justify-normal w-full">
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
                <Form>
                  <SelectField
                    name="status"
                    label="Status"
                    options={labStatusOptions}
                    onClick={(e: any) => {
                      e?.stopPropagation()
                    }}
                    handleChange={(value: any) => {
                      setLabStatus(value)
                    }}
                  />
                </Form>
              )}
            </PrimaryForm>
            <div className="flex flex-col gap-2 text-base">
              <p className=" text-grey-main font-medium">Summary</p>
              <p className="text-dark-blue-50">{value?.summary || '-'}</p>
            </div>
            <div className="flex flex-col gap-2 text-base">
              <p className=" text-grey-main font-medium">Lab Type</p>
              <p className="text-dark-blue-50">{value?.labType || '-'}</p>
            </div>
            <div className="flex flex-col gap-2 text-base">
              <p className=" text-grey-main font-medium">Notes</p>
              <p className="text-dark-blue-50">{value?.notes || '-'}</p>
            </div>
            <div className="flex flex-col gap-2 text-base">
              <p className=" text-grey-main font-medium">Created by</p>
              <p className="text-dark-blue-50">
                {value?.createdBy?.name || '-'}
              </p>
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
                onClick={(e: any) => {
                  e?.stopPropagation()
                  handleSubmit()
                }}
                disabled={updating}
                loading={updating}
              >
                Save
              </PrimaryButton>
            </div>
          </div>
        </PrimaryModal>
      </ClickAwayListener>
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
