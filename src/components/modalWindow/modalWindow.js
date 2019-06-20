import React from 'react'
import './modalWindow.css'

const ModalWindow = ({ handleCancel, handleSave, handleCangeTask }) => {
    return (
        <div className='modal'>
            <input placeholder="input task" onChange={e => handleCangeTask(e.target.value) } />
            <button onClick={handleSave}>
                Сохранить
            </button>
            <button onClick={handleCancel}>
                Отмена
            </button>
        </div>
    )
}

export default ModalWindow