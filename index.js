const axios = require('axios');
const helper = require('./helper');

axios
  .get('https://data.sfgov.org/resource/jjew-r69b.json')
  .then((res) => {
    // filter trucks that are open today
    let openToday = res.data.filter(
      (item) => item.dayorder === helper.getCurrentDay().toString()
    );
    // filter trucks that are open at the current search time
    let openHours = openToday.filter(
      (truck) =>
        helper.getCurrentTime() < Number(truck.endtime.slice(0, -2)) &&
        helper.getCurrentTime() > Number(truck.starttime.slice(0, -2))
    );
    const sorted = helper.displaySortedResults(openHours);

    console.log('CHECK OUT FOOD TRUCKS THAT ARE OPEN NOW:', '\n', sorted);
  })

  .catch((error) => {
    console.log(error);
  });
