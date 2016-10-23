import React from 'react';
import moment from 'moment';

export default class DatePicker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			day: null,
			month: null,
			year: null,
			selectDay: props.mode === "TH" ? "วันที่" : "day",
			selectMonth: props.mode === "TH" ? "เดือน" : "month",
			selectYear: props.mode === "TH" ? "ปี" : "year",
		}
	}

	shouldComponentUpdate(_nextProps, nextState) {
    return this.state.selectDay !== nextState.selectDay || this.state.selectMonth !== nextState.selectMonth || this.state.selectYear !== nextState.selectYear
  }

	componentWillMount() {
		let day, month, year;
		if(this.props.mode === "TH") {
			day = ['วันที่'], month= ['เดือน'], year = ['ปี'];
		} else {
			day = ['day'], month = ['month'], year = ['year'];
		}

		for (let i=1; i<=31; i++) {
			day.push(i);
		}
		for (let i=1; i<=12; i++) {
			month.push(i);
		}

		let minYear = 1916;
		let maxYear = 2016;

		if(this.props.minYear && this.props.maxYear) {
			minYear = this.props.minYear;
			maxYear = this.props.maxYear;
		}

		for (let i=maxYear; i>=minYear; i--) {
			year.push(i);
		}

		this.setState({
			day: day,
			month: month,
			year: year
		});
	}
	
	changeDate(e, type) {
		this.setState({
			[type]: e.target.value
		});
		this.checkDate(e.target.value, type);
	}

	checkDate(value, type) {
		let { selectDay, selectMonth, selectYear } = this.state;

		if (type === 'selectDay') {
			selectDay = value;
		} else if (type === 'selectMonth') {
			selectMonth = value;
		} else if (type === 'selectYear') {
			selectYear = value;
		}

		if(this.isSelectedAllDropdowns(selectDay, selectMonth, selectYear)){
			this.props.dateChange( moment({ year :selectYear, month :selectMonth - 1, day :selectDay}).format() )
		}
	}

	isSelectedAllDropdowns(selectDay, selectMonth, selectYear) {
		return this.props.mode === "TH" 
			? selectDay !== "วันที่" && selectMonth !== "เดือน" && selectYear !== "ปี"
			: selectDay !== "day" && selectMonth !== "month" && selectYear !== "year"
	}

	render() {

		const dayElement = this.state.day.map((day, id) => {
			return <option value={ day } key={ id }>{ day }</option>
		})
		const monthElement = this.state.month.map((month, id) => {
			return <option value={ month } key={ id }>{ month }</option>
		})
		const yearElement = this.state.year.map((year, id) => {
			return <option value={ year } key={ id }>{ year }</option>
		})

		return (
			<div>
				<select value={this.state.selectDay} onChange={(e) => this.changeDate(e, 'selectDay')}>
					{ dayElement }
				</select>
				<select value={this.state.selectMonth} onChange={(e) => this.changeDate(e, 'selectMonth')}>
					{ monthElement }
				</select>
				<select value={this.state.selectYear} onChange={(e) => this.changeDate(e, 'selectYear')}>
					{ yearElement }
				</select>
			</div>
		)
	}
}