import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useAntaraStaff, {
  mapAssigneeToLookup,
} from 'src/hooks/antara-staff.hook'
import { useGetLookupEntries } from 'src/modules/member/services/lookups'
import { LookupOption, LookupOptions } from 'src/modules/member/types'
import { sortAlphabetically } from 'src/utils/sort'
import { useAuth } from './auth'

type RegistrationFormContextType = {
  isFormOpen: boolean
  setIsFormOpen: (value: boolean) => void
  insuranceCompanies: LookupOption[]
  lookupOptions: LookupOptions
  isDataLoading: boolean
  antaraHNs: LookupOption[]
  antaraMEs: LookupOption[]
  antaraNutritionists: LookupOption[]
  antaraPharmtechs: LookupOption[]
  member: any
  openFormWithParams: (value: boolean, params?: OpenFormParams) => void
  registrationContext: string | undefined
}

type OpenFormParams = {
  member?: any
  registrationForm?: string
}

const RegistrationFormContext =
  React.createContext<RegistrationFormContextType>({
    isFormOpen: false,
    setIsFormOpen: () => null,
    insuranceCompanies: [],
    lookupOptions: {} as LookupOptions,
    isDataLoading: false,
    antaraHNs: [],
    antaraMEs: [],
    antaraNutritionists: [],
    antaraPharmtechs: [],
    member: null,
    openFormWithParams: () => null,
    registrationContext: undefined,
  })

function RegistrationFormProvider({ children }: { children: React.ReactNode }) {
  const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false)
  /** hides primary member reg. option, if its dependent reg only */
  const [registrationContext, setRegistrationContext] = React.useState<
    string | undefined
  >(undefined)
  const { getInsuranceCompanies, getLookupEntries } = useGetLookupEntries()
  const [insuranceCompanies, setInsuranceCompanies] = useState<LookupOption[]>(
    []
  )
  const {
    antaraHNs,
    antaraMEs,
    loading,
    antaraNutritionists,
    antaraPharmtechs,
  } = useAntaraStaff()
  const [lookupOptions, setLookupOptions] = useState<LookupOptions>(
    {} as LookupOptions
  )
  const [isDataLoading, setDataLoading] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { isLoggedIn } = useAuth()

  const openRegistrationFromSearchParams = Boolean(
    searchParams.get('register') === 'true'
  )

  const toggleOpenForm = (isOpen: boolean, context?: undefined) => {
    setRegistrationContext(context)
    if (isOpen && !context) {
      setIsFormOpen(true)
      searchParams.set('register', 'true')
    } else if (isOpen && context) {
      setIsFormOpen(true)
      searchParams.set('register-dependent-only', 'true')
    } else {
      setIsFormOpen(false)
      searchParams.delete('register')
      searchParams.delete('registrationForm')
      searchParams.delete('register-dependent-only')
      setMember(null)
    }

    setSearchParams(searchParams)
  }

  const [member, setMember] = useState<any>(null)

  const openFormWithParams = (isOpen: boolean, params?: OpenFormParams) => {
    setMember(params?.member)
    if (params?.registrationForm) {
      searchParams.set('registrationForm', params?.registrationForm)
    }
    toggleOpenForm(isOpen)
  }

  useEffect(() => {
    if (openRegistrationFromSearchParams && !isFormOpen && !loading) {
      setIsFormOpen(true)
      return
    }

    setIsFormOpen(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openRegistrationFromSearchParams, loading])

  useEffect(() => {
    if (!isLoggedIn) return
    setDataLoading(true)
    Promise.all([getInsuranceCompanies(), getLookupEntries()])
      .then(([companies, options]) => {
        setInsuranceCompanies(companies)
        setLookupOptions(options)
      })
      .finally(() => {
        setDataLoading(false)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
  // console.log(lookupOptions)

  const providerValue = {
    isFormOpen,
    setIsFormOpen: toggleOpenForm,
    insuranceCompanies: sortAlphabetically(insuranceCompanies, 'label'),
    lookupOptions,
    isDataLoading: loading || isDataLoading,
    antaraHNs: mapAssigneeToLookup(antaraHNs),
    antaraMEs: mapAssigneeToLookup(antaraMEs),
    antaraNutritionists: mapAssigneeToLookup(antaraNutritionists),
    antaraPharmtechs: mapAssigneeToLookup(antaraPharmtechs),
    openFormWithParams,
    member,
    registrationContext,
  }

  return (
    <RegistrationFormContext.Provider value={providerValue}>
      {children}
    </RegistrationFormContext.Provider>
  )
}

function useRegistrationForm() {
  const context = React.useContext(RegistrationFormContext)
  if (context === undefined) {
    throw new Error(
      'useRegistrationForm must be used within a RegistrationFormProvider'
    )
  }
  return context
}

export { RegistrationFormProvider, useRegistrationForm }
