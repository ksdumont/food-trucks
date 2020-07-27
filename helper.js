module.exports = {
  getCurrentDay() {
    let date_object = new Date();
    let today = date_object.getDay();
    return today;
  },

  getCurrentTime() {
    let date_object = new Date();
    let timestamp = date_object.toLocaleTimeString('en-US');
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
