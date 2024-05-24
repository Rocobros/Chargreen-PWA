import React from 'react'

const Switch = ({ isOn, handleToggle }) => {
  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
					name='Notificaciones'
          checked={isOn}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full shadow-inner"></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow transform transition ${
            isOn ? 'translate-x-full bg-blue-500' : ''
          }`}
        ></div>
      </label>
    </div>
  )
}

export default Switch
