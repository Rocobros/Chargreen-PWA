import React from 'react'

const Tarjeta = ({
  title,
  date,
  image,
  description,
  link,
  isExpanded,
  onClick,
}) => {
  return (
    <div
      className="bg-secondary w-full sm:w-96 rounded-lg shadow-lg p-4 cursor-pointer transition-all duration-500 mb-4"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">{date}</p>
      </div>
      <div
        className={`transition-all duration-500 ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        } overflow-hidden`}
      >
        {isExpanded && (
          <div className="mt-4 overflow-y-auto max-h-64">
            {image && (
              <img
                className="w-auto h-auto object-cover rounded-lg"
                src={image}
                alt={title}
              />
            )}
            <p className="mt-2 text-lg">{description}</p>
            {link && (
              <p className="mt-2 text-lg">
                Puedes leer mas acerca del tema.{' '}
                <a
                  className="font-bold text-text"
                  href={link}
                >
                  Ir a la nota
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tarjeta
