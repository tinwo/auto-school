const reviews = document.getElementById('reviewsCarousel');
const nxtReview = document.getElementById('nextReview');
const prvReview = document.getElementById('prevReview');

const getReviewScroll = () => {
  const item = reviews.firstElementChild;
  const gap = parseInt(window.getComputedStyle(reviews).gap) || 0;
  return {
    step: item.clientWidth + gap,
    max: reviews.scrollWidth - reviews.clientWidth,
    current: reviews.scrollLeft,
  };
};

nxtReview.onclick = () => {
  const { step, max, current } = getReviewScroll();
  // Повернення на початок, якщо в кінці
  current >= max - 20
    ? reviews.scrollTo({ left: 0, behavior: 'smooth' })
    : reviews.scrollBy({ left: step, behavior: 'smooth' });
};

prvReview.onclick = () => {
  const { step, max, current } = getReviewScroll();
  // Перехід в кінець, якщо на початку
  current <= 20
    ? reviews.scrollTo({ left: max, behavior: 'smooth' })
    : reviews.scrollBy({ left: -step, behavior: 'smooth' });
};
