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
  contactEventListener();
  closeContactEventListener();
  projectInfoEventListener();
  closeProjectInfoEventListener();
  contactNavEventListener();
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

function contactEventListener() {
  let screenWidth = window.innerWidth;
  let openContact = document.querySelector('.openContact');
  openContact.onclick = e => {
    e.stopPropagation();
    showContact(screenWidth);
  };
}

function contactNavEventListener() {
  let screenWidth = window.innerWidth;
  let openContact = document.querySelector('.openContactNav');
  openContact.onclick = () => {
    showContact(screenWidth);
  };
  openContact.addEventListener('keyup', e => {
    if (e.keyCode === 13) showContact(screenWidth);
  });
}

function closeContactEventListener() {
  let screenWidth = window.innerWidth;
  let close = document.querySelector('.close');
  close.onclick = () => {
    closeContact(screenWidth);
  };
  close.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) closeContact(screenWidth);
  });
}

function projectInfoEventListener() {
  let infoButtons = document.querySelectorAll('.infoButton');
  infoButtons.forEach(btn => {
    let whichProject = btn.classList.item(1);
    btn.onclick = () => {
      //console.log('info button was clicked');
      toggleInfo(whichProject);
    };
  });
}

function closeProjectInfoEventListener() {
  let closeInfoButton = document.querySelectorAll('.closeInfoButton');
  closeInfoButton.forEach(btn => {
    let which = btn.classList.item(1);
    btn.onclick = () => {
      toggleInfo(which);
    };
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

function toggleInfo(which) {
  let projectContainerOverlay = document.querySelector(`.projectContainerOverlay.${which}`);
  let closeInfoButton = document.querySelector(`.closeInfoButton.${which}`);
  let cursor = window.getComputedStyle(closeInfoButton).getPropertyValue('cursor');

  if (cursor === 'auto') {
    closeInfoButton.style.cursor = 'pointer';
    closeInfoButton.tabIndex = 0;
    projectContainerOverlay.style.zIndex = 10;
  } else {
    closeInfoButton.style.cursor = 'auto';
    closeInfoButton.tabIndex = -1;
    projectContainerOverlay.style.zIndex = 0;
  }

  projectContainerOverlay.classList.toggle('toggleInfo');
}

function showContact(width) {
  let buttons = document.querySelector('.contactButtons');
  let contact = document.querySelector('.contactInfo');
  let contactLink = document.querySelector('.contactLink');
  contactLink.classList.toggle('highlight');
  //contact.style.display = 'inline';
  document.querySelector('.close').tabIndex = 0;
  if (width <= 1024) {
    buttons.classList.toggle('fade');
    setTimeout(() => {
      contact.classList.toggle('show');
      contact.style.zIndex = 10;
    }, 500);
  } else {
    contact.classList.toggle('show');
    contact.style.zIndex = 10;
  }
}

function closeContact(width) {
  let buttons = document.querySelector('.contactButtons');
  let contact = document.querySelector('.contactInfo');
  let contactLink = document.querySelector('.contactLink');
  contactLink.classList.toggle('highlight');
  document.querySelector('.close').tabIndex = -1;
  if (width <= 1024) {
    setTimeout(() => {
      buttons.classList.toggle('fade');
      //contact.style.display = 'none';
    }, 800);
  }
  contact.classList.toggle('show');
  setTimeout(() => {
    contact.style.zIndex = -1;
  }, 1000);
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
