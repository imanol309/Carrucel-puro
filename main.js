const carrusel = document.getElementById('carrusel');
const imgCarrusel = document.querySelectorAll('.imgCarrusel');
const buttonLeft = document.getElementById('buttonLeft');
const buttonRight = document.getElementById('buttonRight');
const stylesValue = document.documentElement.style;

let carruselCounter = 0;
let transitionValue = false;

const CONSTANT = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT'
};

const transformValue = () =>
  Number(stylesValue.getPropertyValue('--carrusel-transform').replace('px', ''));

const sortCarrusel = () => {
  stylesValue.setProperty('--transition', 'none');
  if (carruselCounter === imgCarrusel.length - 1) {
    carrusel.appendChild(carrusel.firstElementChild);
    stylesValue.setProperty(
      '--carrusel-transform',
      `${transformValue() + imgCarrusel[carruselCounter].scrollWidth}px`
    );
    carruselCounter--;
  } else if (carruselCounter === 0) {
    carrusel.prepend(carrusel.lastElementChild);
    stylesValue.setProperty(
      '--carrusel-transform',
      `${transformValue() - imgCarrusel[carruselCounter].scrollWidth}px`
    );
    carruselCounter++;
  }
  transitionValue = false;
};

const activateCarousel = directionCarrucel => {
  if (transitionValue) return;
  stylesValue.setProperty('--transition', 'transform 1s');
  transitionValue = true;
  if (directionCarrucel === CONSTANT.LEFT) {
    stylesValue.setProperty(
      '--carrusel-transform',
      `${transformValue() + imgCarrusel[carruselCounter].scrollWidth}px`
    );
    carruselCounter--;
  } else if (directionCarrucel === CONSTANT.RIGHT) {
    stylesValue.setProperty(
      '--carrusel-transform',
      `${transformValue() - imgCarrusel[carruselCounter].scrollWidth}px`
    );
    carruselCounter++;
  }
};

buttonRight.addEventListener('click', () => activateCarousel(CONSTANT.RIGHT));
buttonLeft.addEventListener('click', () => activateCarousel(CONSTANT.LEFT));
carrusel.addEventListener('transitionend', sortCarrusel);

sortCarrusel();