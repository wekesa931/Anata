import React, { useState } from 'react'
import PrescriptionModalView from 'src/modules/prescription/components/prescription-modal'
import PrescriptionDetails from 'src/modules/prescription/components/prescription-details'
import { DocMeta } from 'src/modules/udm/types'
import { useNotifications } from 'src/context/notifications'
import { logError } from 'src/utils/logging/logger'
import useMedicationListingData from '../hooks/medication-listing'

type Props = {
  closeModal: () => void
  getDocMeta: (date?: Date | string) => DocMeta
}

function PrescriptionComponent({ closeModal, getDocMeta }: Props) {
  const { notify } = useNotifications()
  const [modalOpen, setModalOpen] = useState(true)
  const [showPrescription, setShowPrescription] = useState(false)
  const { getMedications } = useMedicationListingData()
  const [loading, setLoading] = useState<boolean>(false)

  const [medications, setMedications] = useState<any[]>([])

  const closePrescriptionModal = () => {
    closeModal()
  }

  const handlePrescriptionDetails = async (values: any) => {
    const dataArray = values?.vcConsultation
    setLoading(true)
    try {
      const medicationData = await getMedications(dataArray)
      setMedications(medicationData)
      setLoading(false)
      setShowPrescription(true)
    } catch (err) {
      setLoading(false)
      logError(err)
      notify('Error loading medications')
    }
  }

  return (
    <>
      {!showPrescription ? (
        <PrescriptionModalView
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          closePrescriptionModal={closePrescriptionModal}
          handlePrescriptionDetails={handlePrescriptionDetails}
          nextLoad={loading}
        />
      ) : (
        <PrescriptionDetails
          handleSubmit={handlePrescriptionDetails}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setShowPrescription={setShowPrescription}
          medications={medications}
          getDocMeta={getDocMeta}
          closePrescriptionModal={closePrescriptionModal}
        />
      )}
    </>
  )
}

export default PrescriptionComponent
