import analytics from './segment'

const openForm = (
  form: {
    url: string
    name: string
    hnField?: string
    airtableUrl: boolean
    url_sandbox: string
  },
  recId: string,
  matchUrl: string,
  member: any,
  user: any,
  hn: any
) => {
  analytics.track('Form Opened', {
    form_name: form.name,
    bene: recId,
  })
  const url =
    form.airtableUrl === false
      ? `${matchUrl}${form.url}?data=${encodeURIComponent(
          JSON.stringify({
            member: {
              'Full Name': member['Full Name'],
              'Antara ID': member['Antara ID'],
            },
            user: {
              email: user && user.email,
            },
          })
        )}`
      : `https://airtable.com/${
          process.env.PROD ? form.url : form.url_sandbox
        }?prefill_${form.hnField}=${hn['Record ID']}&prefill_Member=${recId}`
  window.open(url, form.name)
}

export default openForm
