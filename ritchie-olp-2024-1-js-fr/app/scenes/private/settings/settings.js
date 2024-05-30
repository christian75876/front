import styles from './settings.css';

export function SettingsScene() {
  
  const pageContent = `
      <h2 class='${styles.title2}'>Sección de usuarios</h2>
      <div class='${styles.formContainer }'>
        <form action="#" method="post" id="form">
            <h2 class='${styles.h2}'>Actualización de Contraseña</h2>
            <div class='${styles.formGroup}'>
                <label for="username"> Email</label>
                <input class="${styles.email}" type="text" id="username" name="username" disabled>
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
    const token = localStorage.getItem('token');
    
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
    const emailField = document.getElementById('username');
    if (emailField) { 
      emailField.value = `${user.email}`;
    }
    const form = document.getElementById('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // previene el comportamiento por default que es recargar la página
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      const updatePassword = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          "username": user.username,
          "email": user.email,
          "password": newPassword
        })
      });

      if (updatePassword.ok) {
        alert('Contraseña actualizada con éxito.');
      } else {
        const errorData = await updatePassword.json();
        alert(`Error al actualizar la contraseña: ${errorData.message}`);
      }
    });

    //Converción de la hora de base de datos a la hora en base a bogota
    const bogotaDate = new Date(user.updated_at).toLocaleString('sv-SE', { timeZone: 'America/Bogota' });
    // const timeZone = bogotaDate.replace(' ', 'T');
    // console.log(timeZone);
    const updatedAt = bogotaDate.split(' ')[0];
    alert(`La última modificación de contraseña fue: ${updatedAt}`);

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
    //para verificar la diferencia en los meses
    // console.log(`Diferencia en meses: ${diffInMonths}`);
  };

  return {
    pageContent,
    logic
  };
}
