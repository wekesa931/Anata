import Button from '@mui/material/Button'
import React from 'react'
import { useMember } from 'src/context/member'
import { useUser } from 'src/context/user'

const CalendlyLink = ({ field, formPayload }: any) => {
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
    const urlName = member['Full Name']?.replaceAll(' ', '%20')
    const memberEmail = member['Email 1'] || 'navigation@antarahealth.com'
    if (calendlyLinkedFields[field.id]) {
      const reasonUrl = formPayload[0][calendlyLinkedFields[field.id].reason]
        ? formPayload[0][calendlyLinkedFields[field.id].reason].replaceAll(
            ' ',
            '%20'
          )
        : ''
      const notes = formPayload[0][calendlyLinkedFields[field.id].notes]
        ? formPayload[0][calendlyLinkedFields[field.id].notes].replaceAll(
            ' ',
            '%20'
          )
        : ''
      urlString = `https://calendly.com/antara-health/${
        calendlyLinkedFields[field.id].link
      }?name=${urlName}&email=${memberEmail}&a1=${
        member['Phone 1']
      }&a2=${reasonUrl}&a3=${notes}&utm_source=src - ${user?.name}`
      return (
        <Button
          variant="outlined"
          className="font-rubik text-xs capitalize"
          onClick={() => openCalendar(urlString)}
        >
          {calendlyLinkedFields[field.id].ctLabel}
        </Button>
      )
    }
    return <></>
  }
  return calendaUrl()
}

export default CalendlyLink
