'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var DatePicker = (function (_React$Component) {
	_inherits(DatePicker, _React$Component);

	function DatePicker(props) {
		_classCallCheck(this, DatePicker);

		_get(Object.getPrototypeOf(DatePicker.prototype), 'constructor', this).call(this, props);
		var dayLabel = props.dayLabel;
		var monthLabel = props.monthLabel;
		var yearLabel = props.yearLabel;

		dayLabel = dayLabel || "day";
		monthLabel = monthLabel || "month";
		yearLabel = yearLabel || "year";

		this.state = {
			day: null,
			month: null,
			year: null,
			selectDay: props.mode === "TH" ? "วันที่" : dayLabel,
			selectMonth: props.mode === "TH" ? "เดือน" : monthLabel,
			selectYear: props.mode === "TH" ? "ปี" : yearLabel
		};
	}

	_createClass(DatePicker, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(_nextProps, nextState) {
			return this.state.selectDay !== nextState.selectDay || this.state.selectMonth !== nextState.selectMonth || this.state.selectYear !== nextState.selectYear;
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var day = undefined,
			    month = undefined,
			    year = undefined;
			if (this.props.mode === "TH") {
				day = ['วันที่'], month = [{ text: 'เดือน', value: 'เดือน' }], year = ['ปี'];
			} else {
				day = [this.props.dayLabel], month = [{ text: this.props.monthLabel, value: this.props.monthLabel }], year = [this.props.yearLabel];
			}

			for (var i = 1; i <= 31; i++) {
				day.push(i);
			}

			var monthIndex = 1;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = _moment2['default'].localeData().months()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var monthName = _step.value;

					month.push({
						text: this.props.useMonthNames ? monthName : index,
						value: monthIndex
					});
					monthIndex++;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			for (var i = 1; i <= 12; i++) {
				month.push(i);
			}

			var minYear = 1916;
			var maxYear = 2016;

			if (this.props.minYear && this.props.maxYear) {
				minYear = this.props.minYear;
				maxYear = this.props.maxYear;
			}

			for (var i = maxYear; i >= minYear; i--) {
				year.push(i);
			}

			this.setState({
				day: day,
				month: month,
				year: year
			});
		}
	}, {
		key: 'changeDate',
		value: function changeDate(e, type) {
			this.setState(_defineProperty({}, type, e.target.value));
			this.checkDate(e.target.value, type);
		}
	}, {
		key: 'checkDate',
		value: function checkDate(value, type) {
			var _state = this.state;
			var selectDay = _state.selectDay;
			var selectMonth = _state.selectMonth;
			var selectYear = _state.selectYear;

			if (type === 'selectDay') {
				selectDay = value;
			} else if (type === 'selectMonth') {
				selectMonth = value;
			} else if (type === 'selectYear') {
				selectYear = value;
			}

			if (this.isSelectedAllDropdowns(selectDay, selectMonth, selectYear)) {
				this.props.dateChange((0, _moment2['default'])({ year: selectYear, month: selectMonth - 1, day: selectDay }).format());
			}
		}
	}, {
		key: 'isSelectedAllDropdowns',
		value: function isSelectedAllDropdowns(selectDay, selectMonth, selectYear) {
			return this.props.mode === "TH" ? selectDay !== "วันที่" && selectMonth !== "เดือน" && selectYear !== "ปี" : selectDay !== this.props.dayLabel && selectMonth !== this.props.monthLabel && selectYear !== this.props.yearLabel;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			var dayElement = this.state.day.map(function (day, id) {
				return _react2['default'].createElement(
					'option',
					{ value: day, key: id },
					day
				);
			});
			var monthElement = this.state.month.map(function (month, id) {
				return _react2['default'].createElement(
					'option',
					{ value: month.value, key: id },
					month.text
				);
			});
			var yearElement = this.state.year.map(function (year, id) {
				return _react2['default'].createElement(
					'option',
					{ value: year, key: id },
					year
				);
			});

			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(
					'select',
					_extends({}, props, { value: this.state.selectDay, onChange: function (e) {
							return _this.changeDate(e, 'selectDay');
						} }),
					dayElement
				),
				_react2['default'].createElement(
					'select',
					_extends({}, props, { value: this.state.selectMonth, onChange: function (e) {
							return _this.changeDate(e, 'selectMonth');
						} }),
					monthElement
				),
				_react2['default'].createElement(
					'select',
					_extends({}, props, { value: this.state.selectYear, onChange: function (e) {
							return _this.changeDate(e, 'selectYear');
						} }),
					yearElement
				)
			);
		}
	}]);

	return DatePicker;
})(_react2['default'].Component);

exports['default'] = DatePicker;
module.exports = exports['default'];