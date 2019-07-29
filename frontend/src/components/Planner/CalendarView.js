import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import './FullCalendar.scss';

class Calendar extends React.Component {
  render() {
    return (
      <FullCalendar
        defaultView='timeGridWeek'
        plugins={[timeGridPlugin, bootstrapPlugin]}
        themeSystem='bootstrap'
        allDaySlot={false}
        nowIndicator={true}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: false,
          hour12: false,
        }}
        height='parent'
      />
    );
  }
}

export default Calendar;