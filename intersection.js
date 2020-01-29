'use strict';

function init() {
  let threshold = 0.5;
  let projectThreshold = 0.2;

  let options = {
    //root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: threshold
  };

  let projectOptions = {
    rootMargin: '0px',
    threshold: projectThreshold
  };

  let callback = entries => {
    entries.forEach(entry => {
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
  let projectObserver = new IntersectionObserver(callback, projectOptions);

  let targetHome = document.querySelector('#home');
  let targetAbout = document.querySelector('#about');
  let targetProjects = document.querySelector('#projectsObserve');
  let targetContact = document.querySelector('#contact');

  observer.observe(targetHome);
  observer.observe(targetAbout);
  projectObserver.observe(targetProjects);
  observer.observe(targetContact);
}

init();
