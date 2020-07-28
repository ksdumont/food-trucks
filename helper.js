const APP_LOCALE = 'en-US';

module.exports = {
  getCurrentDay() {
    let dateObject = new Date();
    let today = dateObject.getDay();
    return today;
  },
  getCurrentTime() {
    let dateObject = new Date();
    let timestamp = dateObject.toLocaleTimeString(APP_LOCALE);
    return Number(timestamp.slice(0, -6).replace(':', '.'));
  },
  displaySortedResults(data) {
    let results = data.map((element) => {
      return {
        name: element.applicant,
        location: element.location,
      };
    });
    let sortAlphabetically = results.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase()
        ? -1
        : a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : 0
    );
    return sortAlphabetically;
  },
};
