import React from 'react';


export default class DatePicker extends React.Component {
	constructor() {
		super()
		this.state = {
			day: null,
			month: null,
			year: null,
			selectDay: "วันที่",
			selectMonth: "เดือน",
			selectYear: "ปี",
			error: false
		}
	}

	shouldComponentUpdate(_nextProps, nextState) {
    	return this.state.selectDay !== nextState.selectDay || this.state.selectMonth !== nextState.selectMonth || this.state.selectYear !== nextState.selectYear
  }

	componentWillMount() {
		var day = [], month = [], year = []
		for (var i=1; i<=31; i++) {
			day.push(i)
		}
		for (var i=1; i<=12; i++) {
			month.push(i)
		}
		for (var i=2016; i>=1916; i--) {
			year.push(i)
		}
		this.setState({
			day: day,
			month: month,
			year: year
		})
	}
	
	changeDay(day) {
		this.checkDate("day", day)
	}

	changeMonth(month) {
		this.checkDate("month", month)
	}

	changeYear(year) {
		this.checkDate("year", year)
	}

	checkDate(key, value) {

		let day = this.state.selectDay
		let month = this.state.selectMonth
		let year = this.state.selectYear

		if(key === "day") {
			day = value
		}
		else if (key === "month") {
			month = value
		}
		else if (key === "year") {
			year = value
		}
		if(day !== "วันที่" && month !== "เดือน" && year !== "ปี"){
			let dayStr, monthStr
			if(day < 10){
				dayStr = "0" + day.toString()
			}
			else {
				dayStr = day.toString()
			}
			if(month < 10){
				monthStr = "0" + month.toString()
			}
			else {
				monthStr = month.toString()
			}
			let date = dayStr + "." + monthStr + "." + year.toString()
			let pattern = /(\d{2})\.(\d{2})\.(\d{4})/
			let dt = new Date(date.replace(pattern,'$3-$2-$1'))
			if(!isNaN(dt)) {
				this.setState({
					error: false,
					selectDay: day,
					selectMonth: month,
					selectYear: year,
				})
				this.props.dateChange(dt)
			}
			else {
				this.setState({
					error: true,
					selectDay: day,
					selectMonth: month,
					selectYear: year,
				})
			}
		}
		else {
			this.setState({
				selectDay: day,
				selectMonth: month,
				selectYear: year
			})
		}
	}

	render() {

		const dayElement = this.state.day.map((day, id) => {
			return <option onClick={() => this.changeDay(day)}>{ day }</option>
		})
		const monthElement = this.state.month.map((month, id) => {
			return <option onClick={() => this.changeMonth(month)}>{ month }</option>
		})
		const yearElement = this.state.year.map((year, id) => {
			return <option onClick={() => this.changeYear(year)}>{ year }</option>
		})

		return (
			<div>
				<select title={this.state.selectDay}>
					{ dayElement }
				</select>
				<select title={this.state.selectMonth}>
					{ monthElement }
				</select>
				<select title={this.state.selectYear}>
					{ yearElement }
				</select>
				<br />
				{ this.state.error ? <p>วันที่ไม่ถูกต้อง</p> : null }
			</div>
		)
	}
}