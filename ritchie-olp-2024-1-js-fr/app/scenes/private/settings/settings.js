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

  // Aquí se define una función asíncrona llamada logic. Esta función se encargará de manejar toda la lógica de interacción y operaciones necesarias para la página de configuración de usuario.
  const logic = async () => {
    // Obtiene el token del almacenamiento local
    const token = localStorage.token;
    
    // Decodifica el payload del token JWT para obtener el ID del usuario
    //Extracción del payload del token: Un token JWT se compone de tres partes separadas por puntos (.): el encabezado, el payload y la firma. Aquí, la segunda parte (payload) se extrae dividiendo el token usando el separador de puntos (.)
    let payload = token.split('.')[1];
    //atob(payload) que convierte la cadena base64 en una cadena de texto legible. Luego, se parsea esa cadena decodificada a un objeto JavaScript usando JSON.parse.
    let decodedPayload = JSON.parse(atob(payload));
    // Una vez decodificado el payload, se extrae el id del usuario del objeto resultante
    let id = decodedPayload.id;

    // Realiza una solicitud GET al servidor para obtener los datos del usuario
    //resp se decalara una constante para almacenar la respuesta de la solicitud fetch
    //mediante la palabra clave 'aweit' espera la resolucion de la promesa devuelta por 'fetch'
    const resp = await fetch(`http://localhost:4000/api/users/${id}/`, {
// se especifica el metodo HTTP  - get para obtener los datos del servidor 
      method: 'GET',
      // se especifica el encabezado de la solicitud - 'Authorization' para enviar el token del usuario --- Bearer: Este es un tipo de token de autenticación. Indica que se está enviando un token de acceso. -- localStorage.getItem('token'): Se obtiene el token JWT almacenado en el localStorage. Este token se añade a la cabecera de autorización para autenticar la solicitud.
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Convierte la respuesta a JSON
    // constante user para almacenar los dato del usurio
    // convercion para poder leer el json en js 
    const user = await resp.json();
    
    // Muestra el email del usuario en el campo de entrada correspondiente
    // document.getElementById('username'): Obtiene el elemento del DOM con el id 'username'
    // value: Obtiene o establece el valor del elemento. En este caso, se obtiene el valor del campo de entrada 'username' y se lo asigna a la constante 'email'
    // user.email: Se obtiene el email del usuario de la constante 'user' y se lo asigna a la constante 'email'
    // `${user.email}`: Interpolación de cadenas. En este caso, se asigna el valor de la constante 'user.email' a la constante 'email'
    const email = document.getElementById('username');
    email.value = `${user.email}`;

    // Añade un listener al formulario para manejar el evento de submit
    //document.getElementById('passwordUpdateForm'): Se utiliza esta función del DOM (Document Object Model) para obtener el elemento del formulario con el ID passwordUpdateForm.
    const passwordUpdateForm = document.getElementById('passwordUpdateForm');
    passwordUpdateForm.addEventListener('submit', async (event) => {
      //Define una función asíncrona que se ejecutará cuando se dispare el evento de submit. El parámetro event representa el objeto del evento.
      // Previene la acción por defecto del formulario (recargar la página)
      event.preventDefault();//Llama a este método para prevenir la acción por defecto del formulario, que sería recargar la página. Esto permite manejar la lógica del formulario sin que la página se recargue.

      // Obtiene los valores de las contraseñas del formulario
      //document.getElementById('new-password'): Utiliza la función getElementById del DOM (Document Object Model) para obtener una referencia al elemento de entrada HTML con el ID new-password.
      // .value: Accede al valor del elemento de entrada obtenido. Este valor es el texto que el usuario ha ingresado en el campo de entrada de la nueva contraseña.
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
          method: 'POST', //POST: Se utiliza el método HTTP POST, que indica que se está enviando información al servidor para ser procesada.
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
