
import styles from './background.css';

export function Background (element) {
    element.innerHTML = `<main id="overlay" class="${styles.background}"></main>`
}

export function BackgroundNone (){
    document.querySelector('#overlay').remove();
}

