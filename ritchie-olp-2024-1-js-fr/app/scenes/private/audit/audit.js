import styles from './audit.css';

export function AuditScene() {
  const pageContent = `
    <h2 id="my-h2">Audit Trail</h2>
    <div class="${styles.table}">
      <table>
        <thead>
          <tr id="head">
          <th><a>User<span class="icon">🔍</span></a></th>
          <th><a>Date<span class="icon">🔍</span></a></th>
          <th><a>Hour<span class="icon">🔍</span></a></th>
          <th><a>Activity<span class="icon">🔍</span></a></th>
          <th><a>New user<span class="icon">🔍</span></a></th>
          <th><a>New email<span class="icon">🔍</span></a></th>
          </tr>
        </thead>
        <section id="filter" style="display: none"></section>
        <tbody id="audit-tbody">
          <!-- Rows will be populated here -->
        </tbody>
      </table>
    </div>
  `;

  const fetchAuditData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/audit', {
      method: 'GET',
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
  }});
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const data = await response.json();
      populateTable(data);
    } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
    }
  };

  const populateTable = (data) => {
    const tbody = document.getElementById('audit-tbody');
    tbody.innerHTML = '';
    data.forEach((item) => {
      const utcDate = new Date(item.fecha);
      const colombiaTimeOffset = -5 * 60; // Colombia está en UTC-5
      const colombiaDate = new Date(utcDate.getTime() + colombiaTimeOffset * 60 * 1000);

      const datePart = colombiaDate.toISOString().split('T')[0];
      const timePart = colombiaDate.toISOString().split('T')[1].slice(0, 8);
      const row = document.createElement('tr');

      const newUser = item.newUser !== undefined ? item.newUser : ' ';
      const newEmail = item.newEmail !== undefined ? item.newEmail : ' ';

      row.innerHTML = `
        <td>${item.email}</td>
        <td>${datePart}</td>
        <td>${timePart}</td>
        <td>${item.tipo}</td>
        <td>${newUser}</td>
        <td>${newEmail}</td>
      `;
     
      tbody.appendChild(row);
    });
  };

  const logic = () => {
    fetchAuditData();

    const menus = document.querySelectorAll('a');
    const element = document.getElementById('filter');
    let aux2 = false;

    menus.forEach((menu) => {
      menu.addEventListener('click', () => {
        if (aux2) return;
        element.style.display = 'block';
        element.innerHTML='';
        const form = `
          <form id="filterForm" class="${styles["filter-form"]}">
            <label class="filter-label" for="filterType">Filter By:</label>
            <select class="filter-input" id="filterType" name="filterType">
              <option value="userId">User</option>
              <option value="clan">Date</option>
              <option value="role">Hour</option>
              <option value="role">Activity</option>
            </select>

            <label class="filter-label" for="filterValue">Filter Value:</label>
            <input class="filter-input" type="text" id="filterValue" name="filterValue">

            <label class="filter-label" for="sortOrder">Sort Order:</label>
            <select class="filter-input" id="sortOrder" name="sortOrder">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <button type="submit" class="${styles.btn}">Filter</button>
            <button id="closeFormButton" class="${styles.btn}">Close</button>
          </form>
        `;
        element.innerHTML += form;
        aux2 = true;

        const closeButton = document.getElementById('closeFormButton');
        closeButton.addEventListener('click', (event) => {
          event.preventDefault();
          aux2 = false;
          element.style.display = 'none';
        });
      });
    });
  };

  return {
    pageContent,
    logic
  };
}