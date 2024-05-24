export default function validation(values) {
  let error

  const TEXT_PATTERN = /^[a-zA-Z\u00f1\u00d1]{3,50}$/
  const TEL_PATTERN = /^[0-9]{10}$/

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
  }

  return error
}
