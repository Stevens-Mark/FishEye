/* eslint-disable no-console */
fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    /* const { photographers } = data;
    const { media } = data;
    console.log(photographers);
    console.log(media); */
  })
  .catch((error) => console.error(error));
