import styles from './profile.css';
import roket from '../../../assets/img/rocket.png'


export function Profile() {

  const pageContent = `
    <div class="${styles.container}">
      <table class="${styles['user-details-table']}">
        <tr><th>ID</th><td></td></tr>
        <tr><th>Name</th><td></td></tr>
        <tr><th>User</th><td></td></tr>
        <tr><th>Password</th><td></td></tr>
        <tr><th>Clan</th><td></td></tr>
        <tr><th>Phone</th><td></td></tr>
      </table>
      <div class="${styles['container-img']}">
        <img src="${roket}" class="${styles.img}" alt="rocket" style="background-image: url(${roket});">
      </div>
    </div>
    `;

  const logic = () => {

  }

  return {
    pageContent,
    logic
  }

}