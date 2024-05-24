import React from 'react'

const Tarjeta = ({ title, date, image, description, isExpanded, onClick }) => {
  return (
    <div
      className="border w-full sm:w-96 rounded-lg shadow-lg p-4 cursor-pointer transition-all duration-2000"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">{date}</p>
      </div>
      <div
        className={`overflow-hidden transition-all duration-2000 ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {isExpanded && (
          <div className="mt-4">
            <img
              className="w-full h-64 object-cover rounded-lg"
              src={image}
              alt={title}
            />
            <p className="mt-2 text-lg">{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tarjeta
