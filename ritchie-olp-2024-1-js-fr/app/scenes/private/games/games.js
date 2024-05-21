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
      <div id="background" class="${styles.background}"></div>
    </div>
    
    `
  const logic = () => {

    const challenges = document.getElementById('challenges');
    let aux = false;
    
    challenges.addEventListener('click', () => {
      


      if (aux) return;
      const overlay = document.getElementById('background');
      overlay.style.display = 'block';
      Background(overlay);
      console.log(overlay);
      const challenge = `
        <div id="aux" class="${styles.list}">
          <div>
            <ol class="${styles.lista}">
              <li><a href="https://github.com/nicopicon98/Riwi-js-2024-1/tree/master/04-workshop-1" target="_blank">Workshop 1</a></li>
              <li><a href="https://github.com/nicopicon98/Riwi-js-2024-1/tree/master/05-workshop-2" target="_blank">Workshop 2</a></li>
              <li><a href="https://github.com/nicopicon98/Riwi-js-2024-1/tree/master/07-workshop-3" target="_blank">Workshop 3</a></li>
              <li><a href="https://github.com/nicopicon98/Riwi-js-2024-1/tree/master/11-workshop-4" target="_blank">Workshop 4</a></li>
              <li><a href="https://github.com/nicopicon98/Riwi-js-2024-1/tree/master/15-workshop-5" target="_blank">Workshop 5</a></li>
              <li><a href="https://github.com/nicopicon98/Riwi-js-2024-1/tree/master/15-workshop-6" target="_blank">Workshop 6</a></li>
              <li><a href="https://github.com/nicopicon98/Riwi-js-2024-1/tree/master/16-workshop-7" target="_blank">Workshop 7</a></li>
            </ol>
            <button class="${styles.btn}" id="closeMessage">Cerrar</button>
          </div>
        </div>
      `;
      overlay.innerHTML += `${challenge}`;

      // Agregar un evento para cerrar el mensaje
    const closeButton = document.getElementById('closeMessage');
    closeButton.addEventListener('click', () => {
      // Retornar a falso para que se pueda acceder nuevamente
      BackgroundNone();
      aux = false;
      //ocualtar formulario para evitar removerlo
      overlay.style.display = 'none';
    });

     })

  }


  return {
    pageContent,
    logic
  }
}

