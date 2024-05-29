export default function validation(values) {
  let error

  const TITLE_PATTERN = /^[\w\W]{1,50}$/
  const DESC_PATTERN = /^[\w\W]{1,300}$/
  const IMG_PATTERN = /^https?:\/\/.*\.(png|jpg)$/
  const LINK_PATTERN = /^https?:\/\/.*$/

  // Helper function to check empty values
  const isEmpty = (value) => value.trim() === ''

  // Validate each field
  if (isEmpty(values.Titulo)) {
    error = 'Titulo vacío'
  } else if (!TITLE_PATTERN.test(values.Titulo)) {
    error = 'El Titulo no coincide'
  } else if (isEmpty(values.Descripcion)) {
    error = 'Descripcion vacío'
  } else if (!DESC_PATTERN.test(values.Descripcion)) {
    error = 'La descripcion no coincide'
  } else if (isEmpty(values.Imagen)) {
    error = 'Imagen vacia'
  } else if (!IMG_PATTERN.test(values.Imagen)) {
    error = 'La imagen no coincide'
  } else if (isEmpty(values.Link)) {
    error = 'Link vacío'
  } else if (!LINK_PATTERN.test(values.Link)) {
    error = 'El link no coincide'
  }

  return error
}
