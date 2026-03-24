const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const links = document.querySelectorAll('.mobile-link');

// Відкрити/Закрити
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('fa-bars');
  menuIcon.classList.toggle('fa-times'); // Зміна на хрестик
});

// Закрити при кліку на посилання
links.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.add('fa-bars');
    menuIcon.classList.remove('fa-times');
  });
});
