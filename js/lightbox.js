/* eslint-disable no-unused-vars *//* eslint-disable no-param-reassign */
/* eslint-disable no-undef *//* eslint-disable max-len *//* eslint-disable no-lonely-if */

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

// CLOSE LIGHTBOX MODAL

const closeLightboxModal = () => {
  mainWrapper.setAttribute('aria-hidden', 'false');
  lightboxModalbg.setAttribute('aria-hidden', 'true');
  lightboxModalbg.style.display = 'none';
  document.querySelector('#dropdownBtn').focus();
};
// EVENT LISTENER: CLOSE LIGHBOX MODAL
closeLightboxModalBtn.forEach((btn) => btn.addEventListener('click', closeLightboxModal));

// EVENT LISTENER: CLOSE MODAL ON ESCAPE KEYPRESS
lightboxModalbg.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightboxModal();
  }
});

// LAUNCH LIGHTBOX MODAL & NAVIGATION CONTROLS
const initialiseLightboxModal = (Media, chosenMediaIndex) => {
  mainWrapper.setAttribute('aria-hidden', 'true');
  lightboxModalbg.setAttribute('aria-hidden', 'false');
  lightboxModalbg.style.display = 'flex';
  document.getElementById('close').focus();
  /* "trap" user cursor inside modal */
  LightBoxModalTrap();
  /* Get correct image template to display in Lightbox */
  MediaFactory('lightbox', Media, chosenMediaIndex);

  // FUNCTION: MOVE TO NEXT PICTURE
  const nextImage = () => {
    let newIndexValue = chosenMediaIndex + 1;
    if (newIndexValue === Media.length) {
      newIndexValue = 0;
    }
    MediaFactory('lightbox', Media, chosenMediaIndex);
    chosenMediaIndex = newIndexValue;
  };

  // FUNCTION: MOVE TO PREVIOUS PICTURE
  const previousImage = () => {
    let newIndexValue = chosenMediaIndex - 1;
    if (newIndexValue === -1) {
      newIndexValue = Media.length - 1;
    }
    MediaFactory('lightbox', Media, chosenMediaIndex);
    chosenMediaIndex = newIndexValue;
  };

  // EVENT LISTENERS ON ARROW / NAVIGATION KEYS (ON CLICK)
  nextButton.addEventListener('click', () => { nextImage(); });
  previousButton.addEventListener('click', () => { previousImage(); });

  // EVENT LISTENERS ON ARROW / NAVIGATION KEYS (KEYBOARD USERS)
  lightboxModalbg.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight' || event.key === 39) {
      nextImage();
      document.querySelector('#next').focus();
    }
  });
  lightboxModalbg.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 37) {
      previousImage();
      document.querySelector('#previous').focus();
    }
  });
};

// LISTEN FOR WHEN USER CHOSES A PHOTO TO ENLARGE & LAUNCH THE LIGHTBOX MODAL & NAV CONTROLS
const lightboxActivation = (photographersMedia) => {
  const photoartworkElements = document.querySelectorAll('.artwork__image');
  /* From picture ID find the position (index) in the media array */
  const findmapindexOf = (chosenPhotoId) => photographersMedia.map((event) => event.id).indexOf(chosenPhotoId);

  // EVENT LISTENER ON MEDIA IMAGES (ON CLICK)
  photoartworkElements.forEach((item) => {
    let chosenMediaIndex = 0;
    item.addEventListener('click', (event) => {
      chosenMediaIndex = findmapindexOf(parseInt(event.target.id, 10));
      initialiseLightboxModal(photographersMedia, chosenMediaIndex);
    });
    // EVENT LISTENER ON MEDIA IMAGES (KEYBOARD USERS)
    item.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        chosenMediaIndex = findmapindexOf(parseInt(event.target.id, 10));
        initialiseLightboxModal(photographersMedia, chosenMediaIndex);
      }
    });
  });
};
