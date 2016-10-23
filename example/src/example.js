import ReactDOM from'react-dom';
import React from 'react';
import DatePicker from'react-dropdowns-datepicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <Example />
  </MuiThemeProvider>
);

class Example extends React.Component {

	constructor() {
		super()
		this.state = {
			date: null,
		}
	}

	dateChange(date) {
		this.setState ({
			date: date
		})
	}

	render () {
		return (
			<div>
				<p>English</p>
				<DatePicker dateChange={ this.dateChange.bind(this) } />
				<p>Output : { this.state.date } </p>
				<br />
			</div>
		);
	}
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
