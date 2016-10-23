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
				<DatePicker dateChange={ this.dateChange.bind(this) } mode="EN"/>
				<p>Output : { this.state.date } </p>
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));
