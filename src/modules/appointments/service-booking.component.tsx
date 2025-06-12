import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import React from 'react'
import { useMember } from 'src/context/member'
import { ServicePricingType } from '../member/types'
import { useAppointmentsApi } from './services/appointments.api'
import SmartServiceCharge from './smart-verification/smart-service-booking-flow'
import { formatCurrency } from '../member/utils'

function ServiceBooking({ onBackPress }: { onBackPress: () => void }) {
  const { member } = useMember()
  const { openCalendar } = useAppointmentsApi()
  const [selectedService, setSelectedService] =
    React.useState<ServicePricingType | null>(null)
  const services: ServicePricingType[] =
    member?.activeBillingPackageEnrollment?.billingSchemeSubscription
      ?.billingScheme?.servicePricing || []
  const servicesWithBookingUrl = services.filter(
    (service) =>
      service?.service?.bookingUrl && service?.service?.initials !== 'MDL'
  )
  const onServiceSelect = (service: ServicePricingType) => {
    if (
      member?.isMemberBilledThroughSmart &&
      !member?.isUnlimitedMembershipMember
    ) {
      setSelectedService(service)
    } else {
      openCalendar(service?.service?.bookingUrl)
    }
  }
  const generateColor = () => {
    let randomColorString = '#'
    const arrayOfColorFunctions = '0123456789abcdef'
    for (let x = 0; x < 6; x += 1) {
      const index = Math.floor(Math.random() * 16)
      const value = arrayOfColorFunctions[index]

      randomColorString += value
    }
    return randomColorString
  }

  let Content = (
    <>
      <p className="text-dark-blue-100 font-medium text-base font-rubik">
        What kind of appointment would you like to book?
      </p>
      <p className="text-dark-blue-50 py-2 font-normal text-sm font-rubik">
        Select one
      </p>
      {servicesWithBookingUrl?.map((service: any, key: number) => (
        <div
          role="presentation"
          className="h-14 cursor-pointer rounded-lg flex border mb-2 hover:cursor-pointer"
          key={key}
          onClick={onServiceSelect.bind(null, service)}
          onKeyDown={onServiceSelect.bind(null, service)}
        >
          <div
            style={{
              backgroundColor: generateColor(),
            }}
            className="rounded-l-lg	w-3 border-0 rounded-l"
          />
          <div className="w-3/4 content-center pl-4 flex-1 content-center">
            <p className="text-sm font-normal font-rubik">
              {service?.service?.name}
            </p>
          </div>
          <div className="w-1/4 pr-2 content-center flex-none">
            <p className="text-end text-sm font-normal font-rubik break-words whitespace-normal">
              {formatCurrency(service?.price, '')}
            </p>
          </div>
        </div>
      ))}
    </>
  )
  if (selectedService) {
    Content = (
      <SmartServiceCharge
        selectedService={selectedService}
        cancelSmartBilling={() => setSelectedService(null)}
      />
    )
  }
  return (
    <div>
      <div
        role="presentation"
        className="cursor-pointer mb-2.5 flex content-center items-center"
        onClick={onBackPress}
        onKeyDown={onBackPress}
      >
        {!selectedService && (
          <>
            <ChevronLeftOutlinedIcon className="text-dark-blue-20" />
            <p className="font-rubik text-sm capitalize text-dark-blue-70">
              Back
            </p>{' '}
          </>
        )}
      </div>
      {Content}
    </div>
  )
}

export default ServiceBooking
