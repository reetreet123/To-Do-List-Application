import React from 'react';

const DayDate = () => {
  // Create a new Date object
  const currentDate = new Date();

  // Get the day of the week (0-6, where 0 represents Sunday)
  const dayOfWeek = currentDate.getDay();

  // Array of days of the week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get the name of the current day using the day of the week index
  const currentDay = days[dayOfWeek];

  return (
    <div>
      <h1>{currentDay}</h1>
    </div>
  );
};

export default DayDate;
