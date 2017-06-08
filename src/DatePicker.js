import React from 'react';
import moment from 'moment';

export default class DatePicker extends React.Component {
	constructor(props) {
		super(props)
		let { dayLabel, monthLabel, yearLabel } = props;

		dayLabel = dayLabel || "day";
		monthLabel = monthLabel || "month";
		yearLabel = yearLabel || "year";

		this.state = {
			day: null,
			month: null,
			year: null,
			selectDay: props.mode === "TH" ? "วันที่" : dayLabel,
			selectMonth: props.mode === "TH" ? "เดือน" :monthLabel,
			selectYear: props.mode === "TH" ? "ปี" : yearLabel,
		}
	}

	shouldComponentUpdate(_nextProps, nextState) {
		return this.state.selectDay !== nextState.selectDay || this.state.selectMonth !== nextState.selectMonth || this.state.selectYear !== nextState.selectYear
	}

	componentWillMount() {
		let day, month, year;
		if (this.props.mode === "TH") {
			day = ['วันที่'], month= [{ text: 'เดือน', value: 'เดือน'}], year = ['ปี'];
		} else {
			day = [this.props.dayLabel], month = [{ text: this.props.monthLabel, value: this.props.monthLabel}], year = [this.props.yearLabel];
		}

		for (let i=1; i<=31; i++) {
			day.push(i);
		}

		let monthIndex = 1;
		for (const monthName of moment.localeData().months()) {
			month.push({
				text: this.props.useMonthNames ? monthName : monthIndex,
				value: monthIndex
			});
			monthIndex++;
		}

		for (let i=1; i<=12; i++) {
			month.push(i);
		}

		let minYear = 1916;
		let maxYear = 2016;

		if (this.props.minYear && this.props.maxYear) {
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
			: selectDay !== this.props.dayLabel && selectMonth !== this.props.monthLabel && selectYear !== this.props.yearLabel
	}

	render() {

		const dayElement = this.state.day.map((day, id) => {
			return <option value={ day } key={ id }>{ day }</option>
		})
		const monthElement = this.state.month.map((month, id) => {
			return <option value={ month.value } key={ id }>{ month.text }</option>
		})
		const yearElement = this.state.year.map((year, id) => {
			return <option value={ year } key={ id }>{ year }</option>
		})

		return (
			<div>
				<select {...props} value={this.state.selectDay} onChange={(e) => this.changeDate(e, 'selectDay')}>
					{ dayElement }
				</select>
				<select {...props} value={this.state.selectMonth} onChange={(e) => this.changeDate(e, 'selectMonth')}>
					{ monthElement }
				</select>
				<select {...props} value={this.state.selectYear} onChange={(e) => this.changeDate(e, 'selectYear')}>
					{ yearElement }
				</select>
			</div>
		)
	}
}
