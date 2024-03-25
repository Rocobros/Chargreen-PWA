export default function validation (values){
    let error = ''
    const TEXT_PATTERN = /^[a-zA-Z\u00f1\u00d1]{1,50}$/
    const TEL_PATTERN = /^[0-9]{10}$/
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const USERNAME_PATTERN = /^[a-zA-Z0-9\u00f1\u00d1]{8,}$/
    const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,}$/

    let a = new String(values.pass)
    let b = new String(values.conf)

    if(
    values.name === ''  ||
    values.apep === ''  || 
    values.apem === ''  || 
    values.tel === ''   || 
    values.email === '' || 
    values.user === ''  ||
    values.pass === ''  ||
    values.conf === '' 
    ){
        error = 'Campos vacios'
    }else if(!TEXT_PATTERN.test(values.name)){
        error = 'Campos no validos'
    }else if(!TEXT_PATTERN.test(values.apep)){
        error = 'Campos no validos'
    }else if(!TEXT_PATTERN.test(values.apem)){
        error = 'Campos no validos'
    }else if(!TEL_PATTERN.test(values.tel)){
        error = 'Campos no validos'
    }else if(!EMAIL_PATTERN.test(values.email)){
        error = 'Campos no validos'
    }else if(!USERNAME_PATTERN.test(values.user)){
        error = 'Campos no validos'
    }else if(!PASSWORD_PATTERN.test(values.pass)){
        error = 'Campos no validos'
    }else if(!(a.includes(b))){
        error = 'Contraseñas no coinciden'
    }else{
        error = ''
    }

    return error
}