const axios = require('axios');
const {
  getCurrentDay,
  getCurrentTime,
  displaySortedResults,
} = require('./helper');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// question prompt to see more results...
let question = 'Would you like to see more results y/n?';
let x = 10;
let y = 20;

const questionPrompt = (data) => {
  rl.question(question, (answer) => {
    if (answer === 'y') {
      let result = data.slice(x, y);
      if (result.length < 1) {
        rl.close();
        console.log('\n', 'Sorry, There are no more results');
        return;
      }
      console.log(result);
      x += 10;
      y += 10;
      questionPrompt(data);
    } else {
      rl.close();
    }
  });
};

axios
  .get('https://data.sfgov.org/resource/jjew-r69b.json')
  .then((res) => {
    // filter trucks that are open today
    let currentDayString = getCurrentDay().toString();
    let openToday = res.data.filter(
      (item) => item.dayorder === currentDayString
    );
    // filter trucks that are open at the current search time
    let openNow = openToday.filter(
      (truck) =>
        getCurrentTime() < Number(truck.endtime.slice(0, -2)) &&
        getCurrentTime() > Number(truck.starttime.slice(0, -2))
    );
    const sorted = displaySortedResults(openNow);

    const firstTenResults = sorted.slice(0, 10);

    console.log(
      'CHECK OUT THE FOOD TRUCKS THAT ARE OPEN NOW:',
      '\n',
      firstTenResults
    );

    questionPrompt(sorted);
  })
  .catch((error) => {
    console.log(error);
  });
