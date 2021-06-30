const formatDate = (value: string) => {
  const date = new Date(value)
  const day = date.toLocaleString('default', { day: '2-digit' })
  const month = date.toLocaleString('default', { month: '2-digit' })
  const year = date.toLocaleString('default', { year: 'numeric' })
  return `${day}-${month}-${year}, ${date.toLocaleTimeString('en-US')}`
}

export default formatDate
