const transformDate = (ISOString) => {
  const newDate = new Date(ISOString);
  const year = newDate.getFullYear();
  const day = newDate.getDay();
  const date = newDate.getDate();
  const month = newDate.getMonth();

  const DOW = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${DOW[day]}, ${date} ${months[month]} ${year}`;
};

export default transformDate