import { navigateTo } from '../../../../../Router.js';
import { formValidator } from '../../../../../helpers';
import style from './login-form.css';
import logoRiwi from '../../../../../assets/img/logoRiwi.png'
import day from '../../../../../assets/img/day.jpg'
import night from '../../../../../assets/img/night.jpg'


export async function LoginFormComponent() {
   const root = document.getElementById('root');

  const fechaActual = new Date();
  let hora = fechaActual.getHours();
  console.log(hora);
  let img = day;

  //dependiendo de la hora va a mostrar una imagen o la otra!!
  if(hora > 12) img = night;

  console.log(img);

  root.innerHTML = `
    <div class="${style.contenedor}">
      <form id="loginForm" class="${style.form}">
      <h2>Login</h2>
        <label for="email" class="${style.label}">Email:</label>
        <input type="text" id="email" name="email" autocomplete="email" class="${style['input-email']}">
        <label for="password" class="${style.label}">Password:</label>
        <input type="password" id="password" name="password" autocomplete="current-password" class="${style['input-password']}">
        <button type="submit" class="${style['button-send']}">Login</button>
      </form>
      <div class="${style["contenedor-img"]}">
        <img src="${img}" all="day or night" class="${style.img}">
      </div>
    </div>
      
      <img class="${style.logoRiwi}" src="${logoRiwi}" alt="logo">
      <h4 class="${style.title}">Derechos Reservados &copy; RIWI Clan Ritchie</h4>
          <div class="${style.shade}"></div>
          <div class="${style.shade2}" id="starContainer"></div>
      </div>
    `;

  
  
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // previene el comportamiento por default que es, recargar la pagina
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!formValidator(email, password)) {
      alert('Please fill in all fields');
      return;
    }

    const token = await login(email, password);
    if (token) {
      localStorage.setItem('token', token);
      navigateTo('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  });

  // Crear estrellas después de que el DOM esté listo
  createStarsEffect();
}

async function login(email, password) {
  try {
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
}

// Función para crear el efecto de estrellas
function createStarsEffect() {
  const starContainer = document.getElementById('starContainer');
  const numStars = 400; // Number of stars

  function createStar() {
    const star = document.createElement('div');
    star.classList.add(style.star);
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random duration between 2s and 5s
    starContainer.appendChild(star);
  }

  for (let i = 0; i < numStars; i++) {
    createStar();
  }



  
}
