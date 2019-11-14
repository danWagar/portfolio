'use strict';

function init() {
  //let gradient = document.querySelector('.gradientBackground');
  let timeline = document.querySelector('.timelineCover');
  let screenWidth = window.innerWidth;
  let threshold;

  if (screenWidth < 800) threshold = 0.5;
  else threshold = 0.5;

  let options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: threshold
  };

  let callback = entries => {
    //console.dir(entries);
    //console.dir(options);
    entries.forEach(entry => {
      //console.dir(threshold);

      if (entry.target === targetHome && entry.isIntersecting) {
        const links = document.querySelectorAll('.navLink');
        links.forEach(link => {
          if (link.classList.contains('highlight') && !link.classList.contains('contactLink'))
            link.classList.toggle('highlight');
          link.classList.contains('homeLink') && link.classList.toggle('highlight');
        });
      }

      if (entry.target === targetAbout && entry.isIntersecting) {
        const links = document.querySelectorAll('.navLink');
        links.forEach(link => {
          if (link.classList.contains('highlight') && !link.classList.contains('contactLink'))
            link.classList.toggle('highlight');
          link.classList.contains('aboutLink') && link.classList.toggle('highlight');
        });
      }

      if (entry.target === targetProjects && entry.isIntersecting) {
        const links = document.querySelectorAll('.navLink');
        links.forEach(link => {
          if (link.classList.contains('highlight') && !link.classList.contains('contactLink'))
            link.classList.toggle('highlight');
          link.classList.contains('projectsLink') && link.classList.toggle('highlight');
        });
      }
    });
  };

  let observer = new IntersectionObserver(callback, options);
  let targetHome = document.querySelector('#home');
  let targetAbout = document.querySelector('#about');
  let targetProjects = document.querySelector('#projects');
  let targetContact = document.querySelector('#contact');
  //IntersectionObserver.threshold(0);
  observer.observe(targetHome);
  observer.observe(targetAbout);
  observer.observe(targetProjects);
  observer.observe(targetContact);
}

init();
