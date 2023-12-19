type AirtableField = {
  name: string
  type:
    | 'text'
    | 'single-select'
    | 'multi-select'
    | 'lookup'
    | 'number'
    | 'date'
    | 'long-text'
    | 'datetime'
    | 'search'
  options?: { label: string; value: string }[]
  lookupUrl?: string
  value?: any
  lookupFieldNames?: string[]
  calculated?: boolean
  disabled?: boolean
  helperText?: string
  tableId?: string
  condition?: (values: any) => boolean
  required?: boolean
}
export default AirtableField
