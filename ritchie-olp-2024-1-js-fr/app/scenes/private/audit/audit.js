import styles from './audit.css';

export function AuditScene() {
  let auditData = []; // Variable para almacenar todos los datos

  const pageContent = `
    <h2 id="my-h2">Audit Trail</h2>
    <div class="${styles.table}">
      <table>
        <thead>
          <tr id="head">
            <th><a href="#" data-sort="email">User<span class="icon">🔍</span></a></th>
            <th><a href="#" data-sort="date">Date<span class="icon">🔍</span></a></th>
            <th><a href="#" data-sort="time">Hour<span class="icon">🔍</span></a></th>
            <th><a href="#" data-sort="activity">Activity<span class="icon">🔍</span></a></th>
            <th><a href="#" data-sort="newUser">New user<span class="icon">🔍</span></a></th>
            <th><a href="#" data-sort="newEmail">New email<span class="icon">🔍</span></a></th>
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
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      auditData = await response.json(); // Guardar los datos en la variable
      populateTable(auditData); // Llenar la tabla con los datos recibidos
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

  const sortAndFilterData = (filterType, filterValue, sortOrder) => {
    let filteredData = auditData;

    if (filterType && filterValue) {
      filteredData = filteredData.filter(item => 
        item[filterType]?.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (filterType && sortOrder) {
      filteredData.sort((a, b) => {
        const aValue = a[filterType]?.toString().toLowerCase() || '';
        const bValue = b[filterType]?.toString().toLowerCase() || '';
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    populateTable(filteredData);
  };

  const logic = () => {
    fetchAuditData();

    const menus = document.querySelectorAll('a[data-sort]');
    const element = document.getElementById('filter');
    let aux2 = false;

    menus.forEach((menu) => {
      menu.addEventListener('click', (event) => {
        event.preventDefault();
        if (aux2) return;
        const sortField = menu.getAttribute('data-sort');
        element.style.display = 'block';
        element.innerHTML = '';
        const form = `
          <form id="filterForm" class="${styles["filter-form"]}">
            <label class="filter-label" for="filterType">Filter By:</label>
            <select class="filter-input" id="filterType" name="filterType">
              <option value="email">User</option>
              <option value="date">Date</option>
              <option value="time">Hour</option>
              <option value="activity">Activity</option>
              <option value="newUser">New user</option>
              <option value="newEmail">New email</option>
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

        const filterForm = document.getElementById('filterForm');
        filterForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const filterType = document.getElementById('filterType').value;
          const filterValue = document.getElementById('filterValue').value;
          const sortOrder = document.getElementById('sortOrder').value;
          sortAndFilterData(filterType, filterValue, sortOrder);
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
