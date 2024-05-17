import styles from './sidebar-menu.css';

export function SidebarMenu(data = []) {

  const path = window.location.pathname;

  // if path === href, add active class
  data.forEach((item) => {
    if (path === item.href) {
      item.active = true;
    }
  });

  return `
    <aside class="${styles["sidebar-menu"]}">
      <ul>
        ${data.map((item) => `
          <li class="${item.active ? styles.active : ''}">
            <button id="${item.href}" type="button">${item.name}</button>
          </li>
        `).join('')}
      </ul>
    </aside>
  `;
}

// import { logOut } from "../../helpers/log-out";
// import { navigateTo } from "../../Router";
// import "../sidebar-menu";

// if (!customElements.get("side-bar")) {
//   class SideBar extends HTMLElement {
//     constructor() {
//       super();
//       const shadow = this.attachShadow({ mode: "open" });
//       const nav = document.createElement("nav");
//       nav.classList.add("nav");

//       nav.innerHTML = `
//       <style>

//       @keyframes checked-anim {
//           50% {
//               width: 3000px;
//               height: 3000px;
//           }
//           100% {
//               width: 100%;
//               height: 100%;
//               border-radius: 0;
//           }
//       }
//       @keyframes not-checked-anim {
//           0% {
//               width: 3000px;
//               height: 3000px;
//           }
//       }
//       li, a {
//           margin: 75px 0 -55px 0;
//           color: red;
//           font: 14pt "Roboto", sans-serif;
//           font-weight: 700;
//           line-height: 1.8;
//           text-decoration: none;
//           text-transform: none;
//           list-style: none;
//           outline: 0;
//           display: none;
//       }
//       li {
//           width: 230px;
//           text-indent: 56px;}
//       a:focus {
//           display: block;
//           color: #333;
//           background-color: #eee;
//           transition: all .5s;
//       }
//       aside {
//           position: absolute;
//           color: white;
//           top: 35%;
//           right: 10%;
//           text-align: right;
//       }
//       h1 {
//           line-height: 0;
//           font-size: 4vw;
//           font-weight: 700;
//       }
//       h3 {
//           float: right;
//           line-height: .3;
//           font-size: 2.5vw;
//           font-weight: lighter;
//       }
//       h4 {
//           float: left;
//           margin-left: -2%;
//           font-size: 1.5vw;
//           font-weight: lighter;
//       }
      
//       html, body {
//           margin: 0;
//           padding: 0;
//           background-color: #03A9F4;
//           font-family: 'Roboto', sans-serif;
//           overflow: hidden;
//       }
      
//       #trigger, #burger, #burger:before, #burger:after {
//           position: absolute;
//           top: 25px;
//           left: 25px;
//           background: #03A9F4;
//           width: 30px;
//           height: 5px;
//           transition: .2s ease;
//           cursor: pointer;
//           z-index: 1;
//       }
//       #trigger {
//           height: 25px;
//           background: none;
//       }
//       #burger:before {
//           content: " ";
//           top: 10px;
//           left: 0;
//       }
//       #burger:after {
//           content: " ";
//           top: 20px;
//           left: 0;
//       }
//       #menu-toggle:checked + #trigger + #burger {
//           top: 35px;
//           transform: rotate(180deg);
//           transition: transform .2s ease;
//       }
      
//       #menu-toggle:checked + #trigger + #burger:before {
//           width: 20px;
//           top: -2px;
//           left: 18px;
//           transform: rotate(45deg) translateX(-5px);
//           transition: transform .2s ease;
//       }
//       #menu-toggle:checked + #trigger + #burger:after {
//           width: 20px;
//           top: 2px;
//           left: 18px;
//           transform: rotate(-45deg) translateX(-5px);
//           transition: transform .2s ease;
//       }
//       #menu {
//           position: absolute;
//           margin: 0; padding: 0;
//           width: 110px;
//           height: 110px;
//           background-color: #fff;
//           border-bottom-right-radius: 100%;
//           box-shadow: 0 2px 5px rgba(0,0,0,0.26);
//           animation: not-checked-anim .2s both;
//           transition: .2s;
//       }
//       #menu-toggle:checked + #trigger + #burger + #menu {
//           animation: checked-anim 1s ease both;
//       }
//       #menu-toggle:checked + #trigger ~ #menu > li, a {
//           display: block;
//       }
//       [type="checkbox"]:not(:checked), [type="checkbox"]:checked {
//           display: none;
//       }</style>
//       <input type="checkbox" id="menu-toggle"/>
//       <label id="trigger" for="menu-toggle"></label>
//       <label id="burger" for="menu-toggle"></label>
//       <ul id="menu">
//       <li class="list_item nav_item" id="home"><a href="#" class="list_item">🏠 Home</a></li>
//       <li class="list_item nav_item"><a href="#" class="list_item">🎮 Juegos</a></li>
//       <li class="list_item nav_item"><a href="#" class="list_item">🏆 Ligas</a></li>
//       <li class="list_item nav_item"><a href="#" class="list_item">🏅 Desafíos</a></li>
//       <li class="list_inside">
//                       <button id="logout">Logouts</button>
//                       <button id="reports">Audit trail</button>
//                       <button id="users">Usuarios</button>
//               </li>
//       </ul> 
//       <ul class="list">
      
//           <ul>
              
//           </ul>
//       </li>
//   </ul>
       
//         `;
//       shadow.appendChild(nav); 
//       //Logout
//       const logOuts = shadow.getElementById("logout");
//       logOuts.addEventListener("click", () => logOut());
//       //Reports
//       const reportsButton = shadow.getElementById("reports");
//       reportsButton.addEventListener("click", () =>
//         navigateTo("/dashboard/audit")
//       );
//       // Home
//       const userDasboard = shadow.getElementById("users");
//       userDasboard.addEventListener("click", () =>
//         navigateTo("/dashboard/user")
//       );
//       let Home = shadow.getElementById("home");
//       Home.addEventListener("click", () => navigateTo("/dashboard"));

//     }
//   }

//   customElements.define("side-bar", SideBar);
// }
