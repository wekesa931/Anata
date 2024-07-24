import TABLE_ROUTES from 'src/config/airtable-tables'
import { useAirtableMeta } from 'src/context/airtable-meta'
import { useMember } from 'src/context/member'
import useAntaraStaff from 'src/hooks/antara-staff.hook'
import airtableFetch from 'src/services/airtable/fetch'
import filterFields from 'src/utils/airtable'

type AirtableMetaTable = {
  id: string
  name: string
  primaryFieldName: string
  fieldId: string
  fields: {
    [key: string]: any
  }
  primaryFieldId: string
}

const TASK_DEFINITION_FIELD_ID =
  process.env.PROD === 'true' ? 'fldrJeu9BzF1p0thE' : 'fldwYDHowo9JFzkc7'
const MEMBERS_TABLE_ID =
  process.env.PROD === 'true' ? 'tblidCJtioaFSYwvk' : 'tblAjKAJOCIDk5Nco'
const TEAMS_FIELD_ID =
  process.env.PROD === 'true' ? 'tblHs6JxFnMGAjNNC' : 'tblZyeANbBkE2q4uG'

/**
 * To cut on global search request, this handler provides a method for each of the foreign keys that exist
 */
export const useForeignKeyDataHandler = () => {
  const { getStaffData } = useAntaraStaff()
  const { taskDefinitions } = useAirtableMeta()
  const { member } = useMember()

  const hasAMembersField = (fields: AirtableMetaTable['fields']) =>
    !!Object.values(fields).find(
      (o) => o?.options?.linkedTableId === MEMBERS_TABLE_ID
    )

  const getLinkedData = async (opts: AirtableMetaTable) => {
    // task definitions are loaded alongside airtable meta - exit early!
    if (TASK_DEFINITION_FIELD_ID === opts.fieldId) {
      return taskDefinitions.map((t: any) => ({
        ...t,
        name: t?.clinicalPrefferedName,
        id: t?.recordId,
      }))
    }

    // teams are loaded and stored in session storage
    if (TEAMS_FIELD_ID === opts.id) {
      return getStaffData()
    }

    // handles queries that have an antara id such as appointments
    // and general lookups such as Routine Labs
    // Also - lower bandwith by only loading the display field and id
    const constructFilterFormula = (
      tablePath: string,
      fields: string[],
      hasAntaraId: boolean = true
    ) => {
      let filterFormula = ''
      if (hasAntaraId) {
        filterFormula = `filterByFormula=FIND('${member?.antaraId}',{Antara ID})&`
      }

      return `${tablePath}/list?${filterFormula}${filterFields(fields)}`
    }

    const primaryField = opts.fields[opts.primaryFieldId]?.name
    const tablePath = TABLE_ROUTES[opts.name]

    const airtablePath = constructFilterFormula(
      tablePath,
      [primaryField, 'Record ID'],
      hasAMembersField(opts.fields)
    )
    const res = await airtableFetch(airtablePath)
    console.log(res)

    if (Array.isArray(res)) {
      return res.map((r) => ({
        name: r[primaryField],
        id: r?.['Record ID'],
      }))
    }

    throw new Error('Unable to load data from airtable')
  }

  return {
    getLinkedData,
  }
}
