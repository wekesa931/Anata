import React, { useState, useEffect } from 'react'
import type { Member } from 'src/modules/member/db/models'
import { useMembersData } from 'src/modules/member/hooks/member-data'
import FadeLoader from 'react-spinners/FadeLoader'
import FFSPricingView from './components/ffs-pricing'
import UnlimitedBenefitsView from './components/unlimited-benefits'
import UnlimitedServicesView from './components/unlimited-services'

type UnlimitedMembershipMode = 'benefits' | 'assign'
type PricingModalView = 'fee-for-service' | 'unlimited'

type SubscriptionProps = {
  member: Member | null
}

export function SubscriptionServiceLayout({ member }: SubscriptionProps) {
  const [pricingModalView, setPricingModalView] =
    useState<PricingModalView>('fee-for-service')
  const [unlimitedMembershipMode, setUnlimitedMembershipMode] =
    useState<UnlimitedMembershipMode>('benefits')

  const [loadingCohorts, setLoadingCohorts] = useState(true)
  const [availableCohorts, setAvailableCohorts] = useState([])

  const { prospectiveMemberCohorts } = useMembersData()

  const fetchMemberCohorts = async (antaraId: any) => {
    const request = await prospectiveMemberCohorts(antaraId)
    setAvailableCohorts(request)
    setLoadingCohorts(false)
  }

  useEffect(() => {
    if (member) {
      setLoadingCohorts(true)
      fetchMemberCohorts(member?.antaraId)
    }

    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member])

  return (
    <section className="p-4">
      <UnlimitedServicesView
              availableCohorts={availableCohorts}
              setUnlimitedMembershipMode={setUnlimitedMembershipMode}
              unlimitedMembershipMode={unlimitedMembershipMode}
            />
    </section>
  )
}
