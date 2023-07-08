import { Eventcalendar, snackbar, setOptions, Popup, Button, Input, Textarea, Switch, Datepicker, SegmentedGroup, SegmentedItem } from '@mobiscroll/react';
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

const now = new Date();
const defaultEvents = [{
    id: 1,
    start: '2023-07-08T13:00',
    end: '2023-07-08T13:45',
    title: 'Lunch @ Butcher\'s',
    description: '',
    allDay: false,
    free: true,
    color: '#009788'
}, {
    id: 2,
    start: '2023-07-01T15:00',
    end: '2023-07-01T16:00',
    title: 'General orientation',
    description: '',
    allDay: false,
    free: false,
    color: '#ff9900'
}, {
    id: 3,
    start: '2023-06-30T18:00',
    end: '2023-06-30T22:00',
    title: 'Dexter BD',
    description: '',
    allDay: false,
    free: true,
    color: '#3f51b5'
}, {
    id: 4,
    start: '2023-07-02T10:30',
    end: '2023-07-02T11:30',
    title: 'Stakeholder mtg.',
    description: '',
    allDay: false,
    free: false,
    color: '#f44437'
}];

const viewSettings = {
    calendar: { labels: true }
};
const responsivePopup = {
    medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false
    }
};
const colorPopup = {
    medium: {
        display: 'anchored',
        touchUi: false,
        buttons: []
    }
}
const colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];

