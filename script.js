const researchMenu = document.querySelector('.research-menu');
const researchToggle = researchMenu.querySelector('.research-toggle');
const researchLinks = researchMenu.querySelector('.research-links');
function setResearchOpen(open) {
  researchToggle.setAttribute('aria-expanded', String(open));
  researchLinks.hidden = !open;
}
researchToggle.addEventListener('click', () => {
  setResearchOpen(researchToggle.getAttribute('aria-expanded') !== 'true');
});
document.addEventListener('click', (event) => {
  if (!researchMenu.contains(event.target)) setResearchOpen(false);
});
researchMenu.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setResearchOpen(false);
    researchToggle.focus();
  }
  if (event.key === 'ArrowDown' && event.target === researchToggle) {
    event.preventDefault();
    setResearchOpen(true);
    researchLinks.querySelector('a').focus();
  }
});
researchMenu.addEventListener('focusout', (event) => {
  if (!researchMenu.contains(event.relatedTarget)) setResearchOpen(false);
});
