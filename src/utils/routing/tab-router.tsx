import React from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'

export function withTabRouter(
  Component: any,
  viewKey: string,
  defaultView: string
) {
  return function TabRouter(props: any) {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    const handleChange = (event: any, newValue: string) => {
      searchParams.set(viewKey, newValue)
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      })
    }

    return (
      <Component
        {...props}
        view={searchParams.get(viewKey) || defaultView}
        handleChange={handleChange}
      />
    )
  }
}

export default withTabRouter