function MyCalender() {
    const { id } = useParams();
    const [myEvents, setMyEvents] = React.useState(defaultEvents);
    const [tempEvent, setTempEvent] = React.useState(null);
    const [isOpen, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null);
    const [start, startRef] = React.useState(null);
    const [end, endRef] = React.useState(null);
    const [popupEventTitle, setTitle] = React.useState('');
    const [popupEventDescription, setDescription] = React.useState('');
    const [popupEventAllDay, setAllDay] = React.useState(true);
    const [popupEventDate, setDate] = React.useState([]);
    const [popupEventStatus, setStatus] = React.useState('busy');
    const [mySelectedDate, setSelectedDate] = React.useState(now);
    const [colorPickerOpen, setColorPickerOpen] = React.useState(false);
    const [colorAnchor, setColorAnchor] = React.useState(null);
    const [selectedColor, setSelectedColor] = React.useState('');
    const [tempColor, setTempColor] = React.useState('');
    const colorPicker = React.useRef();
    const colorButtons = React.useMemo(() => [
        'cancel',
        {
            text: 'Set',
            keyCode: 'enter',
            handler: () => {
                setSelectedColor(tempColor);
                setColorPickerOpen(false);
            },
            cssClass: 'mbsc-popup-button-primary'
        }
    ], [tempColor]);

    // const totalHours = myEvents.map((event)=>{
    //     const startDateTime = new Date(defaultEvents[0].start);
    //     const endDateTime = new Date(defaultEvents[0].end);
    //     const totalHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
    // })

    

    const handleSessionUpdate =async ()=>{
        try {
            const totalHours = defaultEvents
            .map(event => {
                const startDateTime = new Date(event.start);
                const endDateTime = new Date(event.end);
                return (endDateTime - startDateTime) / (1000 * 60 * 60);
            })
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            console.log("total hours:  ",totalHours); // Output: 5.25

            const response = await axios.post(`http://localhost:3001/mentee/update/${id}`, {
              // include the data you want to update in the request body
              // For example:
              sessionDuration: totalHours,
            });
            console.log(response.data); // handle the response data as needed
          } catch (error) {
            console.error(error);
          }
    }
    const saveEvent = React.useCallback(() => {
        const newEvent = {
            id: tempEvent.id,
            title: popupEventTitle,
            description: popupEventDescription,
            start: popupEventDate[0],
            end: popupEventDate[1],
            allDay: popupEventAllDay,
            status: popupEventStatus,
            color: tempEvent.color,
            color: selectedColor
        };
        if (isEdit) {
            // update the event in the list
            const index = myEvents.findIndex(x => x.id === tempEvent.id);;
            const newEventList = [...myEvents];

            newEventList.splice(index, 1, newEvent);
            setMyEvents(newEventList);
            // here you can update the event in your storage as well
            // ...
        } else {
            // add the new event to the list
            setMyEvents([...myEvents, newEvent]);
            // here you can add the event to your storage as well
            // ...
        }
        handleSessionUpdate();
        setSelectedDate(popupEventDate[0]);
        // close the popup
        setOpen(false);
    }, [isEdit, myEvents, popupEventAllDay, popupEventDate, popupEventDescription, popupEventStatus, popupEventTitle, tempEvent, selectedColor]);

    const deleteEvent = React.useCallback((event) => {
        setMyEvents(myEvents.filter(item => item.id !== event.id));
        setTimeout(() => {
            snackbar({
                button: {
                    action: () => {
                        setMyEvents(prevEvents => [...prevEvents, event]);
                    },
                    text: 'Undo'
                },
                message: 'Event deleted'
            });
        });
        handleSessionUpdate();
    }, [myEvents]);

    const loadPopupForm = React.useCallback((event) => {
        setTitle(event.title);
        setDescription(event.description);
        setDate([event.start, event.end]);
        setAllDay(event.allDay || false);
        setStatus(event.status || 'busy');
        setSelectedColor(event.color || '');
    }, []);

    // handle popup form changes

    const titleChange = React.useCallback((ev) => {
        setTitle(ev.target.value);
    }, []);

    const descriptionChange = React.useCallback((ev) => {
        setDescription(ev.target.value);
    }, []);

    const allDayChange = React.useCallback((ev) => {
        setAllDay(ev.target.checked);
    }, []);

    const dateChange = React.useCallback((args) => {
        setDate(args.value);
    }, []);

    const statusChange = React.useCallback((ev) => {
        setStatus(ev.target.value);
    }, []);

    const onDeleteClick = React.useCallback(() => {
        deleteEvent(tempEvent);
        setOpen(false);
    }, [deleteEvent, tempEvent]);

    // scheduler options

    const onSelectedDateChange = React.useCallback((event) => {
        setSelectedDate(event.date);
    });

    const onEventClick = React.useCallback((args) => {
        setEdit(true);
        setTempEvent({ ...args.event });
        // fill popup form with event data
        loadPopupForm(args.event);
        setAnchor(args.domEvent.target);
        setOpen(true);
    }, [loadPopupForm]);

    const onEventCreated = React.useCallback((args) => {
        // createNewEvent(args.event, args.target)
        setEdit(false);
        setTempEvent(args.event)
        // fill popup form with event data
        loadPopupForm(args.event);
        setAnchor(args.target);
        // open the popup
        setOpen(true);
    }, [loadPopupForm]);

    const onEventDeleted = React.useCallback((args) => {
        deleteEvent(args.event)
    }, [deleteEvent]);

    const onEventUpdated = React.useCallback((args) => {
        // here you can update the event in your storage as well, after drag & drop or resize
        // ...
    }, []);

    // datepicker options
    const controls = React.useMemo(() => popupEventAllDay ? ['date'] : ['datetime'], [popupEventAllDay]);
    const respSetting = React.useMemo(() => popupEventAllDay ? {
        medium: {
            controls: ['calendar'],
            touchUi: false
        }
    } : {
            medium: {
                controls: ['calendar', 'time'],
                touchUi: false
            }
        }, [popupEventAllDay]);

    // popup options
    const headerText = React.useMemo(() => isEdit ? 'Edit event' : 'New Event', [isEdit]);
    const popupButtons = React.useMemo(() => {
        if (isEdit) {
            return [
                'cancel',
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: 'enter',
                    text: 'Save',
                    cssClass: 'mbsc-popup-button-primary'
                }
            ];
        }
        else {
            return [
                'cancel',
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: 'enter',
                    text: 'Add',
                    cssClass: 'mbsc-popup-button-primary'
                }
            ];
        }
    }, [isEdit, saveEvent]);

    const onClose = React.useCallback(() => {
        if (!isEdit) {
            // refresh the list, if add popup was canceled, to remove the temporary event
            setMyEvents([...myEvents]);
        }
        setOpen(false);
    }, [isEdit, myEvents]);

    const selectColor = React.useCallback((color) => {
        setTempColor(color)
    }, []);

    const openColorPicker = React.useCallback((ev) => {
        selectColor(selectedColor || '');
        setColorAnchor(ev.currentTarget);
        setColorPickerOpen(true);
    }, [selectColor, selectedColor]);

    const changeColor = React.useCallback((ev) => {
        const color = ev.currentTarget.getAttribute('data-value');
        selectColor(color);
        if (!colorPicker.current.s.buttons.length) {
            setSelectedColor(color);
            setColorPickerOpen(false);
        }
    }, [selectColor, setSelectedColor]);

    return <div>
        <Eventcalendar
            view={viewSettings}
            data={myEvents}
            clickToCreate="double"
            dragToCreate={true}
            dragToMove={true}
            dragToResize={true}
            selectedDate={mySelectedDate}
            onSelectedDateChange={onSelectedDateChange}
            onEventClick={onEventClick}
            onEventCreated={onEventCreated}
            onEventDeleted={onEventDeleted}
            onEventUpdated={onEventUpdated}
        />
        <Popup
            display="bottom"
            fullScreen={true}
            contentPadding={false}
            headerText={headerText}
            anchor={anchor}
            buttons={popupButtons}
            isOpen={isOpen}
            onClose={onClose}
            responsive={responsivePopup}
        >
            <div className="mbsc-form-group">
                <Input label="Title" value={popupEventTitle} onChange={titleChange} />
                <Textarea label="Description" value={popupEventDescription} onChange={descriptionChange} />
            </div>
            <div className="mbsc-form-group">
                <Switch label="All-day" checked={popupEventAllDay} onChange={allDayChange} />
                <Input ref={startRef} label="Starts" />
                <Input ref={endRef} label="Ends" />
                <Datepicker
                    select="range"
                    controls={controls}
                    touchUi={true}
                    startInput={start}
                    endInput={end}
                    showRangeLabels={false}
                    responsive={respSetting}
                    onChange={dateChange}
                    value={popupEventDate}
                />
                <div onClick={openColorPicker} className="event-color-c">
                    <div className="event-color-label">Color</div>
                    <div className="event-color" style={{ background: selectedColor }}></div>
                </div>
                <SegmentedGroup onChange={statusChange}>
                    <SegmentedItem value="busy" checked={popupEventStatus === 'busy'}>Show as busy</SegmentedItem>
                    <SegmentedItem value="free" checked={popupEventStatus === 'free'}>Show as free</SegmentedItem>
                </SegmentedGroup>
                {isEdit ? <div className="mbsc-button-group"><Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete event</Button></div> : null}
            </div>
        </Popup>
        <Popup
            display="bottom"
            contentPadding={false}
            showArrow={false}
            showOverlay={false}
            anchor={colorAnchor}
            isOpen={colorPickerOpen}
            buttons={colorButtons}
            responsive={colorPopup}
            ref={colorPicker}
        >
            <div className="crud-color-row">
                {colors.map((color, index) => {
                    if (index < 5) {
                        return <div key={index} onClick={changeColor} className={"crud-color-c " + (tempColor === color ? 'selected' : '')} data-value={color}>
                            <div className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }}></div>
                        </div>
                    } else return null;
                })}
            </div>
            <div className="crud-color-row">
                {colors.map((color, index) => {
                    if (index >= 5) {
                        return <div key={index} onClick={changeColor} className={"crud-color-c " + (tempColor === color ? 'selected' : '')} data-value={color}>
                            <div className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }}></div>
                        </div>
                    } else return null;
                })}
            </div>
        </Popup>
    </div>
}
export default MyCalender;

