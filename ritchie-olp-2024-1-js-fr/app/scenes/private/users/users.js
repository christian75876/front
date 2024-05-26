import { navigateTo } from '../../../Router';
import styles from './users.css';
import { Background, BackgroundNone } from '../../../components/form-components/background';

export function UserScene(params) {

  let pageContent = `
    <div class="${styles.contenedorUser}">
      <button class="${styles.btn}" id="btn">New User</button>
      <section class="${styles.message}" id="messageSection" style="display: none;"></section>
      <h2 class=${styles['page-title']}>Bienvenido a usuarios</h2>
      <p>Desde Usuarios</p>
    </div>
    <div id="user-info" class="${styles['user-info']}"></div>
    <div class="${styles.loader}" id="loader"></div>
    <div id="background"></div>
  `;

  let logic = async () => {
    const resp = await fetch('http://localhost:4000/api/users/all/', {
      method: 'GET',
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
  }});
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
              <td>${user.email}</td>
              <td>${user.username}</td>
              <td>
              <button id="${user.id}" class="${styles['btn-see-more']}">Ver más</button>              
                <button id="${user.id}" class="${styles['btn-delete']}">Delete</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    `;

    let aux = false;
    const newUser = document.getElementById('btn');
    newUser.addEventListener('click', () => {
      if (aux) return;
      aux = true;
      const overlay = document.getElementById('background');
      Background(overlay);
      const messageSection = document.getElementById('messageSection');
      messageSection.style.display = 'block';

      const formMenu = `
        <form id="newUserForm" class="${styles.userForm}">
          <label class="labelUser" for="username">User:</label>
          <input class="${styles.inputUser}" type="text" id="username" name="username" required>

          <label class="labelUser" for="email">Email:</label>
          <input class="${styles.inputUser}" type="text" id="email" name="email" required>

          <label class="labelUser" for="password">Password:</label>
          <input class="${styles.inputUser}" type="password" id="password" name="password" required>

          <label class="labelUser" for="confirmPassword">Confirmar Contraseña:</label>
          <input class="${styles.inputUser}" type="password" id="confirmPassword" name="confirmPassword" required>

          <button class="${styles.btn} ${styles.btnFor}" type="submit">Crear Usuario</button>
          <button class="${styles.btn} ${styles.btnFor}" id="closeMessage" type="button">Cerrar</button>
        </form>
      `;
      messageSection.innerHTML = formMenu;

      const closeButton = document.getElementById('closeMessage');
      closeButton.addEventListener('click', () => {
        aux = false;
        BackgroundNone();
        messageSection.style.display = 'none';
      });

      const newUserForm = document.getElementById('newUserForm');
      newUserForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(newUserForm);
        const userData = {
          username: formData.get('username'),
          email: formData.get('email'),
          password: formData.get('password')
        };

        // if (userData.password !== formData.get('confirmPassword')) {
        //   alert('Las contraseñas no coinciden');
        //   return;
        // }

        try {
          const response = await fetch('http://localhost:4000/api/users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userData)
          });

          if (!response.ok) {
            throw new Error('Error en la creación del usuario');
          }

          alert('Usuario creado exitosamente');
          aux = false;
          BackgroundNone();
          messageSection.style.display = 'none';
          logic();
        } catch (error) {
          console.error('Error:', error);
          alert('El usuario ya está registrado en la plataforma.'+ error);
        }
      });
    });

    document.querySelectorAll(`.${styles['btn-delete']}`).forEach(btn =>{
      btn.addEventListener('click', async (e) =>{
        let aux =confirm('¿Estás seguro de que quieres eliminar este usuario?')
        if(!aux){
          return
        }
        try {
          const response = await fetch(`http://localhost:4000/api/users/${e.target.id}`,
            {
              method: 'DELETE',
              headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }});
            if(!response.ok){
              throw new Error('Error al eliminar el usuario');
            }
            alert('Usuario eliminado exitosamente');
            logic(); //Actualizar la lista de usuarios...
        } catch (error) {
          console.error('Error', error);
          alert('Error al eliminar el usuario');
        };
      }); 
    });

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
      const resp = await fetch(`http://localhost:4000/api/users/${userId}/`, {
        method: 'GET',
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      });
      const user = await resp.json();
      const userInfo = document.getElementById('user-info');
      userInfo.innerHTML = `
        <table class="${styles['user-details-table']}">
          <tr><th>ID</th><td>${user.id}</td></tr>
          <tr><th>Name</th><td>${user.username}</td></tr>
          <tr><th>Email</th><td>${user.email}</td></tr>
        </table>
      `;
      document.querySelector(`#loader`).classList.add(styles.hidden);
    }
  }

  return {
    pageContent,
    logic
  };
}