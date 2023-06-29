import React, { useEffect, useState } from 'react'
import { useGetLookupEntries } from 'src/modules/member/services/lookups'
import { LookupOption, LookupOptions } from 'src/modules/member/types'

type RegistrationFormContextType = {
  isFormOpen: boolean
  setIsFormOpen: (value: boolean) => void
  insuranceCompanies: LookupOption[]
  lookupOptions: LookupOptions
  isDataLoading: boolean
}

const RegistrationFormContext =
  React.createContext<RegistrationFormContextType>({
    isFormOpen: false,
    setIsFormOpen: () => null,
    insuranceCompanies: [],
    lookupOptions: {} as LookupOptions,
    isDataLoading: false,
  })

function RegistrationFormProvider({ children }: { children: React.ReactNode }) {
  const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false)
  const { getInsuranceCompanies, getLookupEntries } = useGetLookupEntries()
  const [insuranceCompanies, setInsuranceCompanies] = useState<LookupOption[]>(
    []
  )
  const [lookupOptions, setLookupOptions] = useState<LookupOptions>(
    {} as LookupOptions
  )
  const [isDataLoading, setDataLoading] = useState<boolean>(false)

  useEffect(() => {
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
  }, [])
  // console.log(lookupOptions)

  const providerValue = React.useMemo(
    () => ({
      isFormOpen,
      setIsFormOpen,
      insuranceCompanies,
      lookupOptions,
      isDataLoading,
    }),

    [isFormOpen, insuranceCompanies, lookupOptions, isDataLoading]
  )

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
