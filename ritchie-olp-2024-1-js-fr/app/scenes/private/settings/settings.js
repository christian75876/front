import { DashboardLayout } from '../../../components/layout/private/dashboard/dashboard-layout';
import styles from './settings.css';

export function SettingsScene() {
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

const logic = async () => {
const token = localStorage.token;
let payload = token.split('.')[1];
let decodedPayload = JSON.parse(atob(payload));
let id = decodedPayload.id;

const resp = await fetch(`http://localhost:4000/api/users/${id}/`, {
method: 'GET',
headers: {
"Authorization": `Bearer ${localStorage.getItem('token')}`
}
});
const user = await resp.json();
const email = document.getElementById('username');
email.value = `${user.email}`;

const passwordUpdateForm = document.getElementById('passwordUpdateForm');
passwordUpdateForm.addEventListener('submit', async (event) => {
event.preventDefault();

const newPassword = document.getElementById('new-password').value;
const confirmPassword = document.getElementById('confirm-password').value;

if (newPassword !== confirmPassword) {
alert('Las contraseñas no coinciden');
return;
}

try {
const response = await fetch(`http://localhost:4000/api/users/${id}/updatePassword`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
"Authorization": `Bearer ${localStorage.getItem('token')}`
},
body: JSON.stringify({ newPassword })
});

if (!response.ok) {
throw new Error('Error al actualizar la contraseña');
}

alert('Contraseña actualizada exitosamente');
} catch (error) {
console.error('Error:', error);
alert('Error al actualizar la contraseña');
}
});

// Solicitar la actualización de la contraseña cada dos minutos
setInterval(() => {
alert('Por favor, actualice su contraseña.');
// Mostrar el formulario de actualización
const formContainer = document.querySelector(`.${styles.formContainer}`);
formContainer.style.display = 'block';
}, 60000); // 120000 ms = 2 minutos
}

return {
pageContent,
logic
}
}