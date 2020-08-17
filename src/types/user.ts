export type User = {
  Ea: string
  Qt: any
  accessToken: string
  googleId: string
  profileObj: {
    googleId: string
    email: string
    familyName: string
    givenName: string
    imageUrl: string
  }
  tokenId: string
  tokenObj: any
  wc: any
} | null

export type hmp = {
  hmpSendDate: string | null
  hmpNumber: string | null
  hmpStatus: string | null
  hmpDay: number | null
  hmpLink: string | null
  hmpPhase: string | null
}
