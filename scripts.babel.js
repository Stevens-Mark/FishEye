/* eslint-disable no-console */
fetch('./data.json').then((response) => response.json()).then((data) => {
  console.log(data);
}).catch((error) => console.error(error));
