import { DashboardLayout } from '../../../components/layout/private/dashboard/dashboard-layout';
import styles from './settings.css';

export function SettingsScene() {
  
  const pageContent = `
      <h2 class='${styles.title2}'>Sección de usuarios</h2>
      <div class='${styles.formContainer }'>
        <form action="#" method="post">
            <h2 class='${styles.h2}'>Actualización de Contraseña</h2>
            <div class='${styles.formGroup}'>
                <label for="username"> Email</label>
                <input class="${styles.email}" type="text" id="username" name="username" disabled>
            </div>
            <div class='${styles.formGroup}'>
                <label for="current-password">Contraseña Actual</label>
                <input type="password" id="current-password" name="current-password" required>
            </div>
            <div class='${styles.formGroup}'>
                <label for="new-password">Nueva Contraseña</label>
                <input type="password" id="new-password" name="new-password" required>
            </div>
            <div class='${styles.formGroup}'>
                <label for="confirm-password">Verificación de Nueva Contraseña</label>
                <input type="password" id="confirm-password" name="confirm-password" required>
            </div>
            <button class='${styles.button}' type="submit">Actualizar</button>
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
    email.value = `${user.email}`;

    const updatedAt = user.updated_at.split('T')[0];

    alert(`La ultima modicificacion de contraseña fue: ${updatedAt}`);

    function monthDiff(d1, d2) {
      let months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    }

    const updatedDate = new Date(updatedAt);
    const currentDate = new Date();

    const diffInMonths = monthDiff(updatedDate, currentDate);

    if (diffInMonths > 3) {
      alert('La última actualización fue hace más de 3 meses.');
    }
    
    console.log(`Diferencia en meses: ${diffInMonths}`);

  }

  return {
    pageContent,
    logic
  }
}