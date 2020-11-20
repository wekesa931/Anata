import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const showSuccessNotification = (
  text = 'Your changes have been saved.',
  timer = 5000
) => {
  MySwal.fire({
    position: 'top-right',
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer,
    toast: true,
  })
}

const showErrorNotification = (
  text = 'An error occurred while trying to save, please retry.',
  timer = 5000
) => {
  MySwal.fire({
    position: 'top-right',
    icon: 'error',
    title: text,
    showConfirmButton: false,
    timer,
    toast: true,
  })
}

const showSuccessConfirmationDialog = async (
  title: string,
  confirmButtonText: string,
  denyButtonText: string,
  onDeny?: () => any,
  onConfirm?: () => any
) => {
  const result = await MySwal.fire({
    title,
    icon: 'success',
    confirmButtonText,
    denyButtonText,
    showCancelButton: false,
    showDenyButton: true,
    allowOutsideClick: false,
  })
  if (result.isDenied && onDeny) {
    return onDeny()
  }
  if (result.isConfirmed && onConfirm) {
    return onConfirm()
  }
  return null
}

export default {
  showSuccessNotification,
  showErrorNotification,
  showSuccessConfirmationDialog,
}
