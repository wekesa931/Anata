import Button from '@mui/material/Button'
import React from 'react'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'

type Props = {
  fieldId: string
  formPayload: any
}

const CalendlyLink = ({ fieldId, formPayload }: Props) => {
  const { member } = useMember()
  const user = useUser()

  const calendlyLinkedFields: any = {
    reasonForConsultation: {
      link: 'antara-virtual-doctor-consultation',
      reason: 'Reasons for Consultation',
      notes: '',
      ctLabel: 'Book VC appointment',
    },
    mhcReferralReasons: {
      link: 'mental-health-consultation',
      reason: 'MHC Reasons for Referral',
      notes: '',
      ctLabel: 'Book MHC appointment',
    },
    ncReferralReasons: {
      link: 'nutrition-consultation',
      reason: 'NC Reasons for Referral',
      notes: 'Notes for Nutritional Consultation',
      ctLabel: 'Book NC appointment',
    },
    pcReferralReasons: {
      link: 'physiotherapy-consultation',
      reason: 'Reasons for Referral',
      notes: 'Notes for Physio Consultation',
      ctLabel: 'Book PC appointment',
    },
    pedcReferralReasons: {
      link: 'pediatric-consultation',
      reason: 'Reasons for Referral',
      notes: 'Notes for Pediatric',
      ctLabel: 'Book Pedriatic appointment',
    },
  }
  const openCalendar = (link: string) => {
    const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  const calendaUrl = () => {
    let urlString = ''
    const urlName = member?.fullName?.replace(' ', '%20')
    const antaraId = member?.antaraId
    const memberEmail = member?.email || 'navigation@antarahealth.com'
    if (calendlyLinkedFields[fieldId]) {
      const reasonUrl = formPayload[calendlyLinkedFields[fieldId].reason]
        ? formPayload[calendlyLinkedFields[fieldId].reason].replaceAll(
            ' ',
            '%20'
          )
        : ''
      const notes = formPayload[calendlyLinkedFields[fieldId].notes]
        ? formPayload[calendlyLinkedFields[fieldId].notes].replaceAll(
            ' ',
            '%20'
          )
        : ''
      urlString = `https://calendly.com/antara-health/${calendlyLinkedFields[fieldId].link}?name=${urlName}&email=${memberEmail}&a1=${member?.phone}&a2=${reasonUrl}&a3=${notes}&utm_source=src-${user?.name}&utm_content=${antaraId}`
      return (
        <Button
          variant="outlined"
          className="font-rubik text-xs capitalize"
          onClick={() => openCalendar(urlString)}
        >
          {calendlyLinkedFields[fieldId].ctLabel}
        </Button>
      )
    }
    return <></>
  }
  return calendaUrl()
}

export default CalendlyLink
