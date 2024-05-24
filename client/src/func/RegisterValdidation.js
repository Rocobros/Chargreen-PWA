export default function validation(values) {
  let error

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
    error = 'El Nombre de ser entre 3 y 50 caracteres'
  } else if (isEmpty(values.ApellidoPaterno)) {
    error = 'Apellido Paterno vacío'
  } else if (!TEXT_PATTERN.test(values.ApellidoPaterno)) {
    error = 'El Apellido Paterno de ser entre 3 y 50 caracteres'
  } else if (isEmpty(values.ApellidoMaterno)) {
    error = 'Apellido materno vacío'
  } else if (!TEXT_PATTERN.test(values.ApellidoMaterno)) {
    error = 'El Apellido Materno de ser entre 3 y 50 caracteres'
  } else if (isEmpty(values.Celular)) {
    error = 'Celular vacío'
  } else if (!TEL_PATTERN.test(values.Celular)) {
    error = 'El celular debe ser de 10 dígitos'
  } else if (isEmpty(values.Correo)) {
    error = 'Correo electrónico vacío'
  } else if (!EMAIL_PATTERN.test(values.Correo)) {
    error = 'El Correo no tiene el formato correcto'
  } else if (isEmpty(values.Usuario)) {
    error = 'Nombre de usuario vacío'
  } else if (!USERNAME_PATTERN.test(values.Usuario)) {
    error = 'El usuario debe ser de 8 caracteres alfanumericos'
  } else if (isEmpty(values.Contrasena)) {
    error = 'Contraseña vacío'
  } else if (!PASSWORD_PATTERN.test(values.Contrasena)) {
    error = 'La Contrasena debe contener una mayuscula, 1 numero y 8 caracteres'
  } else if (isEmpty(values.Confirmacion)) {
    error = 'Confirmacion vacía'
  } else if (values.Contrasena !== values.Confirmacion) {
    error = 'Las contraseñas no coinciden'
  }

  return error
}
