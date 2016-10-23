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
	
	changeDate(e, type) {
		console.log(type);
		this.setState({
			[type]: e.target.value
		})
	}

	// changeDay(e) {
	// 	this.setState({
	// 		selectDay: e.target.value
	// 	})
	// 	// this.checkDate("day", this.state.selectDay)
	// }

	changeMonth(e) {
		// this.checkDate("month", this.state.selectMonth)
	}

	changeYear(e) {
		// this.checkDate("year", this.state.selectYear)
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
			return <option value={ day }>{ day }</option>
		})
		const monthElement = this.state.month.map((month, id) => {
			return <option value={ month }>{ month }</option>
		})
		const yearElement = this.state.year.map((year, id) => {
			return <option value={ year }>{ year }</option>
		})

		console.log(this.state.selectDay)

		return (
			<div>
				<select value={this.state.selectDay} onChange={(e) => this.changeDate(e, 'selectDay')}>
					{ dayElement }
				</select>
				<select value={this.state.selectMonth} onChange={(e) => this.changeMonth(e)}>
					{ monthElement }
				</select>
				<select value={this.state.selectYear} onChange={(e) => this.changeYear(e)}>
					{ yearElement }
				</select>
				<br />
				{ this.state.error ? <p>วันที่ไม่ถูกต้อง</p> : null }
			</div>
		)
	}
}