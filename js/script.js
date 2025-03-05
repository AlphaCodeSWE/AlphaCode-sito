// script.js
console.log("Script caricato correttamente!");

document.addEventListener("DOMContentLoaded", function() {
  // Recupera i link già visitati dal localStorage (se presenti)
  const visitedLinks = JSON.parse(localStorage.getItem("visitedLinks")) || [];

  
  const anchorLinks = document.querySelectorAll('nav a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetID = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });

 
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {

    if (visitedLinks.includes(link.href)) {
      link.classList.add("visited");
    }
    // evento click per marcare il link come visitato
    link.addEventListener('click', function() {
      if (!visitedLinks.includes(link.href)) {
        link.classList.add("visited");
        visitedLinks.push(link.href);
        localStorage.setItem("visitedLinks", JSON.stringify(visitedLinks));
      }
      // Gestione opzionale dello stato "active" per il click corrente
      navLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  //  i link che puntano a file (es. .pdf, .zip)
  const fileLinks = document.querySelectorAll('a[href]');
  fileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (/\.(pdf|zip)$/i.test(href)) {
      link.setAttribute('target', '_blank');
    }
  });
});
