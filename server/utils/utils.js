const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

const isDataExpired = (date) => {
  if (!date) return true;
  return Date.now() - new Date(date).getTime() > FIVE_DAYS;
};

module.exports = {
  isDataExpired
};
