import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [allAlerts, setAllAlerts] = useState([]);
  const [xyz, setXYZ] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const getAlerts = async () => {
    const response = await axios.get("http://localhost:3002/v1/api/all-alerts");
    //let responsesx = response.data[0]["COUNT(*)"];
    //console.log(response.data[0]["count_of_zeros"]);
    console.log("ALL ALERTS", response.data[0]);
    // const formattedEvents = response.data.map((event) => {
    //   return {
    //     title: event.event_type,
    //     start: event.event_date,
    //   };
    // });
    const formattedEvents = response.data.map((event) => {
      let color = "green";
      if (event.event_type === "Arson") {
        color = "red";
      } else if (event.event_type === "Dumping") {
        color = "orange";
      }
      return {
        title: event.event_type,
        start: event.event_date,
        color: color,
        extendedProps: {
          description: event.building_name,
        },
      };
    });
    setXYZ(formattedEvents);
    setAllAlerts(response.data);
  };

  useEffect(() => {
    getAlerts();
  }, []);

  const arr = Object.entries(allAlerts).map(([key, value]) => ({
    [key]: value,
  }));

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleEventRender = (info) => {
    const eventEl = info.el;
    const cameraLoc = info.event.extendedProps.cameraLoc;
    const titleEl = eventEl.querySelector(".fc-title");
    const cameraLocEl = document.createElement("div");
    cameraLocEl.classList.add("fc-camera-loc");
    cameraLocEl.textContent = cameraLoc;
    titleEl.insertAdjacentElement("afterend", cameraLocEl);
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            events={xyz}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