// import { googleCalendarSync, Eventcalendar, CalendarNav, SegmentedGroup, SegmentedItem, CalendarPrev, CalendarToday, CalendarNext, toast } from '@mobiscroll/react-lite';
// import React from 'react';
// const CALENDAR_ID = 'https://calendar.google.com/calendar/embed?src=ishitabharadwaj04%40gmail.com&ctz=Asia%2FKolkata';

// function MyCalender() {
//     const [events, setEvents] = React.useState([]);
//     const [isLoading, setLoading] = React.useState(false);
//     const [view, setView] = React.useState('month');
//     const [calView, setCalView] = React.useState(
//         {
//             calendar: { labels: true }
//         }
//     );
//     const firstDay = React.useRef();
//     const lastDay = React.useRef();
    
//     const onError = React.useCallback((resp) => {
//         toast({
//             message: resp.error ? resp.error : resp.result.error.message
//         });
//     }, []);
    
//     const loadEvents = React.useCallback(() => {
//         setLoading(true);
//         googleCalendarSync.getEvents(CALENDAR_ID, firstDay.current, lastDay.current)
//             .then(function (resp) {
//                 setLoading(false);
//                 setEvents(resp);
//             }).catch(onError);
//     }, [firstDay, lastDay, onError]);

//     const onPageLoading = React.useCallback((event) => {
//         const start = event.viewStart;
//         const end = event.viewEnd;
    
