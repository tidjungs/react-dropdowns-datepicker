import React from 'react';
import ReactDOM from'react-dom';
import DatePicker from'react-dropdowns-datepicker';

class App extends React.Component {

	constructor() {
		super()
		this.state = {
			date: null
		}
	}

	dateChange(date) {
		console.log(date);
		this.setState ({
			date: date
		})
	}

	render () {
		return (
			<div>
				<p>วันเกิด { this.state.date } </p>
				<DatePicker dateChange={ () => this.dateChange() } />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));
