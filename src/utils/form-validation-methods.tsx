export const isPhoneValid = (phone: string) => {
  return /^\+\d{3}\d{9}$/.test(phone)
}

export const validatePhone = (value: string, required = true) => {
  let error
  if (!value && required) {
    error = 'Required'
  } else if (!isPhoneValid(value) && required) {
    error = 'Invalid phone number'
  }
  return error
}

export const isEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validateEmail = (value: string, required = false) => {
  let error
  if (!value && required) {
    error = 'Required'
  } else if (!isEmail(value) && required) {
    error = 'Invalid email address'
  }
  return error
}