//         // Calculate dates 
//         // (pre-load events for previous and next pages as well)
//         if (view === 'month') {
//             firstDay.current = start;
//             lastDay.current = end;
//         } else {
//             firstDay.current = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 7);
//             lastDay.current = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 7);
//         }

//         loadEvents();
//     }, [loadEvents, view]);
    
//     React.useEffect(() => {
//         googleCalendarSync.init({
//             apiKey: 'AIzaSyAq-Kxw0BJdVwsrNipDhMQndliUt0yF8yE',
//             onInit: loadEvents
//         });
//     }, [loadEvents]);

//     const changeView = (event) => {
//         let calView;
        
//         switch (event.target.value) {
//             case 'month':
//             default:
//                 calView = {
//                     calendar: { labels: true }
//                 }
//                 break;
//             case 'week':
//                 calView = {
//                     schedule: { type: 'week' }
//                 }
//                 break;
//             case 'day':
//                 calView = {
//                     schedule: { type: 'day' }
//                 }
//                 break;
//             case 'agenda':
//                 calView = {
//                     calendar: { type: 'week' },
//                     agenda: { type: 'week' }
//                 }
//                 break;
//         }

//         setView(event.target.value);
//         setCalView(calView);
//     }
    
//     const customWithNavButtons = () => {
//         return <React.Fragment>
//             <CalendarNav className="google-cal-header-nav" />
//             <div className="md-spinner">
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//               </div>
//             <div className="google-cal-header-picker">
//                 <SegmentedGroup value={view} onChange={changeView}>
//                     <SegmentedItem value="month">
//                         Month
//                     </SegmentedItem>
//                     <SegmentedItem value="week">
//                         Week
//                     </SegmentedItem>
//                     <SegmentedItem value="day">
//                         Day
//                     </SegmentedItem>
//                     <SegmentedItem value="agenda">
//                         Agenda
//                     </SegmentedItem>
//                 </SegmentedGroup>
//             </div>
//             <CalendarPrev className="google-cal-header-prev" />
//             <CalendarToday className="google-cal-header-today" />
//             <CalendarNext className="google-cal-header-next" />
//         </React.Fragment>;
//     }

//     return (
//         <Eventcalendar
//             theme="ios" 
//             themeVariant="light"
//             clickToCreate={false}
//             dragToCreate={false}
//             dragToMove={false}
//             dragToResize={false}
//             eventDelete={false}
//             className={"md-google-calendar " + (isLoading ? 'md-loading-events' : '')}
//             exclusiveEndDates={true}
//             view={calView}
//             data={events}
//             onPageLoading={onPageLoading}
//             renderHeader={customWithNavButtons}
//         />
//     ); 
// }
// export default MyCalender;


