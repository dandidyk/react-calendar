import React from 'react';
import './calendar-month.css'

const CalendarMonth = ({ data, handleDay }) => {

    const { month, days } = data

    const renderTasks = tasks => (
        <ul>
            {tasks.map((task, idx) => <li key={task + idx}>{task}</li>)}
        </ul>
    )

    const renderedMonth = days.map(({ dayNumber, tasks }) => (
        <li key={dayNumber} onClick={() => handleDay(month, dayNumber)}>
            <p> {dayNumber} </p>
            {renderTasks(tasks)}
        </li>
    ))

    return (
        <div className='month'>
            <h2>Current Month: {month}</h2>
            <ul className='month-list' >
                {renderedMonth}
            </ul>
        </div>
    )
}

export default CalendarMonth