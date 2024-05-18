import styles from './games.css';
import games from '../../../assets/img/game.png'


export function Games() {

  const pageContent = `
    <div class="${styles.container}">
      <div class="${styles.card}">
        <h3 class="${styles.title}">GAMES</h3>
        <div class="${styles['container-img']}">
          <img src="${games}" class="${styles.img}">
        </div>
      </div>
      <div class="${styles.card}">
        <h3 class="${styles.title}">CHALLENGES</h3>
        <div class="${styles['container-img']}">
          <img src="" class="${styles.img}">
        </div>
      </div>
    </div>
    `
  const logic = () => {

  }


  return {
    pageContent,
    logic
  }
}

