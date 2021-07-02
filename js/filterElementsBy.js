/* eslint-disable max-len *//* eslint-disable no-undef */
/* eslint-disable no-plusplus *//* eslint-disable no-unused-vars */

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

// ORDER PHOTOS BY THE OPTION CHOSEN BY USER
const OrderBy = (optionChosen, photographersMedia) => {
  const items = photographersMedia;
  // sort by Date
  if (optionChosen === 'date') {
    const newDateOrder = items.sort((a, b) => (a.date > b.date ? -1 : 1));
    MediaFactory('gallery', newDateOrder);
    // sort by Title
  } else if (optionChosen === 'title') {
    const newTitleOrder = items.sort((a, b) => (a.title > b.title ? 1 : -1));
    MediaFactory('gallery', newTitleOrder);
    // sort by Likes
  } else if (optionChosen === 'popularity') {
    const newPopularityOrder = items.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    MediaFactory('gallery', newPopularityOrder);
  }
  Likes(photographersMedia);
};

// SETUP THE FILTERS ON THE PHOTOGRAPHS (TAGS, DATE, TITLE, LIKES ETC)

const SetFilters = (photographersMedia) => {
  // FILTER PHOTOGRAPHER'S PICTURES BY TAG
  const DisplayMediaByTagSelected = (selectedTag) => {
    const allPhotographs = document.getElementsByTagName('article');
    for (let i = 0; i < photographersMedia.length; i++) {
      if (photographersMedia[i].tags[0] === selectedTag) {
        allPhotographs[i].style.display = 'flex';
      } else {
        allPhotographs[i].style.display = 'none';
      }
    }
  };
  // EVENT LISTENERS ON TAGS FOR FILTERING
  const tagList = document.querySelectorAll('.tags');
  tagList.forEach((item) => {
    item.addEventListener('click', (event) => {
      const tagSelected = event.target.textContent.toLowerCase().slice(1);
      DisplayMediaByTagSelected(tagSelected);
    });
    /* Event Listener (for keyboard) for the like feature */
    item.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const tagSelected = event.target.textContent.toLowerCase().slice(1);
        DisplayMediaByTagSelected(tagSelected);
      }
    });
  });

  // WHEN USER MAKES A CHOICE IN DROPDOWN MENU
  const listbox = document.querySelector('[role="listbox"]');
  const allOptionChoices = [...listbox.children]; /* sets array of all <li> elements */

  const OptionSelected = (event) => {
    /* when user selects an option in dropdown menu change title text */
    document.querySelector('.choice').innerHTML = `${event.target.textContent}<i aria-hidden="true" class="fas fa-chevron-down dropdown__icons"></i>`;
    /* Set attributes for assistive technology for dropdown menu */
    const optionChosen = event.target.closest('li');
    if (!optionChosen) return;

    /* Sets aria-activedescendant value to option chosen by user */
    listbox.setAttribute('aria-activedescendant', optionChosen.id);

    /* For ALL the option choices: remove aria-selected & selected class that
    changes the visual appearance */
    allOptionChoices.forEach((element) => element.classList.remove('dropdown__orderlist__option--Selected'));
    allOptionChoices.forEach((element) => element.setAttribute('aria-selected', false));
    /* Now for the chosen option: set aria selected & selected class to highlight chosen choice */
    optionChosen.classList.add('dropdown__orderlist__option--Selected');
    optionChosen.setAttribute('aria-selected', true);
    /* Call function to sort photos based on users choice in dropdown menu */
    OrderBy(optionChosen.id, photographersMedia);
  };

  /* Event listener on dropdown menu for mouse users */
  listbox.addEventListener('click', (event) => {
    OptionSelected(event);
  });
  /* Event listener on dropdown menu for keyboard users */
  listbox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === 13) {
      event.preventDefault();
      OptionSelected(event);
      CloseDropDownKeyboard();
    }
  });
};
