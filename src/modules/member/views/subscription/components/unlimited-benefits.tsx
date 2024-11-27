import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import PrimaryButton from 'src/components/buttons/primary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AssignMembershipView from './assign-membership'

type AccordionItem = {
  title: string
  details: string
}

const accordionItems: AccordionItem[] = [
  {
    title: 'Personalized Fitness plans',
    details: 'We have exercise options for your needs and your schedule.',
  },
  {
    title: 'Guided nutrition plan',
    details:
      'We show you how to eat healthy including your favourite meals and considering your budget.',
  },
  {
    title: 'Unlimited doctor consultations',
    details:
      'No long waiting lines to speak to the doctor! Call at the comfort of your home or office.',
  },
  {
    title: 'Unlimited counseling sessions',
    details:
      'We help you with managing money, thriving in your workplaces, building healthy relationships and much more.',
  },
  {
    title: 'Personal nurse to follow-up',
    details: 'Your own personal assistant for all things health.',
  },
  {
    title: 'Medication deliveries',
    details:
      'Get medicine delivered to your home or office at no additional cost.',
  },
  {
    title: 'Medical equipment deliveries',
    details:
      'Monitor your blood pressure and blood sugar from the comfort of your home with our equipment delivery service.',
  },
]

type ViewProps = {
  unlimitedMembershipMode: 'benefits' | 'assign'
  setPricingModalView: (values: any) => void
  setUnlimitedMembershipMode: (values: any) => void
}

function UnlimitedBenefitsView({
  unlimitedMembershipMode,
  setPricingModalView,
  setUnlimitedMembershipMode,
}: ViewProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleExpandedAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }
  return (
    <>
      {unlimitedMembershipMode === 'benefits' ? (
        <div>
          <button
            className="mt-3 hover:bg-none flex items-center bg-none text-[#5D6B82] h-9 p-[5px] rounded capitalize font-medium"
            type="button"
            onClick={() => {
              setPricingModalView('fee-for-service')
            }}
          >
            <ArrowBackIosIcon className="text-[#D1D5DB]" />
            Back
          </button>
          <div>
            {accordionItems.map((item, index) => (
              <Accordion
                key={index}
                expanded={expandedIndex === index}
                onChange={() => handleExpandedAccordion(index)}
                className="block border rounded-xl border-solid border-dark-blue-10 my-1 mb-2 shadow-none"
                sx={{
                  backgroundColor:
                    expandedIndex === index ? '#E7F3FD' : '#D1D5DB',
                  borderColor:
                    expandedIndex === index ? '#87C1F7 !important' : '',
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h1 className="text-[#182C4C] font-medium ">{item.title}</h1>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="border-t pt-2 border-[#5D6B82]">
                    <p className="text-[#5D6B82] font-normal text-sm">
                      {item.details}
                    </p>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <PrimaryButton
              onClick={() => {
                setUnlimitedMembershipMode('assign')
              }}
            >
              Switch to Unlimited Membership
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <AssignMembershipView
          setUnlimitedMembershipMode={setUnlimitedMembershipMode}
          type="fee-for-service"
        />
      )}
    </>
  )
}

export default UnlimitedBenefitsView
