const addMinutes = (time, minutes) => {
  const [h, m] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m + minutes);
  return date.toTimeString().slice(0, 5);
};

const to12Hour = (time24) => {
  let [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
};

// 🔹 NEW: convert HH:mm → minutes
const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

module.exports = { addMinutes, to12Hour, timeToMinutes };
