import React, { useState } from 'react'
import PortalWindow from 'src/components/portal'
import MedicalCampForm from 'src/modules/udm/components/reports/forms/medical-camp'
import PdfPreview from 'src/modules/udm/views/reports/pdf-preview'
import { useMember } from 'src/context/member'
import { DocMeta } from 'src/modules/udm/types'
import OpGeneralPDFTemplate from 'src/modules/udm/views/reports/templates/op-general'
import useClinicalSummary from 'src/modules/member/hooks/clinical-summary'
import { useReportsGenerationData } from 'src/modules/vitals/hooks/report-generation.hook'
import useInterventionData from 'src/modules/interventions/hooks/intervention.data'
import { useModuleAnalytics } from 'src/modules/analytics'
import { useConditionsData } from 'src/modules/conditions/hooks/conditions.data'
import { Condition } from 'src/modules/conditions/types'

type Props = {
  loading?: boolean
  closeModal: () => void
  isInPatient?: boolean
  getDocMeta: (date?: Date | string) => DocMeta
  title: string
}

const isMedicalCampDataEmpty = (medicalCampData: any) => {
  const { labs, vitals } = medicalCampData
  return labs.length < 3 && vitals.length < 3
}

function OpGeneralComponent({
  closeModal,
  isInPatient = false,
  getDocMeta,
  title,
}: Props) {
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const initialMedicalCampData = {
    nextActions: '',
    additionalInsights: '',
  }
  const [labsAndVitalsData, setLabsAndVitalsData] = useState<any>({
    labs: [],
    vitals: [],
  })
  const [formData, setFormData] = useState<any>(initialMedicalCampData)
  const [error, setError] = useState<any>(null)
  const { member } = useMember()
  const clinicalData = useClinicalSummary()
  const { allConditions, loading: loadingConditions } = useConditionsData()
  const { getLabsAndVitalsProgressReport, loadingProgressReport: loading } =
    useReportsGenerationData()
  const { memberInterventions, loading: loadingInterventions } =
    useInterventionData()
  const { trackNewDocumentPreviewed } = useModuleAnalytics()

  const parseMemberCondition = (conditions: Condition[]) => {
    return (
      conditions.map((c) => ({
        condition: c.name,
        currentStage: c.currentStage?.name,
        dateOfDiagnosis: c.diagnosisDate,
      })) || []
    )
  }

  const handleSuccessShowPdf = () => {
    setError(null)
    setShowPdfPreview(true)
  }

  const handleShowPdfPreview = (values: any) => {
    if (isInPatient) {
      handleSuccessShowPdf()
    } else {
      getLabsAndVitalsProgressReport()
        .then((response) => {
          if (response) {
            setLabsAndVitalsData(response)
            handleSuccessShowPdf()
          } else {
            setError('Failed to load medical camp data')
          }

          setFormData(values)
        })
        .catch(setError)
    }
  }

  const handleClose = () => {
    setShowPdfPreview(false)
    closeModal()
  }

  const isLoadingData =
    loading ||
    clinicalData?.loadingHif ||
    loadingConditions ||
    loadingInterventions

  if (showPdfPreview) {
    trackNewDocumentPreviewed({ ...getDocMeta(), details: formData })
    return (
      <PdfPreview
        loadingData={isLoadingData}
        setShowPdfPreview={setShowPdfPreview}
        docMeta={getDocMeta()}
        isEmpty={isMedicalCampDataEmpty(labsAndVitalsData)}
        isInPatient={isInPatient}
        closeWindow={handleClose}
      >
        <OpGeneralPDFTemplate
          member={member}
          labsAndVitalsData={labsAndVitalsData}
          formData={formData}
          clinicalData={clinicalData}
          conditions={parseMemberCondition(allConditions)}
          interventions={memberInterventions}
          isInPatient={isInPatient}
        />
      </PdfPreview>
    )
  }

  return (
    <PortalWindow
      closeWindow={() => closeModal()}
      aria-labelledby="health-report-generation"
      aria-describedby="health-report-generation"
      title={title}
      height={60}
    >
      <div className="p-4">
        <MedicalCampForm
          handleShowPdfPreview={handleShowPdfPreview}
          handleClose={handleClose}
          initialData={formData}
          loading={isLoadingData}
          error={error}
        />
      </div>
    </PortalWindow>
  )
}

export default OpGeneralComponent
