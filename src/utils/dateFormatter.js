//format a more readable time/date from unix timestamp

function dateFormatter(date) {
  let newDate = new Date(date);
  return (
    newDate.getMonth() +
    1 +
    "/" +
    newDate.getDate() +
    "/" +
    newDate.getFullYear() +
    " - " +
    newDate.getHours() +
    ":" +
    String(newDate.getMinutes()).padStart(2, "0")
  );
}

export default dateFormatter;
