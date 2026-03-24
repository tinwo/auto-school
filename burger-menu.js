const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

// Відкрити/Закрити
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const isOpened = !mobileMenu.classList.contains('hidden');
  menuIcon.classList.toggle('fa-bars', !isOpened);
  menuIcon.classList.toggle('fa-times', isOpened);
});

// Закрити при кліку на посилання (через делегування)
mobileMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('mobile-link')) {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.add('fa-bars');
    menuIcon.classList.remove('fa-times');
  }
});
