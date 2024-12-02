import React, { useState } from 'react'
import Modal from 'src/components/modals'
import { Form } from 'formik'
import PrimaryForm from 'src/components/forms/primary-form'
import { Button } from '@mui/material'
import { useNotifications } from 'src/context/notifications'
import { Loader } from 'react-feather'
import { useRegistrationData } from 'src/modules/member/hooks/registration'

type ModalProps = {
  updatedData: any
  modalOpen: boolean
  setValidation: (values: any) => void
  availableCohorts: Array<{ label: string; value: string }>
  initialData: any
  member: any
  requestComplete: () => void
  activeBillingPackageId: number
}

type ModalHeaderProps = {
  initialData: any
  updatedData: any
  availableCohorts: Array<{ label: string; value: string }>
}

function ModalHeader({
  initialData,
  updatedData,
  availableCohorts,
}: ModalHeaderProps) {
  const getCohortLabel = (cohortValue: string) => {
    const cohort = availableCohorts.find((chrt) => chrt.value === cohortValue)
    return cohort ? cohort.label : 'Unknown'
  }

  const newCohortLabel = getCohortLabel(updatedData.values.cohortName)
  const oldCohortLabel = getCohortLabel(initialData.cohortName)

  return (
    <div className="full-width">
      <h3 className="font-medium text-base">Heads up!</h3>
      <p className="mt-2">
        Moving the member to <strong>{newCohortLabel}</strong> will
        automatically cancel <strong>{oldCohortLabel}</strong> billing package.
      </p>
      <p className="mt-5">Are you sure you want to proceed?</p>
    </div>
  )
}

function BillingCohortModal({
  updatedData,
  setValidation,
  modalOpen,
  availableCohorts,
  initialData,
  member,
  requestComplete,
  activeBillingPackageId,
}: ModalProps) {
  const { notify } = useNotifications()
  const [loading, setLoading] = useState(false)
  const { handleMemberCohortUpdate } = useRegistrationData()

  const handleBillingCohortDetails = async (data: any) => {
    const { cohortName } = data.updatedData.values
    if (member) {
      const payload = {
        cohortId: parseInt(cohortName, 10),
        billingPackageId: activeBillingPackageId,
      }

      setLoading(true)
      try {
        await handleMemberCohortUpdate(member, payload)
        notify('Member cohort updated successfully', 'success')
        requestComplete()
        setValidation(false)
      } catch (error: any) {
        notify(error?.message ?? 'Error updating member cohort', 'error')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Modal
      open={modalOpen}
      heading={
        <ModalHeader
          updatedData={updatedData}
          initialData={initialData}
          availableCohorts={availableCohorts}
        />
      }
      height="auto"
      width="30%"
      closeOption={false}
    >
      <PrimaryForm
        initialValues={{ updatedData }}
        handleSubmit={handleBillingCohortDetails}
      >
        {() => (
          <Form key="list-edit-form">
            <div className="mt-10 flex flex-col gap-4">
              <Button
                type="submit"
                fullWidth
                className="border"
                sx={{
                  backgroundColor: '#ffff',
                  border: '1px #205284 solid',
                  color: '#205284',
                }}
              >
                {loading && <Loader className="mr-2" />}
                Yes, Proceed
              </Button>
              <Button
                type="button"
                fullWidth
                className="border"
                sx={{
                  backgroundColor: '#972323 !important',
                  border: '1px #972323 solid',
                  color: '#FFFFFF !important',
                }}
                onClick={() => setValidation(false)}
              >
                No, Go back
              </Button>
            </div>
          </Form>
        )}
      </PrimaryForm>
    </Modal>
  )
}

export default BillingCohortModal
