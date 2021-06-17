import { CommsFetch } from './utils'

type MemberDetails = {
  antara_id: string
  member_phone: string
  receiver_phone: string
  full_name: string
  airtable_rec_id: string
}

export type AntaraSMS = {
  message: string
  antara_email: string
  member_details: MemberDetails[]
  sender_phone: string
  msg_type: string
}

const BASE_PATH = 'sms'

const fetchAllSMS = () => CommsFetch(`${BASE_PATH}`)

const fetchDistinctSMS = () => CommsFetch(`${BASE_PATH}/distinct`)

const fetchSMSByPhoneNumber = (phoneNumber: string) => {
  return CommsFetch(`${BASE_PATH}?phone_number=${phoneNumber}`)
}

const sendSMS = (sms: AntaraSMS) => {
  const body = JSON.stringify(sms)
  return CommsFetch(`${BASE_PATH}/`, 'POST', body)
}

const postFCMToken = (payload: { token: string; email: string }) => {
  const body = JSON.stringify(payload)
  return CommsFetch(`${BASE_PATH}/fcmToken/`, 'POST', body)
}

export {
  fetchAllSMS,
  fetchSMSByPhoneNumber,
  fetchDistinctSMS,
  sendSMS,
  postFCMToken,
}
