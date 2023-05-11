import airtableFetch from 'src/services/airtable/fetch'
import TABLE_ROUTES from 'src/config/airtable-tables'

// http://localhost:5000/member/recGFgrsOkCpJD4n1?action=forms&formIds=recU9mj0q9DXvr4mZ&formName=HMP

export const useGetAirtableRecord = () => {
  const getAirtableRecord = (formId: string, formName: string) => {
    const url = `${TABLE_ROUTES[formName]}/${formId}`
    return airtableFetch(url)
  }

  return {
    getAirtableRecord,
  }
}

export default useGetAirtableRecord
