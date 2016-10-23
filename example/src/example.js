var React = require('react');
var ReactDOM = require('react-dom');
var DatePicker = require('react-dropdowns-datepicker');

var App = React.createClass({
	render () {
		return (
			<div>
				<DatePicker />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
