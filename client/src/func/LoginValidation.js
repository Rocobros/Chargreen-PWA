export default function validation (values){
    let error = ''
    const USERNAME_PATTERN = /^[a-zA-Z0-9]{8,}$/
    const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,}$/

    if(values.username === '' || values.password === ''){
        error = 'Usuario o Contraseña vacios'
    }else if(!USERNAME_PATTERN.test(values.username) || !PASSWORD_PATTERN.test(values.password)){
        error = 'Campos no validos'
    }else{
        error = ''
    }

    return error
}