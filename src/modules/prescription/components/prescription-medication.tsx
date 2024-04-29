import React from 'react'
import PrimaryButton from 'src/components/buttons/primary'
import Tooltip from 'src/components/tooltip'
import DeleteIcon from '@mui/icons-material/Delete'

type ListingProps = {
  prescriptionMedications: any
  generatePrescription: () => void
  removeMedicationFromList: (value: any) => void
}
type TMedicationsItem = {
  quantity: any
  unit: any
  frequency: any
  route: any
  duration: any
  instructions: any
  refillable: any
  medicationName: any
  brandName: any
}
function MedicationListing({
  prescriptionMedications,
  generatePrescription,
  removeMedicationFromList,
}: ListingProps) {
  function MedicationItem({ medication }: { medication: TMedicationsItem }) {
    const sections = [
      { label: 'Quantity', value: `${medication.quantity} ${medication.unit}` },
      { label: 'Frequency', value: medication.frequency },
      { label: 'Route', value: medication.route },
      { label: 'Duration', value: `${medication.duration} days` },
      { label: 'Instructions', value: medication.instructions },
    ]

    return (
      <div className="bg-[#FFFFFF] border border-solid border-[#444444] p-3 rounded-2xl mb-3 flex justify-between">
        <div className="w-[90%]">
          <h1 className="font-medium text-[#222222] text-sm">
            {medication.brandName
              ? `${medication.medicationName}  |  ${medication.brandName}`
              : medication.medicationName}
          </h1>
          <div className="flex justify-between mt-3 text-xs leading-8 w-[60%]">
            {sections.map((section, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div className="border-r border-solid border-[#777777] m-2" />
                )}
                <section>
                  <p className="text-dark-blue-50 uppercase">{section.value}</p>
                </section>
              </React.Fragment>
            ))}
          </div>
        </div>
        <Tooltip title="Remove Medication">
          <DeleteIcon
            className="bg-[#FFEBEA]  text-[#FF3B30]  w-4 h-4 rounded-sm mr-2 cursor-pointer"
            onClick={(e) => {
              e?.stopPropagation()
              removeMedicationFromList(medication)
            }}
          />
        </Tooltip>
      </div>
    )
  }
  return (
    <>
      <div className="mt-4 overflow-scroll max-h-[30rem]">
        {prescriptionMedications.map((medication: any, index: any) => (
          <MedicationItem key={index} medication={medication} />
        ))}
      </div>
      <div className="flex justify-end mt-6 bottom-[5%] right-[2%]">
        <PrimaryButton
          className="w-[20%]"
          fullWidth
          variant="contained"
          type="button"
          onClick={generatePrescription}
        >
          Generate prescription
        </PrimaryButton>
      </div>
    </>
  )
}

export default MedicationListing
