const filterFields = (fields: string[]) => {
  return fields.map((field) => `fields[]=${field}`).join('&')
}

export default filterFields
