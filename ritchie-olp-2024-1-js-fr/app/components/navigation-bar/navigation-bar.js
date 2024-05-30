import styles from './navigation-bar.css';
import logoRiwi from '../../assets/img/logoRiwi.png'


export function NavigationBar(
  { user, userImage } =
    { user: 'User', userImage: 'https://via.placeholder.com/150' }
) {

  const letters = localStorage.name.split('');
  const letter = letters[0] + letters[1];
  console.log(letter)
  let aux = localStorage.name.split('@')[0];

  if(localStorage.name === undefined) aux = 'username'

  return `
  <div class="${styles.container}" >
  <img src="${logoRiwi}" alt="User image" class="${styles.icono}">
    <ul class="${styles.list}">
        <li  class="${styles.list_item}" id="homes"> <a class="${styles.list_a}"  href="#"  >Home</a></li>
        <li  class="${styles.list_item}" id ="aprendizaje"> <a class="${styles.list_a}"  href="#"  > Learning</a></li>
        <li  class="${styles.list_item}" id="games"> <a class="${styles.list_a}"  href="#"  > Games</a></li>    
    </ul>
    <li class="${styles.list_item}" id="profile">
      <p>${aux}</p>
      <div class="${styles.img}">${letter}</div>
      <button class="${styles.button}" id="logout">Logout</button>   
    </li>
  </div>

  `;

  }
