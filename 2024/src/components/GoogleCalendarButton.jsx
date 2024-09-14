import { LuCalendarCheck } from "react-icons/lu";
const GoogleCalendarButton = ({ event }) => {
  const addToGoogleCalendar = () => {
    const { topic, summary, startedAt, endAt, room, name } = event;

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };

    const startDate = formatDate(startedAt);
    const endDate = formatDate(endAt);

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      topic
    )}-${name}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      summary
    )}&location=高雄市前鎮區成功二路39號3樓會議中心R${room}`;

    window.open(url, "_blank");
  };

  return (
    <button
      onClick={addToGoogleCalendar}
      variant="secondary"
      className="btn btn-secondary flex items-center gap-2 justify-center"
    >
      <LuCalendarCheck />
      加入行事曆
    </button>
  );
};

export default GoogleCalendarButton;
