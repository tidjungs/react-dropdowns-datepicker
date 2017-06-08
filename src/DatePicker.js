import React from 'react';
import moment from 'moment';

export default class DatePicker extends React.Component {
	constructor(props) {
		super(props);
		let { dayLabel, monthLabel, yearLabel } = props;

		this.state = {
			day: null,
			month: null,
			year: null,
			selectDay: props.mode === 'TH' ? 'วันที่' : dayLabel,
			selectMonth: props.mode === 'TH' ? 'เดือน' :monthLabel,
			selectYear: props.mode === 'TH' ? 'ปี' : yearLabel,
		};
	}

	shouldComponentUpdate(_nextProps, nextState) {
		return this.state.selectDay !== nextState.selectDay || this.state.selectMonth !== nextState.selectMonth || this.state.selectYear !== nextState.selectYear;
	}

	componentWillMount() {
		let day = [], month = [], year = [];

		const pad = (n) => {
			return (n < 10 ? '0' + n : n );
		};

		for (let i=1; i<=31; i++) {
			day.push(this.props.padDay ? pad(i) : i);
		}

		let monthIndex = 1;
		for (const monthName of moment.localeData().months()) {
			month.push({
				text: this.props.useMonthNames ? monthName : this.props.padMonth ? pad(monthIndex) : monthIndex,
				value: monthIndex
			});
			monthIndex++;
		}

		for (let i=this.props.maxYear; i>=this.props.minYear; i--) {
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

		if (this.isSelectedAllDropdowns(selectDay, selectMonth, selectYear)) {
			this.props.dateChange( moment({ year :selectYear, month :selectMonth - 1, day :selectDay}).format() );
		}
	}

	isSelectedAllDropdowns(selectDay, selectMonth, selectYear) {
		return this.props.mode === 'TH' 
			? selectDay !== 'วันที่' && selectMonth !== 'เดือน' && selectYear !== 'ปี'
			: (selectDay !== this.props.dayLabel) && (selectMonth !== this.props.monthLabel) && (selectYear !== this.props.yearLabel);
	}

	render() {
		const dayElement = this.state.day.map((day, id) => {
			return <option value={ day } key={ id }>{ day }</option>;
		});
		const monthElement = this.state.month.map((month, id) => {
			return <option value={ month.value } key={ id }>{ month.text }</option>;
		});
		const yearElement = this.state.year.map((year, id) => {
			return <option value={ year } key={ id }>{ year }</option>;
		});

		return (
			<div>
				<select defaultValue="" className={this.props.className} value={this.state.selectDay} onChange={(e) => this.changeDate(e, 'selectDay')}>
					<option value="">{this.props.mode === 'TH' ? 'วันที่' : this.props.dayLabel}</option>
					{ dayElement }
				</select>
				<select defaultValue="" className={this.props.className} value={this.state.selectMonth} onChange={(e) => this.changeDate(e, 'selectMonth')}>
					<option value="">{this.props.mode === 'TH' ? 'เดือน' : this.props.monthLabel}</option>
					{ monthElement }
				</select>
				<select defaultValue="" className={this.props.className} value={this.state.selectYear} onChange={(e) => this.changeDate(e, 'selectYear')}>
					<option value="">{this.props.mode === 'TH' ? 'ปี' : this.props.yearLabel}</option>
					{ yearElement }
				</select>
			</div>
		);
	}
}

DatePicker.propTypes = {
	className: React.PropTypes.string,
	dateChange: React.PropTypes.func,
	dayLabel: React.PropTypes.string,
	maxYear: React.PropTypes.number,
	minYear: React.PropTypes.number,
	mode: React.PropTypes.string,
	monthLabel: React.PropTypes.string,
	padDay: React.PropTypes.bool,
	padMonth: React.PropTypes.bool,
	selectDay: React.PropTypes.string,
	selectMonth: React.PropTypes.string,
	selectYear: React.PropTypes.string,
	useMonthNames: React.PropTypes.bool,
	yearLabel: React.PropTypes.string
};

DatePicker.defaultProps = {
	dayLabel: 'day',
	minYear: 1916,
	maxYear: 2016,
	monthLabel: 'month',
	padDay: false,
	padMonth: false,
	selectDay: '',
	selectMonth: '',
	selectYear: '',
	yearLabel: 'year',
	useMonthNames: false
};
