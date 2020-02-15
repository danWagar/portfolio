'use strict';

function init() {
  bindListeners();

  let targets = document.getElementsByClassName('target');
  //console.dir(targets);
  for (let i = 0; i < targets.length; i++) {
    //console.log('removing href from target');
    targets[i].removeAttribute('href');
  }
}

function bindListeners() {
  buttonBorderOnTabListener();
  burgerEventListener();
  closeNavEventListener();
  navLinkMobileClickEventListener();
}

function buttonBorderOnTabListener() {
  document.body.addEventListener('keyup', function(e) {
    if (e.which === 9) {
      /* tab */ document.body.classList.remove('no-focus-outline');
    }
  });
}

function burgerEventListener() {
  let burger = document.querySelector('.burger');
  let closeNav = document.querySelector('.closeBurger');
  burger.style.zIndex = '6';
  burger.onclick = () => {
    toggleNav(burger, closeNav);
  };
  burger.addEventListener('keyup', e => {
    if (e.keyCode === 13) toggleNav(burger, closeNav);
  });
}

function closeNavEventListener() {
  let burger = document.querySelector('.burger');
  let closeNav = document.querySelector('.closeBurger');
  closeNav.onclick = () => {
    toggleNav(burger, closeNav);
  };
  closeNav.addEventListener('keyup', e => {
    if (e.keyCode === 13) toggleNav(burger, closeNav);
  });
}

function navLinkMobileClickEventListener() {
  let burger = document.querySelector('.burger');
  let closeNav = document.querySelector('.closeBurger');
  let navLinks = document.querySelectorAll('.navLink');
  let nav = document.querySelector('.nav');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('toggleNav')) toggleNav(burger, closeNav);
    });
  });
}

function toggleNav(burger, close) {
  //console.log('in toggleNav');
  let nav = document.querySelector('.nav');
  let navList = document.querySelector('.navList');
  //console.dir(window.getComputedStyle(nav));
  let zIndex = window.getComputedStyle(burger).getPropertyValue('z-index');
  setTimeout(() => {
    nav.classList.toggle('toggleNav');
  }, 100);

  if (zIndex === '6') {
    burger.classList.toggle('hide');
    burger.tabIndex = -1;
    burger.style.zIndex = '1';
    close.style.zIndex = '6';
    close.tabIndex = 1;
    setTimeout(() => {
      close.classList.toggle('showClose');
    }, 200);
  } else {
    close.classList.toggle('showClose');
    setTimeout(() => {
      //navList.style.display = 'none';
      burger.classList.toggle('hide');
    }, 400);
    close.style.zIndex = '1';
    close.tabIndex = 0;
    burger.style.zIndex = '6';
    burger.tabIndex = 1;
  }
}

window.onload = init();
