import styles from './profile.css';
import roket from '../../../assets/img/rocket.png'


export function Profile() {

  const pageContent = `
    <div id="user-info" class="${styles.container}">
      
    </div>
    `;

  const logic = async () => {
    const token = localStorage.token;
    

    let payload = token.split('.')[1];
    let decodedPayload = JSON.parse(atob(payload));
    let id = decodedPayload.id;

    const resp = await fetch(`http://localhost:4000/api/users/${id}/`,{
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    }});
    const user = await resp.json();
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `
      <table class="${styles['user-details-table']}">
        <tr><th>Id</th><td>${user.id}</td></tr>
        <tr><th>User name</th><td>${user.username}</td></tr>
        <tr><th>Email</th><td>${user.email}</td></tr>
      </table>
      <div class="${styles['container-img']}">
        <img src="${roket}" class="${styles.img}" alt="rocket" style="background-image: url(${roket});">
      </div>
    `
    

  }

  return {
    pageContent,
    logic
  }

}