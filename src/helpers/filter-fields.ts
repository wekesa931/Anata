const filterFields = (fields: string[]) => {
  return fields
    .map((field) => encodeURIComponent(`fields[]=${field}`))
    .join('&')
}

export default filterFields
