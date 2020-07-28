module.exports = {
  getCurrentDay() {
    let dateObject = new Date();
    let today = dateObject.getDay();
    return today;
  },
  getCurrentTime() {
    let dateObject = new Date();
    let hour = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    return Number(`${hour}.${minutes}`);
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
