// const carousel = document.getElementById('carousel');
// const nextBtn = document.getElementById('nextBtn');
// const prevBtn = document.getElementById('prevBtn');

// // Динамічне обчислення кроку (ширина елемента + gap)
// const getScrollAmount = () => {
//   const item = carousel.firstElementChild;
//   const gap = parseInt(window.getComputedStyle(carousel).gap) || 0;
//   return item.clientWidth + gap;
// };

// nextBtn.onclick = () => {
//   carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
// };

// prevBtn.onclick = () => {
//   carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
// };

const carousel = document.getElementById('carousel');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

/**
 * Функція для розрахунку параметрів скролу
 */
const getScrollParams = () => {
  const item = carousel.firstElementChild;
  const gap = parseInt(window.getComputedStyle(carousel).gap) || 0;
  const step = item.clientWidth + gap;

  // Максимально можливий скрол (ширина всього контенту мінус ширина видимої частини)
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  return { step, maxScroll, current: carousel.scrollLeft };
};

nextBtn.onclick = () => {
  const { step, maxScroll, current } = getScrollParams();

  // Якщо залишилось менше половини кроку до кінця (враховуючи похибки округлення)
  if (current >= maxScroll - 10) {
    carousel.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    carousel.scrollBy({ left: step, behavior: 'smooth' });
  }
};

prevBtn.onclick = () => {
  const { step, maxScroll, current } = getScrollParams();

  // Якщо ми на самому початку
  if (current <= 10) {
    carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
  } else {
    carousel.scrollBy({ left: -step, behavior: 'smooth' });
  }
};
