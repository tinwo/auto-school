const reviews = document.getElementById('reviewsCarousel');
const nxtReview = document.getElementById('nextReview');
const prvReview = document.getElementById('prevReview');
let autoplayInterval;

const getReviewScroll = () => {
  const item = reviews.firstElementChild;
  const gap = parseInt(window.getComputedStyle(reviews).gap) || 0;
  return {
    step: item.clientWidth + gap,
    max: Math.round(reviews.scrollWidth - reviews.clientWidth),
    current: Math.round(reviews.scrollLeft),
  };
};

const handleNextReview = () => {
  const { step, max, current } = getReviewScroll();
  // Повернення на початок, якщо в кінці (з невеликим запасом)
  if (current >= max - 20) {
    reviews.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    reviews.scrollBy({ left: step, behavior: 'smooth' });
  }
};

const handlePrevReview = () => {
  const { step, max, current } = getReviewScroll();
  // Перехід в кінець, якщо на початку
  if (current <= 20) {
    reviews.scrollTo({ left: reviews.scrollWidth, behavior: 'smooth' });
  } else {
    reviews.scrollBy({ left: -step, behavior: 'smooth' });
  }
};

const startAutoplay = () => {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(handleNextReview, 6000);
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

nxtReview.onclick = () => {
  handleNextReview();
  stopAutoplay();
};

prvReview.onclick = () => {
  handlePrevReview();
  stopAutoplay();
};

// Запускаємо автоплей
startAutoplay();

// Керування паузою при взаємодії
reviews.addEventListener('mouseenter', stopAutoplay);
reviews.addEventListener('mouseleave', startAutoplay);
reviews.addEventListener('touchstart', stopAutoplay, { passive: true });
