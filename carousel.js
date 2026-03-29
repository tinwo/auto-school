// document.addEventListener('DOMContentLoaded', () => {
//   const carousel = document.getElementById('carousel');
//   const nextBtn = document.getElementById('nextBtn');
//   const prevBtn = document.getElementById('prevBtn');

//   /**
//    * Функція для розрахунку параметрів скролу
//    */
//   const getScrollParams = () => {
//     const item = carousel.firstElementChild;
//     const gap = parseInt(window.getComputedStyle(carousel).gap) || 0;
//     const step = item.clientWidth + gap;

//     // Максимально можливий скрол (ширина всього контенту мінус ширина видимої частини)
//     const maxScroll = carousel.scrollWidth - carousel.clientWidth;

//     return { step, maxScroll, current: carousel.scrollLeft };
//   };

//   nextBtn.onclick = () => {
//     const { step, maxScroll, current } = getScrollParams();

//     // Якщо залишилось менше половини кроку до кінця (враховуючи похибки округлення)
//     if (current >= maxScroll - 10) {
//       carousel.scrollTo({ left: 0, behavior: 'smooth' });
//     } else {
//       carousel.scrollBy({ left: step, behavior: 'smooth' });
//     }
//   };

//   prevBtn.onclick = () => {
//     const { step, maxScroll, current } = getScrollParams();

//     // Якщо ми на самому початку
//     if (current <= 10) {
//       carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
//     } else {
//       carousel.scrollBy({ left: -step, behavior: 'smooth' });
//     }
//   };
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const carousel = document.getElementById('carousel');
//   const nextBtn = document.getElementById('nextBtn');
//   const prevBtn = document.getElementById('prevBtn');

//   if (!carousel || !nextBtn || !prevBtn) return;

//   const getScrollParams = () => {
//     // Шукаємо саме картку авто (article або за класом)
//     const item =
//       carousel.querySelector('article') || carousel.firstElementChild;
//     const gap = parseInt(window.getComputedStyle(carousel).gap) || 0;

//     return {
//       step: item.clientWidth + gap,
//       maxScroll: carousel.scrollWidth - carousel.clientWidth,
//       current: carousel.scrollLeft,
//     };
//   };

//   nextBtn.addEventListener('click', () => {
//     const { step, maxScroll, current } = getScrollParams();
//     // Циклічна прокрутка
//     if (current >= maxScroll - 10) {
//       carousel.scrollTo({ left: 0, behavior: 'smooth' });
//     } else {
//       carousel.scrollBy({ left: step, behavior: 'smooth' });
//     }
//   });

//   prevBtn.addEventListener('click', () => {
//     const { step, maxScroll, current } = getScrollParams();
//     // Циклічна прокрутка назад
//     if (current <= 10) {
//       carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
//     } else {
//       carousel.scrollBy({ left: -step, behavior: 'smooth' });
//     }
//   });
// });

// Auto scroll with timer
// document.addEventListener('DOMContentLoaded', () => {
//   const carousel = document.getElementById('carousel');
//   const nextBtn = document.getElementById('nextBtn');
//   const prevBtn = document.getElementById('prevBtn');
//
//   if (!carousel || !nextBtn || !prevBtn) return;
//
//   const getScrollParams = () => {
//     const item =
//       carousel.querySelector('article') || carousel.firstElementChild;
//     const gap = parseInt(window.getComputedStyle(carousel).gap) || 0;
//
//     return {
//       step: item.clientWidth + gap,
//       // Округлюємо, щоб уникнути проблем із субпікселями (наприклад, 1200.4px)
//       maxScroll: Math.round(carousel.scrollWidth - carousel.clientWidth),
//       current: Math.round(carousel.scrollLeft),
//     };
//   };
//
//   const handleNext = () => {
//     const { step, maxScroll, current } = getScrollParams();
//     // Якщо до краю залишилося менше одного кроку
//     if (current >= maxScroll - 20) {
//       carousel.scrollTo({ left: 0, behavior: 'smooth' });
//     } else {
//       carousel.scrollBy({ left: step, behavior: 'smooth' });
//     }
//   };
//
//   const handlePrev = () => {
//     const { step, maxScroll, current } = getScrollParams();
//     if (current <= 20) {
//       carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
//     } else {
//       carousel.scrollBy({ left: -step, behavior: 'smooth' });
//     }
//   };
//
//   nextBtn.addEventListener('click', handleNext);
//   prevBtn.addEventListener('click', handlePrev);
//
//   // --- АВТОПРОКРУТКА ---
//   let autoplay = setInterval(handleNext, 5000);
//
//   // Зупиняємо, коли користувач навів мишу
//   carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
//
//   // Відновлюємо, коли прибрав мишу
//   carousel.addEventListener('mouseleave', () => {
//     clearInterval(autoplay);
//     autoplay = setInterval(handleNext, 5000);
//   });
//
//   // Якщо користувач сам клікнув — краще зупинити автоплей зовсім,
//   // щоб не перебивати його ручне керування
//   nextBtn.addEventListener('click', () => clearInterval(autoplay), {
//     once: true,
//   });
//   prevBtn.addEventListener('click', () => clearInterval(autoplay), {
//     once: true,
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  // Якщо елементів немає на сторінці — виходимо, щоб не було помилок
  if (!carousel || !nextBtn || !prevBtn) return;

  let autoplayInterval;

  const getScrollParams = () => {
    // Шукаємо саме article, який ми додали для SEO
    const item = carousel.querySelector('article');
    if (!item) return { step: 0, maxScroll: 0, current: 0 };

    const gap = parseInt(window.getComputedStyle(carousel).gap) || 0;

    return {
      step: item.offsetWidth + gap,
      // 10px — запас, щоб уникнути помилок з дрібними пікселями
      maxScroll: Math.round(carousel.scrollWidth - carousel.clientWidth) - 10,
      current: Math.round(carousel.scrollLeft),
    };
  };

  const handleNext = () => {
    const { step, maxScroll, current } = getScrollParams();
    if (step === 0) return;

    // Якщо дойшли до кінця (current >= maxScroll), повертаємося на початок
    if (current >= maxScroll) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    const { step, maxScroll, current } = getScrollParams();
    if (step === 0) return;

    // Якщо ми на самому початку (current <= 10), переходимо в кінець
    if (current <= 10) {
      carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: -step, behavior: 'smooth' });
    }
  };

  // Функції керування автоплеєм
  const startAutoplay = () => {
    // Спочатку чистимо старий, щоб не було накладання
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(handleNext, 5000);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  // Слухачі подій для кнопок
  nextBtn.addEventListener('click', () => {
    handleNext();
    stopAutoplay(); // Зупиняємо автоплей після кліку користувача
  });

  prevBtn.addEventListener('click', () => {
    handlePrev();
    stopAutoplay(); // Зупиняємо автоплей після кліку користувача
  });

  // Запускаємо автопрокрутку
  startAutoplay();

  // Зупиняємо при наведенні миші, запускаємо назад коли мишу прибрали
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Для мобільних: зупиняємо автоплей, якщо користувач торкнувся екрана
  carousel.addEventListener('touchstart', stopAutoplay, { passive: true });
});