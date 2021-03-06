(function(window, events, undefined){
	'use strict';

	/* ------------------------------------------------------ */
	/* -------- initial options for monthly calendar  -------- */
	/* ------------------------------------------------------ */
	var options = {
			weekDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
			months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
				'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],

			sundayBased: false,
			template: {
				start: function(month, year) {
					return '<div class="month">' + this.options.months[month - 1] + ' - ' + year + '</div>' +
						'<table class="cal-month"><tbody><tr>';
				},
				row: '<td class=""><span class=""{{event}} data-day=\'{"day":"{{day}}", "month":"{{month}}", "year":"{{year}}"}\'>{{day-event}}</span></td>',
				day: function(day, date, event) { // rendering every day
					var text = [];

					for (var n = 0, m = event.length; n < m; n++) {
						if (event[n].text) {
							text.push('<span class="single-event" data-uuid="' + event[n]._id + '">' +
								event[n].text + '</span>');
						}
					}
					return this.options.weekDays[date.getDay()] + '., ' +
						day + '. ' + this.options.months[date.getMonth()] +
						// '<div class="event-list">' +
						text.join('') +
						'' // </div>';
				}
			},
			events: events // external data... see events.js
		};

	// draw yearly calendar
	var myMonthCalendar = window.myMonthCalendar = new Calendar(options);
	var div = document.createElement('div');
	div.className = 'cal-wrapper month-cal';
	div.innerHTML = myMonthCalendar.getMonth(2016, 6).html;
	document.body.appendChild(div);

	/* ------------------------------------------------------ */
	/* ------------------- event handling  ------------------ */
	/* ------------------------------------------------------ */
	// experimental click handler (event delegation) $(div).on('click.cal', '[data-uuid]', function() {...});
	div.addEventListener('click', function(e) {
		if (e.target.hasAttribute('data-uuid')) {
			console.log(myCalendar.options.events[e.target.getAttribute('data-uuid')]);
			// do something with this data...
		}
	});

	
	// a simple div based version (less markup)
	// var myMonthCalendar_2 = window.myMonthCalendar_2 = new Calendar({
	// 	sundayBased: false,
	// 	template: {
	// 		start: function() {return ''},
	// 		colGlue: '',
	// 		row: '<div class="item {{day-event}}">{{day}}</div>',
	// 		end: function() {return ''},
	// 		day: function(days, date) {
	// 			if (date.getDay() === (!this.options.sundayBased ? 1 : 0)) {
	// 				return ' cleared-day';
	// 			}
	// 			return ' ';
	// 		}
	// 	},
	// 	events: events
	// });
	// var div = document.createElement('div');
	// div.className = 'div-based';
	// div.innerHTML = myMonthCalendar_2.getMonth(2016, 6).html;
	// document.body.appendChild(div);

})(window, window.events);