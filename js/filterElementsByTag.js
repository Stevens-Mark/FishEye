/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
// FILTER PHOTOGRAPHER'S PROFILE BY TAG
const DisplayPhotographerByTagSelected = (selectedTag, photographers) => {
  const allPhotographers = document.getElementsByTagName('article');
  /* check/loop through each photographer in array JSON */
  for (let i = 0; i < photographers.length; i++) {
    let showPhotographer = false;
    /* check/loop through each tag in array of tags for each photographer */
    for (let j = 0; j < photographers[i].tags.length; j++) {
      /* if selected tag is present set to show photographer otherwise do nothing
       (ie, don't set back to false) */
      if (photographers[i].tags[j] === selectedTag) {
        showPhotographer = true;
      }
      /* Either show or "remove" corresponding photographer "article" in DOM */
      /* position [i] in the JSON is the same as position [i] of the article in the DOM */
      if (showPhotographer) {
        allPhotographers[i].style.display = 'flex';
      } else {
        allPhotographers[i].style.display = 'none';
      }
    }
  }
};

// FILTER PHOTOGRAPHER'S PICTURES BY TAG
const DisplayMediaByTagSelected = (selectedTag, photographersMedia) => {
  const allPhotographs = document.getElementsByTagName('article');
  for (let i = 0; i < photographersMedia.length; i++) {
    if (photographersMedia[i].tags[0] === selectedTag) {
      allPhotographs[i].style.display = 'flex';
    } else {
      allPhotographs[i].style.display = 'none';
    }
  }
};
