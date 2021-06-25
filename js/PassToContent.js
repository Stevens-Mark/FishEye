/* check to see if user scrolls: if so make button either visible or not */
let scrollPos = 0;
const contentButton = document.querySelector('.pass-to-maincontent');

function checkPosition() {
  const windowY = window.scrollY;
  if (windowY < scrollPos) {
    /* Scrolling UP */
    contentButton.classList.add('is-hidden');
    contentButton.classList.remove('is-visible');
  } else {
    /* Scrolling DOWN */
    contentButton.classList.add('is-visible');
    contentButton.classList.remove('is-hidden');
  }
  scrollPos = windowY;
}
window.addEventListener('scroll', checkPosition);
