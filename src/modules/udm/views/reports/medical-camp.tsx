import React, { useState } from 'react'
import PortalWindow from 'src/components/portal'
import MedicalCampForm from 'src/modules/udm/components/reports/forms/medical-camp'
import PdfPreview from 'src/modules/udm/views/reports/pdf-preview'
import { getLabsMedicalData, getVitalsMedicalData } from 'src/modules/udm/utils'
import { useMember } from 'src/context/member'
import { DocMeta } from 'src/modules/udm/types'
import MedicalCampPDFTemplate from 'src/modules/udm/views/reports/templates/medical-camp'
import { useReportsGenerationData } from 'src/modules/vitals/hooks/report-generation.hook'

type Props = {
  loading?: boolean
  closeModal: () => void
  getDocMeta: (date?: Date | string) => DocMeta
  title: string
}

const isMedicalCampDataEmpty = (medicalCampData: any) => {
  const { labs, vitals } = medicalCampData
  return labs.length < 3 && vitals.length < 3
}

function MedicalCampComponent({ closeModal, getDocMeta, title }: Props) {
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const initialMedicalCampData = {
    medicalCampDate: '',
    nextActions: '',
    additionalInsights: '',
  }
  const [medicalCampData, setMedicalCampData] = useState<any>(null)
  const [formData, setFormData] = useState<any>(initialMedicalCampData)
  const [error, setError] = useState<any>(null)
  const { member } = useMember()
  const { loading, getMedicalCampData } = useReportsGenerationData()

  const handleShowPdfPreview = (values: any) => {
    const date = values?.medicalCampDate
    getMedicalCampData(date)
      .then((response) => {
        if (response) {
          const vitals = getVitalsMedicalData(response)
          const labs = getLabsMedicalData(response)

          setMedicalCampData({
            vitals,
            labs,
          })
          setError(null)
          setShowPdfPreview(true)
        } else {
          setError('Failed to load medical camp data')
        }

        setFormData(values)
      })
      .catch(setError)
  }

  const handleClose = () => {
    setShowPdfPreview(false)
    closeModal()
  }

  if (showPdfPreview) {
    return (
      <PdfPreview
        loadingData={loading}
        setShowPdfPreview={setShowPdfPreview}
        docMeta={getDocMeta(formData?.medicalCampDate)}
        isEmpty={isMedicalCampDataEmpty(medicalCampData)}
      >
        <MedicalCampPDFTemplate
          member={member}
          labsAndVitalsData={medicalCampData}
          formData={formData}
        />
      </PdfPreview>
    )
  }

  return (
    <PortalWindow
      closeWindow={() => closeModal()}
      aria-labelledby="medical-camp"
      aria-describedby="medical-camp"
      title={title}
      height={60}
    >
      <div className="p-6">
        <MedicalCampForm
          handleShowPdfPreview={handleShowPdfPreview}
          handleClose={handleClose}
          initialData={formData}
          loading={loading}
          error={error}
          showDateSelection
        />
      </div>
    </PortalWindow>
  )
}

export default MedicalCampComponent
