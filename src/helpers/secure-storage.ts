import SecureLS from 'secure-ls'

const ls = new SecureLS({
  encodingType: 'des',
  encryptionSecret: '@antarahealth',
})

export default ls
