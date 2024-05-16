// import "./audit.css";
import "../../../components/navigation-bar/navigation-bar";

export function AuditScene() {
  const root = document.getElementById("root");

  root.innerHTML = `
    <navigation-bar id="navigation-bar"></navigation-bar> 
    <h2>Audit Trail</h2>
    <div id="table">
        <table>
            <thead>
              <tr id="head">
								<th><a>Date and time<span class"icon">🔍</span></a></th>
                <th><a>User<span class"icon">🔍</span></a></th>
								<th><a>Role<span class"icon">🔍</span></a></th>
								<th><a>Clan<span class"icon">🔍</span></a></th>
                <th><a>LogIn Time<span class"icon">🔍</span></a></th>
                <th><a>LogOut Time<span class"icon">🔍</span></a></th>
                <th><a>Event<span class"icon">🔍</span></a></th>
              </tr>
            </thead>
            <section id="filter" style="display: none" ></section>
            <tbody>
              <tr>
                <td>hola</td>
                <td>hola</td>
                <td>hola</td>
                <td>hola</td>
                <td>hola</td>
                <td>hola</td>
                <td>hola</td>
              </tr>
            </tbody>
        </table>
    </div>
    `;

  


  const menus = document.querySelectorAll('a');
  const element = document.getElementById('filter');
  let aux2 = false;
  
  menus.forEach(menu => {
    menu.addEventListener('click', () => {
      if (aux2) return;
      element.style.display = 'block';
      const form = `
      <form id="filterForm" class="filter-form">
        <label class="filter-label" for="filterType">Filter By:</label>
        <select class="filter-input" id="filterType" name="filterType">
          <option value="userId">User ID</option>
          <option value="clan">Clan</option>
          <option value="role">Role</option>
        </select>

        <label class="filter-label" for="filterValue">Filter Value:</label>
        <input class="filter-input" type="text" id="filterValue" name="filterValue">

        <label class="filter-label" for="sortOrder">Sort Order:</label>
        <select class="filter-input" id="sortOrder" name="sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button type="submit" class="filter-button">Filter</button>
        <button id="closeFormButton" class="filter-button">Close</button>
      </form>
    `;
      element.innerHTML += form;
      aux2 = true;
  
      const closeButton = document.getElementById('closeFormButton');
      closeButton.addEventListener('click', () => {
        aux2 = false;
        element.style.display = 'none';
      });
    });
  });
  


}


