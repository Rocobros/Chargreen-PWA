export default function validation (values){
    let error = ''
    const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,}$/

    let pass = new String(values.password)
    let conf = new String(values.confirmation)

    if(!PASSWORD_PATTERN.test(values.password)){
        error = 'Campos no validos'
    } else if(!(pass.includes(conf))){
        error = 'Las contraseñas no coinciden'
    } else{
        error = ''
    }

    return error
}