import React, { useState } from 'react'
import Modal from 'src/components/modals'
import CloseIcon from '@mui/icons-material/Close'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'
import { DocMeta } from 'src/modules/udm/types'
import PdfPreview from 'src/modules/udm/views/reports/pdf-preview'
import { logError } from 'src/utils/logging/logger'
import { useNotifications } from 'src/context/notifications'
import PrimaryButton from 'src/components/buttons/primary'
import MedicationListing from './medication-listing'
import PrescriptionGenerationView from './prescription-generation-pdf'
import useMedicationListingData from '../hooks/medication-listing'

type TMedicationsItem = {
  value: string
  label: string
}
type PrescriptionMedication = {
  medicationName: string
  recordId: string
  quantity: string
  unit: string
  frequency: string
  route: string
  duration: string
  instructions: string
  refillable: string
  value: string
}

type DetailsProps = {
  setModalOpen: (value: boolean) => void
  setShowPrescription: (value: boolean) => void
  handleSubmit: (values: any) => void
  modalOpen: boolean
  medications?: Array<TMedicationsItem>
  getDocMeta: (date?: Date | string) => DocMeta
  closePrescriptionModal: (values: any) => void
  addNewMedicationToList: (value: any) => void
}
function ModalHeader({
  setShowPrescription,
}: {
  setShowPrescription: (value: boolean) => void
}): React.ReactElement {
  return (
    <>
      <div className="full-width flex text-center justify-between">
        <h3 className="font-medium text-[#000000] text-xl">
          Prescription Generation
        </h3>
        <CloseIcon onClick={() => setShowPrescription(false)} />
      </div>
      <div className="border-b border-solid border-[#d9d9d9] mt-3" />
    </>
  )
}
function PrescriptionDetailsView({
  modalOpen,
  setModalOpen,
  medications,
  setShowPrescription,
  getDocMeta,
  closePrescriptionModal,
}: DetailsProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showCheckboxes, setShowCheckboxes] = useState(false)
  const [showMedication, setShowMedication] = useState(false)
  const [displayPDF, setdisplayPDF] = useState(false)
  const [userError, setUserError] = useState<string | null>(null)
  const { notify } = useNotifications()

  const [prescriptionMedications, setPrescriptionMedications] = useState<
    PrescriptionMedication[]
  >([])
  const { member } = useMember()
  const user = useUser()
  const { getMedicationDetails } = useMedicationListingData()

  const handleCheckboxChange = (event: any, value: string) => {
    if (event.target.checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, value])
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== value)
      )
    }
  }
  const toggleCheckboxes = () => {
    setShowCheckboxes((prevShowCheckboxes) => !prevShowCheckboxes)
  }

  const showMedicationView = async (values: any) => {
    try {
      const medicationList = await getMedicationDetails(
        values.linkedMedications
      )
      setUserError(null)
      setPrescriptionMedications(medicationList)
      setShowMedication(true)
    } catch (error) {
      setUserError(`Error loading medication details : ${error}`)
      logError(error)
      notify('Error loading medication details')
    }
  }

  const generatePrescription = () => {
    setdisplayPDF(true)
  }

  const handleClose = () => {
    closePrescriptionModal(false)
  }
  const removeMedicationFromList = (value: any) => {
    if (
      prescriptionMedications.length === 1 &&
      prescriptionMedications[0].recordId === value.recordId
    ) {
      setShowMedication(false)
    }
    setPrescriptionMedications((prevMedications) =>
      prevMedications.filter(
        (medication) => medication.recordId !== value.recordId
      )
    )
  }
  const customButton = <PrimaryButton>Save in UDM </PrimaryButton>

  return modalOpen ? (
    <>
      {!displayPDF ? (
        <Modal
          open={modalOpen}
          setModalOpen={setModalOpen}
          heading={<ModalHeader setShowPrescription={setShowPrescription} />}
          height={displayPDF ? 'auto' : '75%'}
          width="70%"
          closeOption={false}
        >
          <MedicationListing
            showMedication={showMedication}
            toggleCheckboxes={toggleCheckboxes}
            showCheckboxes={showCheckboxes}
            medications={medications}
            selectedItems={selectedItems}
            handleCheckboxChange={handleCheckboxChange}
            showMedicationView={showMedicationView}
            prescriptionMedications={prescriptionMedications}
            generatePrescription={generatePrescription}
            removeMedicationFromList={removeMedicationFromList}
            setShowMedication={setShowMedication}
            userError={userError}
            setUserError={setUserError}
          />
        </Modal>
      ) : (
        <PdfPreview
          setShowPdfPreview={setdisplayPDF}
          docMeta={getDocMeta()}
          closeWindow={handleClose}
          allowEdit={false}
          modalHeader="Prescription PDF preview"
          modalLabel="Prescription generation"
          generatePDFCustomBtn={customButton}
        >
          <PrescriptionGenerationView
            prescriptionMedications={prescriptionMedications}
            member={member}
            user={user}
          />
        </PdfPreview>
      )}
    </>
  ) : null
}

export default PrescriptionDetailsView
