export default function validation(values) {
  let error = ''

  const TEXT_PATTERN = /^[a-zA-Z\u00f1\u00d1]{3,50}$/
  const TEL_PATTERN = /^[0-9]{10}$/
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const USERNAME_PATTERN = /^[a-zA-Z0-9\u00f1\u00d1]{8,}$/
  const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/

  // Helper function to check empty values
  const isEmpty = (value) => value.trim() === ''

  // Validate each field
  if (isEmpty(values.Nombre)) {
    error = 'Nombre vacío'
  } else if (!TEXT_PATTERN.test(values.Nombre)) {
    error = 'Nombre no válido'
  } else if (isEmpty(values.ApellidoPaterno)) {
    error = 'Apellido Paterno vacío'
  } else if (!TEXT_PATTERN.test(values.ApellidoPaterno)) {
    error = 'Apellido paterno no válido'
  } else if (isEmpty(values.ApellidoMaterno)) {
    error = 'Apellido materno vacío'
  } else if (!TEXT_PATTERN.test(values.ApellidoMaterno)) {
    error = 'Apellido materno no válido'
  } else if (isEmpty(values.Celular)) {
    error = 'Celular vacío'
  } else if (!TEL_PATTERN.test(values.Celular)) {
    error = 'Celular no válido'
  } else if (isEmpty(values.Correo)) {
    error = 'Correo electrónico vacío'
  } else if (!EMAIL_PATTERN.test(values.Correo)) {
    error = 'Correo electrónico no válido'
  }

  return error
}
