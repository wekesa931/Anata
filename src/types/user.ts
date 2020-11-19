export type User = {
  accessToken: string
  email: string
  family_name: string
  given_name: string
  picture: string
  id_token: string
  token_type: any
  exp: number
} | null

export type hmp = {
  hmpSendDate: string | null
  hmpNumber: string | null
  hmpStatus: string | null
  hmpDay: number | null
  hmpLink: string | null
  hmpPhase: string | null
}