// import React from 'react';
// import { googleCalendarSync, Eventcalendar, CalendarNav, SegmentedGroup, SegmentedItem, CalendarPrev, CalendarToday, CalendarNext, toast } from '@mobiscroll/react';

// const CALENDAR_ID = 'ishitabharadwaj04@gmail.com';
// function Calender() {
//     console.log("HEY THERE", Eventcalendar);
//     const [events, setEvents] = React.useState([]);
//     const [isLoading, setLoading] = React.useState(false);
//     const [view, setView] = React.useState('month');
//     const [calView, setCalView] = React.useState(
//         {
//             calendar: { labels: true }
//         }
//     );
//     const firstDay = React.useRef();
//     const lastDay = React.useRef();
    
//     const onError = React.useCallback((resp) => {
//         toast({
//             message: resp.error ? resp.error : resp.result.error.message
//         });
//     }, []);
    
//     const loadEvents = React.useCallback(() => {
//         setLoading(true);
//         googleCalendarSync.getEvents(CALENDAR_ID, firstDay.current, lastDay.current)
//             .then(function (resp) {
//                 setLoading(false);
//                 setEvents(resp);
//             }).catch(onError);
//     }, [firstDay, lastDay, onError]);

//     const onPageLoading = React.useCallback((event) => {
//         const start = event.viewStart;
//         const end = event.viewEnd;
    
//         // Calculate dates 
//         // (pre-load events for previous and next pages as well)
//         if (view === 'month') {
//             firstDay.current = start;
//             lastDay.current = end;
//         } else {
//             firstDay.current = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 7);
//             lastDay.current = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 7);
//         }

//         loadEvents();
//     }, [loadEvents, view]);
    
//     React.useEffect(() => {
//         googleCalendarSync.init({
//             apiKey: 'AIzaSyAq-Kxw0BJdVwsrNipDhMQndliUt0yF8yE',
//             onInit: loadEvents
//         });
//     }, [loadEvents]);

//     const changeView = (event) => {
//         let calView;
        
//         switch (event.target.value) {
//             case 'month':
//             default:
//                 calView = {
//                     calendar: { labels: true }
//                 }
//                 break;
//             case 'week':
//                 calView = {
//                     schedule: { type: 'week' }
//                 }
//                 break;
//             case 'day':
//                 calView = {
//                     schedule: { type: 'day' }
//                 }
//                 break;
//             case 'agenda':
//                 calView = {
//                     calendar: { type: 'week' },
//                     agenda: { type: 'week' }
//                 }
//                 break;
//         }

//         setView(event.target.value);
//         setCalView(calView);
//     }
    
//     const customWithNavButtons = () => {
//         return <React.Fragment>
//             <CalendarNav className="google-cal-header-nav" />
//             <div className="md-spinner">
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//                 <div className="md-spinner-blade"></div>
//               </div>
//             <div className="google-cal-header-picker">
//                 <SegmentedGroup value={view} onChange={changeView}>
//                     <SegmentedItem value="month">
//                         Month
//                     </SegmentedItem>
//                     <SegmentedItem value="week">
//                         Week
//                     </SegmentedItem>
//                     <SegmentedItem value="day">
//                         Day
//                     </SegmentedItem>
//                     <SegmentedItem value="agenda">
//                         Agenda
//                     </SegmentedItem>
//                 </SegmentedGroup>
//             </div>
//             <CalendarPrev className="google-cal-header-prev" />
//             <CalendarToday className="google-cal-header-today" />
//             <CalendarNext className="google-cal-header-next" />
//         </React.Fragment>;
//     }

//     return (
//         <Eventcalendar
//             theme="ios" 
//             themeVariant="light"
//             clickToCreate={false}
//             dragToCreate={false}
//             dragToMove={false}
//             dragToResize={false}
//             eventDelete={false}
//             className={"md-google-calendar " + (isLoading ? 'md-loading-events' : '')}
//             exclusiveEndDates={true}
//             view={calView}
//             data={events}
//             onPageLoading={onPageLoading}
//             renderHeader={customWithNavButtons}
//         />
//     ); 
// }

// export default Calender;