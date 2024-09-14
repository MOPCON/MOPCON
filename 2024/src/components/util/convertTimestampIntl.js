export function convertTimestampIntl(timestamp, option, locale = "zh-TW") {
  return new Intl.DateTimeFormat(locale, {
    ...option,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp * 1000));
}
