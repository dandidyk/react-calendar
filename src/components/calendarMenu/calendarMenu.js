import React from 'react'
import './calendarMenu.css'

const CalendarMenu = ({setMonthBefore, setMonthToCurrent, setMonthAfter}) => {
    
    return (
        <div className='menu'>
            <button onClick={setMonthBefore}>
                Назад
            </button>
            <button onClick={setMonthToCurrent}>
                Текущий месяц
            </button>
            <button onClick={setMonthAfter}>
                Вперёд
            </button>
        </div>
    )
}

export default CalendarMenu