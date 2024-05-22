import { DashboardLayout } from '../../../components/layout/private/dashboard/dashboard-layout';
import styles from './settings.css';

export function SettingsScene() {
  const email = localStorage.getItem('email')
  
  const password = localStorage.getItem('password') 


  const pageContent = `
      <h2 class='${styles['title-h2']}'>Seccion Usuarios</h2>
      <div class='${styles['form-container']}'>
        <form action="#" method="post">
            <h2>Actualización de Contraseña</h2>
            <div class='${styles['form-group']}'>
                <label for="username"> Email</label>
                <input type="text" id="username" name="username" value=${email} disabled>
            </div>
            <div class='${styles['form-group']}'>
                <label for="current-password">Contraseña Actual</label>
                <input type="password" id="current-password" name="current-password" required>
            </div>
            <div class='${styles['form-group']}'>
                <label for="new-password">Nueva Contraseña</label>
                <input type="password" id="new-password" name="new-password" required>
            </div>
            <div class='${styles['form-group']}'>
                <label for="confirm-password">Verificación de Nueva Contraseña</label>
                <input type="password" id="confirm-password" name="confirm-password" required>
            </div>
            <button type="submit">Actualizar</button>
        </form>
  </div>
    `;

  const logic = async () => {
    const token = localStorage.token;
    
    let payload = token.split('.')[1];
    let decodedPayload = JSON.parse(atob(payload));
    let id = decodedPayload.id;

    const resp = await fetch(`http://localhost:4000/api/users/${id}/`, {
      method: 'GET',
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
    }});
    const user = await resp.json();
    const email = document.getElementById('username');
    email.value = `${user.email}`

  }

  return {
    pageContent,
    logic
  }
}