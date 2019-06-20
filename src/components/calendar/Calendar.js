import React, { Component } from 'react'

import moment from 'moment'
import CalendarMonth from '../calendarMonth'
import './calendar.css'
import ModalWindow from '../modalWindow';
import CalendarMenu from '../calendarMenu'

export default class Calendar extends Component {

    state = {
        year: null,
        activeElement: null,
        daySelected: false,
        task: '',
        activeMonth: null
    }



    componentDidMount() {
        this.setState({
            year: this.renderYear(),
            activeMonth: new Date().getMonth()
        })
    }

    renderYear = () => {

        const year = [
            { month: 'January', days: [] },
            { month: 'February', days: [] },
            { month: 'March', days: [] },
            { month: 'April', days: [] },
            { month: 'May', days: [] },
            { month: 'June', days: [] },
            { month: 'July', days: [] },
            { month: 'August', days: [] },
            { month: 'September', days: [] },
            { month: 'October', days: [] },
            { month: 'Novenber', days: [] },
            { month: 'December', days: [] },
        ];

        return year.map((item, idx) => {
            const today = new Date()
            today.setMonth(idx);

            const daysInMonth = moment(today).daysInMonth();
            const days = [];

            for (let i = 1; i <= daysInMonth; i++) {
                days.push({
                    dayNumber: i,
                    tasks: []
                })
            }

            return {
                ...item,
                days
            }

        })
    }

    handleDay = (selectedMonth, dayNumber) => {
        this.setState({
            activeElement: {
                selectedMonth,
                dayNumber
            },
            daySelected: true
        })
    }

    handleCancel = () => this.setState({ daySelected: false })

    handleSave = () => {
        this.setState(({ year, activeElement, task }) => {
            const  { selectedMonth, dayNumber} = activeElement

            const monthIdx = year.findIndex(({ month }) => selectedMonth === month);
            
            const changedMonth = { ...year[monthIdx]};
            
            changedMonth.days[dayNumber - 1].tasks.push(task);


            return {
                year: [ 
                    ...year.slice(0, monthIdx),
                    changedMonth,
                    ...year.slice(monthIdx+1)
                ],
                daySelected: false,
                activeElement: null
            }
        })

    }

    handleCangeTask = value => this.setState({ task: value })


    //понимаю что можно было лучше написать 

    setMonthBefore = () => {
        this.setState( ({ activeMonth }) => {
            if ( activeMonth === 0) return { activeMonth: 0} ;
            return { activeMonth: activeMonth - 1} 
        })
    }

    setMonthAfter = () => {
        this.setState( ({ activeMonth }) => {
            if ( activeMonth === 11) return { activeMonth: 11} ;
            return { activeMonth: activeMonth + 1} 
        })
    }

    setMonthToCurrent = () => {
        this.setState( ({ activeMonth }) => {
            return { activeMonth: new Date().getMonth()} 
        })
    }

    render() {

        const { year, daySelected, activeMonth } = this.state

        if (!year  ) return null

        return (
            <div className='calendar' >
                <h1>Calendar</h1>
                <CalendarMenu
                    setMonthToCurrent={this.setMonthToCurrent}
                    setMonthBefore={this.setMonthBefore}
                    setMonthAfter={this.setMonthAfter} />
                <CalendarMonth handleDay={this.handleDay} data={year[activeMonth]} />
                {daySelected ? <ModalWindow
                    handleCancel={this.handleCancel}
                    handleSave={this.handleSave}
                    handleCangeTask={this.handleCangeTask}
                /> : null}
            </div>
        )
    }
}
