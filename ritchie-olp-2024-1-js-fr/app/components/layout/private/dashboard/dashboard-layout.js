import { navigateTo } from "../../../../Router";
import { logOut } from "../../../../helpers";
import { NavigationBar } from "../../../navigation-bar/navigation-bar";
import { SidebarMenu } from "../../../sidebar-menu/sidebar-menu";
import styles from './dashboard-layout.css';

export function DashboardLayout(pageContent, logic, footer, navbarData, sidebarData,) {

  // hace la peticion al backend.

  const root = document.getElementById('root');

  sidebarData = [
    { href: '/dashboard/settings', name: 'Settings' },
    { href: '/dashboard/users', name: 'Users' },
    { href: '/dashboard/challenges', name: 'Challenge' },
    { href: '/dashboard/audit', name: 'Audit'},
  ];

  navbarData = {
    user: 'Nicolas Picon',
    userImage: 'https://randomuser.me/api/portraits/men/75.jpg',
  };

  root.innerHTML = `
  <div class="${styles.container}">
    <div class="${styles.sidebar}">
      ${SidebarMenu(sidebarData)}
    </div>
    <div class="${styles.navbar}">
      ${NavigationBar(navbarData)}
    </div>
    <div class="${styles.main}">
      ${pageContent}
    </div>
  </div>
  `;

  logic();

  sidebarData.forEach(({ href, icon, label }) => {
    document.getElementById(href).addEventListener('click', () => {
      navigateTo(href);
    });
  });

  document.getElementById('aprendizaje').addEventListener('click',()=>{
    navigateTo('/dashboard/aprendizaje')
  })

  document.getElementById('logout').addEventListener('click', logOut)
  document.getElementById('homes').addEventListener('click', () => {
    navigateTo('/dashboard')
  });
  document.getElementById('profile').addEventListener('click', () => {
    navigateTo('/dashboard/profile');
  });
  document.getElementById('games').addEventListener('click', ()=> {
    navigateTo('/dashboard/games')
  })
}

// export function MyLayout(pageContent){
//   const root = document.getElementById('root')
//   const menu = `<nav>
//   <ul>
    
//   </ul>
// </nav>`
//   root.innerHTML = `
//     ${menu}
//     ${pageContent}
//   `
// }