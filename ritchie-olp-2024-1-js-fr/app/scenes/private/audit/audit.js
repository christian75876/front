import styles from './audit.css';

export function AuditScene() {
  const pageContent = `
    <h2 id="my-h2">Audit Trail</h2>
    <div class="${styles.table}">
      <table>
        <thead>
          <tr id="head">
          <th><a>User<span class="icon">🔍</span></a></th>
          <th><a>Date and time<span class="icon">🔍</span></a></th>
          <th><a>Activity<span class="icon">🔍</span></a></th>
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
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.email}</td>
        <td>${item.fecha}</td>
        <td>${item.tipo}</td>
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