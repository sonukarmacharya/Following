import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const Calender = (props) => {
  const y = props.date;
  const defaultvalue = [
    {
      year: 2020,
      month: 12,
      day: 3,
    },
  ];
  const [selectedDays, setSelectedDays] = useState(defaultvalue);
  console.log("datehrer", y);
  return <Calendar value={selectedDays} onChange={setSelectedDays} />;
};

export default Calender;
