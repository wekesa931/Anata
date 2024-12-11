import { Button, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { FilePlus } from 'react-feather'
import { NewDocumentPopper } from 'src/modules/udm/components/reports/new-document'
import MedicalCampComponent from 'src/modules/udm/views/reports/medical-camp'
import OPGeneralComponent from 'src/modules/udm/views/reports/op-general'
import DocListItem from 'src/modules/udm/components/reports/list-item'
import PrescriptionComponent from 'src/modules/prescription/views/prescription'
import dayjs from 'dayjs'
import { DocMeta } from 'src/modules/udm/types'
import { useModuleAnalytics } from 'src/modules/analytics'
import ClaimComponent from 'src/modules/claimForms/views/claim'

enum DocTypes {
  MEDICAL_CAMP = 'MEDICAL_CAMP',
  OP_GENERAL = 'OP_GENERAL',
  IN_PATIENT = 'IN_PATIENT',
  SPECIALIST = 'SPECIALIST',
  PRESCRIPTION = 'PRESCRIPTION',
  CLAIMFORM = 'CLAIMFORM',
}

function ReportGenerator() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | boolean>(
    null
  )
  const openPopper = Boolean(anchorEl)
  const [isPortalOpen, setOpenPortal] = React.useState(false)
  const [docType, setDocType] = React.useState<DocTypes | null>(null)
  const {
    trackNewDocOpened,
    trackNewDocSelected,
    trackNewDocmentPreviewCancelled,
  } = useModuleAnalytics()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  useEffect(() => {
    if (openPopper) {
      trackNewDocOpened()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl])

  useEffect(() => {
    if (docType) {
      trackNewDocSelected(docType.toString())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docType])

  const closeModal = () => {
    setOpenPortal(false)
    setDocType(null)
    setAnchorEl(null)
    trackNewDocmentPreviewCancelled(getDocMeta())
  }

  const createDocMeta = (
    documentType: string,
    title: string,
    description?: string,
    date?: string | Date,
    folder: string = 'Health Reports'
  ): DocMeta => {
    return {
      docType: documentType,
      description: description || title,
      title: `${title} - ${dayjs(date).format('DD-MM-YYYY')}`,
      folder,
    } as DocMeta
  }

  const getDocMeta = (date?: string | Date): DocMeta => {
    switch (docType) {
      case DocTypes.MEDICAL_CAMP:
        return createDocMeta(
          'Medical Progress Report',
          'Medical camp onsite report',
          'Medical General report',
          date
        )
      case DocTypes.OP_GENERAL:
        return createDocMeta('Medical Progress Report', 'OP general report')
      case DocTypes.IN_PATIENT:
        return createDocMeta('Medical Progress Report', 'In patient report')
      case DocTypes.SPECIALIST:
        return createDocMeta('Medical Progress Report', 'Specialist report')
      case DocTypes.PRESCRIPTION:
        return createDocMeta(
          'Prescription',
          'Prescription report',
          '',
          date,
          'Prescription'
        )
      case DocTypes.CLAIMFORM:
        return createDocMeta(
          'Claim Form',
          'Claim Form Regeneration',
          '',
          date,
          'Claim Form'
        )
      default:
        return {
          docType: '',
          description: '',
          title: '',
          folder: '',
        }
    }
  }

  const openPortal = (type: DocTypes) => {
    setOpenPortal(!isPortalOpen)
    setDocType(type)
  }
  const getTitle = () => {
    switch (docType) {
      case DocTypes.MEDICAL_CAMP:
        return 'Medical Camp Report'
      case DocTypes.OP_GENERAL:
        return 'OP General Report'
      case DocTypes.IN_PATIENT:
        return 'In Patient Report'
      case DocTypes.SPECIALIST:
        return 'Specialist Report'
      case DocTypes.PRESCRIPTION:
        return 'Prescription'
      case DocTypes.CLAIMFORM:
        return 'Claim Form Regeneration'
      default:
        return 'Health Report Generate'
    }
  }

  return (
    <>
      <Button
        sx={{ textTransform: 'none', border: '1px solid #0000ff' }}
        className="whitespace-nowrap px-[9px] py-1 rounded-[8px] border border-blue-500 mr-5 text-sm"
        variant="outlined"
        startIcon={<FilePlus width={15} height={15} />}
        onClick={handleClick}
      >
        New Document
      </Button>

      <NewDocumentPopper open={openPopper} anchorEl={anchorEl}>
        {!isPortalOpen ? (
          <Paper
            elevation={3}
            className="width-[300px] bg-white rounded-[10px]"
          >
            <DocListItem
              title="OP General"
              subtitle="For an external provider"
              onClick={() => {
                openPortal(DocTypes.OP_GENERAL)
              }}
            />

            <DocListItem
              title="Specialist"
              subtitle="For an external specialist"
              onClick={() => {
                openPortal(DocTypes.SPECIALIST)
              }}
            />

            <DocListItem
              title="In patient"
              subtitle="For an external facility"
              onClick={() => {
                openPortal(DocTypes.IN_PATIENT)
              }}
            />

            <DocListItem
              title="Medical Camp"
              subtitle="For a member after activation"
              onClick={() => {
                openPortal(DocTypes.MEDICAL_CAMP)
              }}
            />
            <DocListItem
              title="Prescription Generation"
              subtitle="For a doctor after consultation"
              onClick={() => {
                openPortal(DocTypes.PRESCRIPTION)
              }}
            />
            <DocListItem
              title="Claim Form Regeneration"
              subtitle="For rectifying claim forms"
              onClick={() => {
                openPortal(DocTypes.CLAIMFORM)
              }}
            />
          </Paper>
        ) : (
          <>
            {docType === DocTypes.MEDICAL_CAMP ? (
              <MedicalCampComponent
                closeModal={closeModal}
                getDocMeta={getDocMeta}
                title={getTitle()}
              />
            ) : docType === DocTypes.PRESCRIPTION ? (
              <PrescriptionComponent
                closeModal={closeModal}
                getDocMeta={getDocMeta}
              />
            ) : docType === DocTypes.CLAIMFORM ? (
              <ClaimComponent closeModal={closeModal} getDocMeta={getDocMeta} />
            ) : (
              <OPGeneralComponent
                closeModal={closeModal}
                isInPatient={docType === DocTypes.IN_PATIENT}
                getDocMeta={getDocMeta}
                title={getTitle()}
              />
            )}
          </>
        )}
      </NewDocumentPopper>
    </>
  )
}

export default ReportGenerator
