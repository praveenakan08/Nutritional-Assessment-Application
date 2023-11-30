export const changeDateTimeFormat = (inputDate: Date) => {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };

  const changedDateTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    inputDate
  );

  return changedDateTime;
};

export const formatOnlyDate = (dateTime: string) => {
  return dateTime.replace(/\b\d{1,2}:\d{2} [APMapm]{2}\b/, "").trim();
};

export const formatOnlyTime = (dateTime: string) => {
  return (dateTime.match(/\b\d{1,2}:\d{2} [APMapm]{2}\b/) || [""])[0].trim();
};
