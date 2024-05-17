import { navigateTo } from '../../../Router';
import styles from './users.css';
import { Background, BackgroundNone } from '../../../components/form-components/background';

export function UserScene(params) {

  let pageContent = `
    <div class="${styles.contenedorUser}">
    <button id="btn">New User</button>
    <section class="${styles.message}" id="messageSection" style="display: none;"></section>
      <h2 class=${styles['page-title']}>Bienvenido a usuarios</h2>
      <p>Desde Usuarios</p>
    </div>
    <div id="user-info" class="${styles['user-info']}"></div>
    <div class="${styles.loader}" id="loader"></div>
    <div id="background"></div>
`;

  let logic = async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await resp.json();
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `
        <table class="${styles['user-table']}">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td><button id="${user.id}" class="${styles['btn-see-more']}">Ver más</button></td>
                </tr>`).join('')}
            </tbody>
        </table>
        `;

  let aux = false;
  const newUser = document.getElementById('btn');
  newUser.addEventListener('click', ()=>{
    if(aux) return;
    const overlay = document.getElementById('background')

    Background(overlay);
    messageSection.style.display = 'block';
    const formMenu = `
    <form class="${styles.userForm}">
      <label class="labelUser" for="firstName">Nombre:</label>
      <input class="inputUser" type="text" id="firstName" name="firstName" required>

      <label class="labelUser" for="username">Usuario:</label>
      <input class="inputUser" type="text" id="username" name="username" required>

      <label class="labelUser" for="phone">Teléfono:</label>
      <input class="inputUser" type="text" id="phone" name="phone" pattern="[0-9]{10}}" required>

      <label class="labelUser" for="clan">Clan:</label>
      <input class="inputUser" type="text" id="clan" name="clan" required>

      <label class="labelUser" for="password">Contraseña:</label>
      <input class="inputUser" type="password" id="password" name="password" required>

      <label class="labelUser" for="confirmPassword">Confirmar Contraseña:</label>
      <input class="inputUser" type="password" id="confirmPassword" name="confirmPassword" required>

      <button type="submit">Crear Usuario</button>
      <button id="closeMessage">Cerrar</button>
      
    </form>
    `;
    console.log(aux);
    messageSection.innerHTML = `${formMenu}`;
    // Agregar un evento para cerrar el mensaje
    const closeButton = document.getElementById('closeMessage');
    closeButton.addEventListener('click', () => {
      // Retornar a falso para que se pueda acceder nuevamente
      aux = false;
      BackgroundNone();
      // document.querySelector('#overlay').remove();
      messageSection.style.display = 'none';
    });
  })
  

    document.querySelectorAll(`.${styles['btn-see-more']}`).forEach(btn => {
      btn.addEventListener('click', (e) => {
        navigateTo(`/dashboard/users?id=${e.target.id}`);
      });
    });

    document.querySelector(`#loader`).classList.add(styles.hidden);
  }

  if (params.get('id')) {
    const userId = params.get('id');
    pageContent = `
        <h2 class=${styles['page-title']}>Información del Usuario</h2>
        <div id="user-info" class="${styles['user-info']}"></div>
        <div class="${styles.loader}" id="loader"></div>
        `;

    logic = async () => {
      console.log("first")
      const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user = await resp.json();
      const userInfo = document.getElementById('user-info');
      userInfo.innerHTML = `
            <table class="${styles['user-details-table']}">
                <tr><th>ID</th><td>${user.id}</td></tr>
                <tr><th>Name</th><td>${user.name}</td></tr>
                <tr><th>Username</th><td>${user.username}</td></tr>
                <tr><th>Email</th><td>${user.email}</td></tr>
                <tr><th>Address</th><td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td></tr>
                <tr><th>Geo</th><td>${user.address.geo.lat}, ${user.address.geo.lng}</td></tr>
                <tr><th>Phone</th><td>${user.phone}</td></tr>
                <tr><th>Website</th><td>${user.website}</td></tr>
                <tr><th>Company</th><td>${user.company.name}</td></tr>
                <tr><th>Catch Phrase</th><td>${user.company.catchPhrase}</td></tr>
                <tr><th>BS</th><td>${user.company.bs}</td></tr>
            </table>
            `;
      document.querySelector(`#loader`).classList.add(styles.hidden);
    }
  }

  return {
    pageContent,
    logic
  }
}
