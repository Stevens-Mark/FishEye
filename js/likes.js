/* eslint-disable no-param-reassign *//* eslint-disable no-unused-vars */
/* eslint-disable max-len */

// ADJUST NUMBER OF LIKES FOR A PHOTO WHEN USER CHOOSES IT & UPDATE TOTAL NUMBER OF LIKES ON THE PAGE

const Likes = (photographersMedia) => {
  const LikeElement = document.getElementById('photosTotalLikes');

  let totalLikes = photographersMedia.map((item) => item.likes).reduce((accumulator, currentValue) => accumulator + currentValue);
  LikeElement.innerHTML = `${totalLikes}<img class="artwork__heart" src="/public/images/icons/blackheart.svg" alt="">`;
  const hearts = document.querySelectorAll('.artwork__button');
  hearts.forEach((heart) => {
    let likeClickedAlready = false;

    const AdjustLikes = (event) => {
      event.preventDefault();
      const selectedHeart = event.target.parentNode.querySelector('.artwork__heart');
      const selectedLikeValue = event.target.parentNode.querySelector('.artwork__likes');
      if (!likeClickedAlready) {
        selectedLikeValue.innerHTML = parseInt(selectedLikeValue.innerHTML, 10) + 1;
        selectedHeart.style.fontWeight = 'bold';
        totalLikes += 1;
        LikeElement.innerHTML = `${totalLikes}<img class="artwork__heart" src="/public/images/icons/blackheart.svg" alt="">`;
        event.target.setAttribute('aria-selected', true);
        likeClickedAlready = true;
      } else if (likeClickedAlready) {
        selectedLikeValue.innerHTML = parseInt(selectedLikeValue.innerHTML, 10) - 1;
        selectedHeart.style.fontWeight = 'normal';
        totalLikes -= 1;
        event.target.setAttribute('aria-selected', false);
        likeClickedAlready = false;
        LikeElement.innerHTML = `${totalLikes}<img class="artwork__heart" src="/public/images/icons/blackheart.svg" alt="">`;
      }
    };
    /* Event Listener (on click) for the like feature */
    heart.addEventListener('click', (event) => {
      console.log(event);
      AdjustLikes(event);
    });
    /* Event Listener (for keyboard) for the like feature */
    heart.addEventListener('keypress', (event) => {
      console.log(event);
      if (event.key === 'Enter') {
        event.preventDefault();
        AdjustLikes(event);
      }
    });
  });
};
