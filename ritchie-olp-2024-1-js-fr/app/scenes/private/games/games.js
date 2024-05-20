import styles from './games.css';
import games from '../../../assets/img/game.png'
import challenge from '../../../assets/img/challenges.png';
import { Background, BackgroundNone } from '../../../components/form-components/background';


export function Games() {

  const pageContent = `
    <div class="${styles.container}">
      <div class="${styles.card}">
        <div class="${styles['container-img']}">
          <img src="${games}" class="${styles.img}">
        </div>
      </div>
      <div class="${styles.card}">
        <div class="${styles['container-img']}">
          <img id="challenges" src="${challenge}" class="${styles.img}">
        </div>
      </div>
    </div>
    <div id="background"></div>
    `
  const logic = () => {

    const challenges = document.getElementById('challenges');
    let aux = false;
    const overlay = document.getElementById('background');
    challenges.addEventListener('click', () => {
      if (aux) return;
      Background(overlay);

      const challenge = `
        <div>
          <ol>
            <li><a href="https://example.com/reto1" target="_blank">Reto 1</a></li>
            <li><a href="https://example.com/reto2" target="_blank">Reto 2</a></li>
            <li><a href="https://example.com/reto3" target="_blank">Reto 3</a></li>
            <li><a href="https://example.com/reto4" target="_blank">Reto 4</a></li>
            <li><a href="https://example.com/reto5" target="_blank">Reto 5</a></li>
            <li><a href="https://example.com/reto6" target="_blank">Reto 6</a></li>
            <li><a href="https://example.com/reto7" target="_blank">Reto 7</a></li>
            <li><a href="https://example.com/reto8" target="_blank">Reto 8</a></li>
            <li><a href="https://example.com/reto9" target="_blank">Reto 9</a></li>
            <li><a href="https://example.com/reto10" target="_blank">Reto 10</a></li>
          </ol>
          <button id="closeMessage">Cerrar</button>
        </div>
      `;
      overlay.innerHTML = `${challenge}`;

      // Agregar un evento para cerrar el mensaje
    const closeButton = document.getElementById('closeMessage');
    closeButton.addEventListener('click', () => {
      // Retornar a falso para que se pueda acceder nuevamente
      aux = false;
      BackgroundNone();
      // document.querySelector('#overlay').remove();
      overlay.style.display = 'none';
    });

    })

  }


  return {
    pageContent,
    logic
  }
}

