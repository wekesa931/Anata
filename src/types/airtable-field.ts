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
  options?: { label: string; value: string }[]
  lookupUrl?: string
  value?: any
  lookupFieldNames?: string[]
  calculated?: boolean
}
export default AirtableField
