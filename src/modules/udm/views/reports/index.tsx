import { Button, Paper } from '@mui/material'
import React from 'react'
import { FilePlus } from 'react-feather'
import { NewDocumentPopper } from 'src/modules/udm/components/reports/new-document'
import MedicalCampComponent from 'src/modules/udm/views/reports/medical-camp'
import OPGeneralComponent from 'src/modules/udm/views/reports/op-general'
import DocListItem from 'src/modules/udm/components/reports/list-item'
import dayjs from 'dayjs'
import { DocMeta } from 'src/modules/udm/types'

enum DocTypes {
  MEDICAL_CAMP = 'MEDICAL_CAMP',
  OP_GENERAL = 'OP_GENERAL',
  IN_PATIENT = 'IN_PATIENT',
  SPECIALIST = 'SPECIALIST',
}

function ReportGenerator() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | boolean>(
    null
  )
  const openPopper = Boolean(anchorEl)
  const [isPortalOpen, setOpenPortal] = React.useState(false)
  const [docType, setDocType] = React.useState<DocTypes | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const closeModal = () => {
    setOpenPortal(false)
    setDocType(null)
    setAnchorEl(null)
  }

  const createDocMeta = (
    title: string,
    description?: string,
    date?: string | Date
  ): DocMeta => {
    return {
      docType: 'Medical Progress Report',
      description: description || title,
      title: `${title} - ${dayjs(date).format('DD-MM-YYYY')}`,
    } as DocMeta
  }

  const getDocMeta = (date?: string | Date): DocMeta => {
    switch (docType) {
      case DocTypes.MEDICAL_CAMP:
        return createDocMeta(
          'Medical camp onsite report',
          'Medical General report',
          date
        )
      case DocTypes.OP_GENERAL:
        return createDocMeta('OP general report')
      case DocTypes.IN_PATIENT:
        return createDocMeta('In patient report')
      case DocTypes.SPECIALIST:
        return createDocMeta('Specialist report')
      default:
        return {
          docType: '',
          description: '',
          title: '',
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
          </Paper>
        ) : (
          <>
            {docType === DocTypes.MEDICAL_CAMP ? (
              <MedicalCampComponent
                closeModal={closeModal}
                getDocMeta={getDocMeta}
                title={getTitle()}
              />
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
