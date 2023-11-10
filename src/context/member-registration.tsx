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
  member: any
  openFormWithParams: (value: boolean, params?: OpenFormParams) => void
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
    member: null,
    openFormWithParams: () => null,
  })

function RegistrationFormProvider({ children }: { children: React.ReactNode }) {
  const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false)
  const { getInsuranceCompanies, getLookupEntries } = useGetLookupEntries()
  const [insuranceCompanies, setInsuranceCompanies] = useState<LookupOption[]>(
    []
  )
  const { antaraHNs, antaraMEs, loading, antaraNutritionists } =
    useAntaraStaff()
  const [lookupOptions, setLookupOptions] = useState<LookupOptions>(
    {} as LookupOptions
  )
  const [isDataLoading, setDataLoading] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { isLoggedIn } = useAuth()

  const openRegistrationFromSearchParams = Boolean(
    searchParams.get('register') === 'true'
  )

  const toggleOpenForm = (isOpen: boolean) => {
    if (isOpen) {
      setIsFormOpen(true)
      searchParams.set('register', 'true')
    } else {
      setIsFormOpen(false)
      searchParams.delete('register')
      searchParams.delete('registrationForm')
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
    }

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
    openFormWithParams,
    member,
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
