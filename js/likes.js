/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const Likes = (photographersMedia) => {
  const LikeElement = document.getElementById('#photosTotalLikes');
  let totalLikes = photographersMedia.map((item) => item.likes).reduce((accumulator, currentValue) => accumulator + currentValue);
  /* let likesHtml = `${totalLikes}<i tabindex="0" class="artwork__heart fas fa-heart"> `;
  LikeElement.innerHTML = likesHtml; */

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
        console.log(totalLikes);
        event.target.setAttribute('aria-selected', true);
      } else {
        const newLikeValue = parseInt(likeValue, 10) - 1;
        event.target.previousSibling.textContent = newLikeValue;
        likeClickedAlready = false;
        totalLikes -= 1;
        console.log(totalLikes);
        event.target.setAttribute('aria-selected', false);
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
