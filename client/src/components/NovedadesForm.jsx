import React from 'react'

const infoFields = [
  {
    id: 1,
    type: 'text',
    name: 'Titulo',
    placeholder: 'Titulo',
  },
  {
    id: 2,
    type: 'text',
    name: 'Descripcion',
    placeholder: 'Descripcion',
  },
  {
    id: 3,
    type: 'text',
    name: 'Imagen',
    placeholder: 'Imagen',
  },
]

const NovedadesForm = () => {
  const [userInfo, setUserInfo] = useState({
    Titulo: '',
    Descripcion: '',
    Imagen: '',
    UsuarioModerador: 0,
  })

  const navigate = useNavigate()

  return <div>NovedadesForm</div>
}

export default NovedadesForm
