/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// ADJUST NUMBER OF LIKES FOR A PHOTO WHEN USER CHOOSES IT & UPDATE TOTAL NUMBER OF LIKES ON THE PAGE

const Likes = (photographersMedia) => {
  const LikeElement = document.getElementById('photosTotalLikes');

  let totalLikes = photographersMedia.map((item) => item.likes).reduce((accumulator, currentValue) => accumulator + currentValue);
  LikeElement.innerHTML = `${totalLikes}<img class="artwork__heart" src="/public/images/icons/blackheart.svg" alt="">`;
  const hearts = document.querySelectorAll('.artwork__heart');
  hearts.forEach((heart) => {
    let likeClickedAlready = false;

    const AdjustLikes = (event) => {
      const likeValue = event.target.previousSibling.textContent;
      if (!likeClickedAlready) {
        const newLikeValue = parseInt(likeValue, 10) + 1;
        event.target.previousSibling.textContent = newLikeValue;
        heart.style.fontWeight = 'bold';
        likeClickedAlready = true;
        totalLikes += 1;
        LikeElement.innerHTML = `${totalLikes}<img class="artwork__heart" src="/public/images/icons/blackheart.svg" alt="">`;
        event.target.setAttribute('aria-selected', true);
      } else {
        const newLikeValue = parseInt(likeValue, 10) - 1;
        event.target.previousSibling.textContent = newLikeValue;
        heart.style.fontWeight = 'normal';
        likeClickedAlready = false;
        totalLikes -= 1;
        event.target.setAttribute('aria-selected', false);
        LikeElement.innerHTML = `${totalLikes}<img class="artwork__heart" src="/public/images/icons/blackheart.svg" alt="">`;
      }
    };
    /* Event Listener (on click) for the like feature */
    heart.addEventListener('click', (event) => {
      if (!event.target.matches('.artwork__heart')) {
        return;
      }
      AdjustLikes(event);
    });
    /* Event Listener (for keyboard) for the like feature */
    heart.addEventListener('keyup', (event) => {
      if (!event.target.matches('.artwork__heart')) {
        return;
      }
      if (event.key === 'Enter') {
        AdjustLikes(event);
      }
    });
  });
};
