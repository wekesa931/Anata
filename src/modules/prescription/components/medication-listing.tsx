import React from 'react'
import { Form } from 'formik'
import PrimaryForm from 'src/components/forms/primary-form'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PrimaryButton from 'src/components/buttons/primary'
import { MultiselectField } from 'src/components/forms/fields/select-field'
import ErrorComponent from 'src/components/feedbacks/error-component'
import PrescriptionMedication from './prescription-medication'

type TMedicationsItem = {
  value: string
  label: string
}

type ListingProps = {
  showMedication: boolean
  toggleCheckboxes: () => void
  showCheckboxes: boolean
  medications?: Array<TMedicationsItem>
  selectedItems: any
  handleCheckboxChange: (event: any, value: string) => void
  showMedicationView: (values: any) => void
  prescriptionMedications: any
  generatePrescription: () => void
  removeMedicationFromList: (medication: any) => void
  userError: string | null
  setUserError: (values: any) => void
}
function MedicationListing({
  showMedication,
  toggleCheckboxes,
  showCheckboxes,
  medications,
  showMedicationView,
  prescriptionMedications,
  removeMedicationFromList,
  generatePrescription,
  userError,
  setUserError,
}: ListingProps) {
  const options =
    medications?.map((item) => ({
      label: item.label,
      value: item.value,
      key: item.value,
    })) || []

  return (
    <>
      {!showMedication ? (
        <PrimaryForm initialValues={{}} handleSubmit={showMedicationView}>
          {(formik) => (
            <Form key="list-edit-form">
              <div>
                <section className="mt-6 mr-[6%] ml-[6%]">
                  <div
                    className="bg-[#FAFAFA] border border-solid border-[#FAFAFA] p-2 flex rounded-lg items-center justify-between"
                    role="button"
                    onClick={toggleCheckboxes}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Space') {
                        toggleCheckboxes()
                      }
                    }}
                    tabIndex={0}
                  >
                    <div className="ml-4 p-3">
                      <h1 className="font-medium text-[#007AFF] text-base">
                        Select existing medication
                      </h1>
                      <p>
                        Choose medication that was already added in the system
                        during a workflow
                      </p>
                    </div>
                    <div className="cursor-pointer">
                      {showCheckboxes ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowUpIcon />
                      )}
                    </div>
                  </div>
                  {showCheckboxes && (
                    <div
                      className="bg-[#ffffff] p-2 absolute !w-[86%]"
                      tabIndex={0}
                      role="button"
                    >
                      <div className="overflow-scroll max-h-[50%] ">
                        <MultiselectField
                          name="linkedMedications"
                          options={options}
                          label=""
                          placeholder="Type here to search"
                          required={false}
                        />
                      </div>
                      {userError && (
                        <ErrorComponent handleClose={() => setUserError(null)}>
                          {userError}
                        </ErrorComponent>
                      )}
                      {userError ? (
                        <div className="flex justify-end mt-6">
                          <PrimaryButton
                            fullWidth
                            className="w-[20%]"
                            onClick={() => {
                              showMedicationView(formik)
                            }}
                          >
                            Retry
                          </PrimaryButton>
                        </div>
                      ) : (
                        <div className="flex justify-end mt-6">
                          <PrimaryButton
                            disabled={
                              !formik.values.linkedMedications ||
                              formik.values.linkedMedications.length === 0
                            }
                            className="w-[20%]"
                            fullWidth
                            variant="contained"
                            type="submit"
                          >
                            Proceed
                          </PrimaryButton>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>
            </Form>
          )}
        </PrimaryForm>
      ) : (
        <PrescriptionMedication
          prescriptionMedications={prescriptionMedications}
          generatePrescription={generatePrescription}
          removeMedicationFromList={removeMedicationFromList}
        />
      )}
    </>
  )
}

export default MedicationListing
