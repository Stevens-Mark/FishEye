/* eslint-disable no-param-reassign *//* eslint-disable no-unused-vars */
/* eslint-disable no-undef *//* eslint-disable no-lonely-if */
/* eslint-disable max-len */

// DOM Elements
const lightboxModalbg = document.querySelector('.lightbox-modal');
const closeLightboxModalBtn = document.querySelectorAll('#close');
const nextButton = document.querySelector('#next');
const previousButton = document.querySelector('#previous');

// FIX FOCUS IN LIGHTBOX MODAL FOR KEYBOARD USERS
const LightBoxModalTrap = () => {
  /* add all the elements inside modal which we want to make focusable */
  const lightboxFocusableElements = 'button, [href], [tabindex]:not([tabindex="-1"])';
  /* select the modal by it's class id */
  const lightboxModal = document.querySelector('.lightbox-modal');
  /* get first element to be focused inside modal */
  const firstLightboxFocusableElement = lightboxModal.querySelectorAll(lightboxFocusableElements)[0];
  const lightboxFocusableContent = lightboxModal.querySelectorAll(lightboxFocusableElements);
  /* get last element to be focused inside modal */
  const lastLightboxFocusableElement = lightboxFocusableContent[lightboxFocusableContent.length - 1];

  document.addEventListener('keydown', (event) => {
    const { key } = event;
    if (key !== 'Tab' || key === 9) {
      return;
    }
    if (event.shiftKey) { // if shift key pressed for shift + tab combination
      if (document.activeElement === firstLightboxFocusableElement) {
        lastLightboxFocusableElement.focus(); // add focus for the last focusable element
        event.preventDefault();
      }
    } else { // if tab key is pressed
      /* if focused has reached to last focusable element then focus first focusable element
    after pressing tab */
      if (document.activeElement === lastLightboxFocusableElement) {
        /* add focus for the first focusable element */
        firstLightboxFocusableElement.focus();
        event.preventDefault();
      }
    }
  });
};

// close modal Lightbox modal
const closeLightboxModal = () => {
  mainWrapper.setAttribute('aria-hidden', 'false');
  lightboxModalbg.setAttribute('aria-hidden', 'true');
  lightboxModalbg.style.display = 'none';
  document.querySelector('#dropdownBtn').focus();
};
//  close Lightbox modal event listener
closeLightboxModalBtn.forEach((btn) => btn.addEventListener('click', closeLightboxModal));

// close Lightbox modal on pressing the escape key event listener
lightboxModalbg.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightboxModal();
  }
});

// LOADS RELEVANT MEDIA TYPE INTO LIGHTBOX (FACTORY FUNCTION)
const showMedia = (photographersMedia, i) => {
  const lightboxElement = document.querySelector('#placeHolder');
  let lightboxhtml = '';
  if (photographersMedia[i].video) { /* if a video object return a video template */
    lightboxhtml = `<video width="100%" controls class="lightbox-modal__media"  tabindex="0" aria-label="${photographersMedia[i].alt}"><source type="video/mp4" src="/public/images/photography/${photographersMedia[i].photographerId}/${photographersMedia[i].video}">Sorry, your browser doesn't support embedded videos.</video>
  <h1 class="lightbox-modal__title">${photographersMedia[i].title}</h1>`;
  } else if (photographersMedia[i].image) { /* if an image object return an image template */
    lightboxhtml = `<img class="lightbox-modal__media" tabindex="0" src="/public/images/photography/${photographersMedia[i].photographerId}/${photographersMedia[i].image}" alt="${photographersMedia[i].alt}">
  <h1 class="lightbox-modal__title">${photographersMedia[i].title}</h1>`;
  }
  lightboxElement.innerHTML = lightboxhtml;
};

// LAUNCH LIGHTBOX MODAL & NAVIGATION CONTROLS
const initialiseLightboxModal = (Media, chosenMedia) => {
  mainWrapper.setAttribute('aria-hidden', 'true');
  lightboxModalbg.setAttribute('aria-hidden', 'false');
  lightboxModalbg.style.display = 'flex';
  document.getElementById('close').focus();
  /* "trap" user cursur inside modal */
  LightBoxModalTrap();
  showMedia(Media, chosenMedia);

  /* move to next picture */
  const nextImage = () => {
    let newValue = chosenMedia + 1;
    if (newValue === Media.length) {
      newValue = 0;
    }
    showMedia(Media, newValue);
    document.getElementById('next').focus();
    chosenMedia = newValue;
  };

  /* move to previous picture */
  const previousImage = () => {
    let newValue = chosenMedia - 1;
    if (newValue === -1) {
      newValue = Media.length - 1;
    }
    showMedia(Media, newValue);
    document.getElementById('previous').focus();
    chosenMedia = newValue;
  };

  // EVENT LISTENERS ON ARROW / NAVIGATION KEYS (ON CLICK)
  nextButton.addEventListener('click', () => { nextImage(); });
  previousButton.addEventListener('click', () => { previousImage(); });

  // EVENT LISTENERS ON ARROW / NAVIGATION KEYS (KEYBOARD USERS)
  lightboxModalbg.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight' || event.key === 39) {
      nextImage();
    }
  });
  lightboxModalbg.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 37) {
      previousImage();
    }
  });
};

// LISTEN FOR WHEN USER CHOSES A PHOTO TO ENLARGE & LAUNCH THE LIGHTBOX MODAL & NAV CONTROLS
const lightboxActivation = (photographersMedia) => {
  const photoartworkElement = document.querySelector('#photographer-media');
  const findmapindexOf = (chosenPhoto) => photographersMedia.map((event) => event.id).indexOf(chosenPhoto);
  let chosenMedia = 0;
  photoartworkElement.addEventListener('click', (event) => {
    if (!event.target.matches('.artwork__image')) {
      return;
    }
    chosenMedia = findmapindexOf(parseInt(event.target.id, 10));
    initialiseLightboxModal(photographersMedia, chosenMedia);
  });

  photoartworkElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      if (!event.target.matches('.artwork__image')) {
        return;
      }
      chosenMedia = findmapindexOf(parseInt(event.target.id, 10));
      initialiseLightboxModal(photographersMedia, chosenMedia);
    }
  });
};
