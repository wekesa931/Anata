const getAllowedFieldsUrl = (fields: string[]) => {
  const mappedFields = fields.map((field) => `fields[]=${field}`)
  return mappedFields.join('&')
}

export default getAllowedFieldsUrl
