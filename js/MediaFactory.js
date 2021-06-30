/* eslint-disable max-len */
/* eslint-disable linebreak-style *//* eslint-disable no-unused-vars */

// LOADS RELEVANT MEDIA TYPE INTO EITHER THE PHOTOGRAPHER MEDIA GALLERY OR THE LIGHTBOX (FACTORY FUNCTION)
const MediaFactory = (type, photographersMedia, i) => {
  const photoartworkElement = document.querySelector('#photographer-media');
  const lightboxElement = document.querySelector('#placeHolder');
  // LOADS RELEVANT MEDIA TYPE INTO THE PHOTOGRAPHER MEDIA GALLERY
  if (type === 'gallery') {
    let photographshtml = '';
    photographersMedia.forEach((media) => {
      if (media.video) { /* if a video object return a video template */
        photographshtml
       += `<article class="artwork__card">
       <video id="${media.id}" class="artwork__image" aria-label="${media.alt}" tabindex="0"><source src="/public/images/photography/${media.photographerId}/${media.video}">Sorry, your browser doesn't support embedded videos.
       </video>
             <div class="artwork__details d-flex" >
             <h2 class="artwork__title">${media.title}</h2>
             <span class="artwork__likes">${media.likes}<button type="button" class="artwork__button"><i class="artwork__heart far fa-heart" style="pointer-events:none" title="Press to like"></i></button></span>
         </article>`;
      } else { /* if an image object return an image template */
        photographshtml
       += `<article  class="artwork__card">
           <img id="${media.id}" class="artwork__image" tabindex="0" src="/public/images/photography/${media.photographerId}/${media.image}" alt="${media.alt}">
           <div class="artwork__details d-flex" >
             <h2 class="artwork__title">${media.title}</h2>
             <span class="artwork__likes">${media.likes}<button type="button" class="artwork__button"><i class="artwork__heart far fa-heart" style="pointer-events:none" title="Press to like"></i></button></span>
           </div>
         </article>`;
      }
      photoartworkElement.innerHTML = photographshtml;
    });
  } else if (type === 'lightbox') {
  // LOADS RELEVANT MEDIA TYPE INTO LIGHTBOX
    let lightboxhtml = '';
    if (photographersMedia[i].video) { /* if a video object return a video template */
      lightboxhtml = `<video width="100%" controls class="lightbox-modal__media"  tabindex="0" aria-label="${photographersMedia[i].alt}"><source type="video/mp4" src="/public/images/photography/${photographersMedia[i].photographerId}/${photographersMedia[i].video}">Sorry, your browser doesn't support embedded videos.</video>
   <h1 class="lightbox-modal__title">${photographersMedia[i].title}</h1>`;
    } else if (photographersMedia[i].image) { /* if an image object return an image template */
      lightboxhtml = `<img class="lightbox-modal__media" tabindex="0" src="/public/images/photography/${photographersMedia[i].photographerId}/${photographersMedia[i].image}" alt="${photographersMedia[i].alt}">
   <h1 class="lightbox-modal__title">${photographersMedia[i].title}</h1>`;
    }
    lightboxElement.innerHTML = lightboxhtml;
  }
};
