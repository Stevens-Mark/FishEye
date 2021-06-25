/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable max-len *//* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const Likes = (photographersMedia) => {
  const LikeElement = document.getElementById('photosTotalLikes');
  let totalLikes = photographersMedia.map((item) => item.likes).reduce((accumulator, currentValue) => accumulator + currentValue);
  LikeElement.innerHTML = `${totalLikes}<img class="artwork__heart" tabindex="0" src="/public/images/icons/heartsolidblack.svg" alt="">`;
  const hearts = document.querySelectorAll('.artwork__heart');
  hearts.forEach((heart) => {
    let likeClickedAlready = false;

    const AdjustLikes = (event) => {
      const likeValue = event.target.previousSibling.textContent;
      if (!likeClickedAlready) {
        const newLikeValue = parseInt(likeValue, 10) + 1;
        event.target.previousSibling.textContent = newLikeValue;
        likeClickedAlready = true;
        totalLikes += 1;
        LikeElement.innerHTML = `${totalLikes}<img class="artwork__heart" tabindex="0" src="/public/images/icons/heartsolid.svg" alt="">`;
        event.target.setAttribute('aria-selected', true);
      } else {
        const newLikeValue = parseInt(likeValue, 10) - 1;
        event.target.previousSibling.textContent = newLikeValue;
        likeClickedAlready = false;
        totalLikes -= 1;
        event.target.setAttribute('aria-selected', false);
        LikeElement.innerHTML = `${totalLikes}<img class="artwork__heart" tabindex="0" src="/public/images/icons/heartsolid.svg" alt="">`;
      }
    };
    heart.addEventListener('click', (event) => {
      AdjustLikes(event);
    });
    heart.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        AdjustLikes(event);
      }
    });
  });
};
