export default function validation(values) {
  let error = ''
  const USERNAME_PATTERN = /^[a-zA-Z0-9]{8,}$/
  const PASSWORD_PATTERN =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,}$/

  if (values.username === '') {
    error = 'Usuario vacio'
  } else if (values.password === '') {
    error = 'Contraseña vacia'
  } else if (!USERNAME_PATTERN.test(values.username)) {
    error = 'Formato de Usuario incorrecto'
  } else if (!PASSWORD_PATTERN.test(values.password)) {
    error = 'Formato de Contraseña incorrecto'
  }

  return error
}
