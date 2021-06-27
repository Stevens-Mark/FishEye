/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars *//* eslint-disable linebreak-style */

const lightbox = (photographersMedia) => {
  const photoartworkElement = document.querySelector('#photographer-media');
  const findmapindexOf = (aim) => photographersMedia.map((e) => e.id).indexOf(aim);

  photoartworkElement.addEventListener('click', (event) => {
    if (!event.target.matches('.artwork__image')) {
      return;
    }
    console.log(event.target.id);
    console.log(findmapindexOf(parseInt(event.target.id, 10)));
  });

  photoartworkElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      if (!event.target.matches('.artwork__image')) {
        return;
      }
      console.log(event.target.id);
      console.log(findmapindexOf(parseInt(event.target.id, 10)));
    }
  });
};
