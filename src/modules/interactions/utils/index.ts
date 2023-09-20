export const extractUsername = (email: string) => {
  return email.replace(/@.*$/, '')
}
