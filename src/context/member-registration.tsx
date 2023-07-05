import React, { useEffect, useState } from 'react'
import useAntaraStaff, {
  mapAssigneeToLookup,
} from 'src/hooks/antara-staff.hook'
import { useGetLookupEntries } from 'src/modules/member/services/lookups'
import { LookupOption, LookupOptions } from 'src/modules/member/types'

type RegistrationFormContextType = {
  isFormOpen: boolean
  setIsFormOpen: (value: boolean) => void
  insuranceCompanies: LookupOption[]
  lookupOptions: LookupOptions
  isDataLoading: boolean
  antaraHNs: LookupOption[]
  antaraMEs: LookupOption[]
  antaraNutritionists: LookupOption[]
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
      isDataLoading: loading || isDataLoading,
      antaraHNs: mapAssigneeToLookup(antaraHNs),
      antaraMEs: mapAssigneeToLookup(antaraMEs),
      antaraNutritionists: mapAssigneeToLookup(antaraNutritionists),
    }),

    [
      isFormOpen,
      insuranceCompanies,
      lookupOptions,
      isDataLoading,
      loading,
      antaraMEs,
      antaraHNs,
      antaraNutritionists,
    ]
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
