import { DashboardLayout } from '../../../components/layout/private/dashboard/dashboard-layout';
import styles from './settings.css';

// Función que representa la escena de configuración de usuario
export function SettingsScene() {
  
  // Contenido de la página HTML
  const pageContent = `
    <h2 class='${styles.title2}'>Sección de usuarios</h2>
    <div class='${styles.formContainer}'>
      <form id="passwordUpdateForm" action="#" method="post">
        <h2 class='${styles.h2}'>Actualización de Contraseña</h2>
        <div class='${styles.formGroup}'>
          <label for="username">Email</label>
          <input type="text" id="username" name="username" disabled>
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

  // Función lógica que maneja la interacción y las operaciones de la página
  const logic = async () => {
    // Obtiene el token del almacenamiento local
    const token = localStorage.token;
    
    // Decodifica el payload del token JWT para obtener el ID del usuario
    let payload = token.split('.')[1];
    let decodedPayload = JSON.parse(atob(payload));
    let id = decodedPayload.id;

    // Realiza una solicitud GET al servidor para obtener los datos del usuario
    const resp = await fetch(`http://localhost:4000/api/users/${id}/`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Convierte la respuesta a JSON
    const user = await resp.json();
    
    // Muestra el email del usuario en el campo de entrada correspondiente
    const email = document.getElementById('username');
    email.value = `${user.email}`;

    // Añade un listener al formulario para manejar el evento de submit
    const passwordUpdateForm = document.getElementById('passwordUpdateForm');
    passwordUpdateForm.addEventListener('submit', async (event) => {
      // Previene la acción por defecto del formulario (recargar la página)
      event.preventDefault();

      // Obtiene los valores de las contraseñas del formulario
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      // Verifica si las contraseñas coinciden
      if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      // Intenta actualizar la contraseña en el servidor
      try {
        const response = await fetch(`http://localhost:4000/api/users/${id}/updatePassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ newPassword }) // Envía la nueva contraseña en el cuerpo de la solicitud
        });

        // Verifica si la respuesta del servidor es correcta
        if (!response.ok) {
          throw new Error('Error al actualizar la contraseña');
        }

        // Muestra un mensaje de éxito al usuario
        alert('Contraseña actualizada exitosamente');
      } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error('Error:', error);
        alert('Error al actualizar la contraseña');
      }
    });

    // Configura un intervalo para solicitar la actualización de la contraseña cada dos minutos
    setInterval(() => {
      alert('Por favor, actualice su contraseña.');
      // Muestra el formulario de actualización
      const formContainer = document.querySelector(`.${styles.formContainer}`);
      formContainer.style.display = 'block';
    }, 120000); // 120000 ms = 2 minutos
  }

  // Retorna el contenido de la página y la lógica para ser utilizada en el componente
  return {
    pageContent,
    logic
  }
}
