async function loadMatrix() {
  try {
    const res = await fetch('data/plants.json?nocache=' + new Date().getTime());
    if (!res.ok) throw new Error('Failed to fetch JSON');

    const data = await res.json();
    const { plants, weeks } = data;

    const container = document.querySelector('#matrix-scroll');
    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'matrix';

    // header
    const headerRow = document.createElement('tr');
    const corner = document.createElement('th');
    corner.textContent = "";
    headerRow.appendChild(corner);

    plants.forEach(plant => {
      const th = document.createElement('th');
      th.textContent = plant;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // body
    weeks.forEach(weekData => {
      const row = document.createElement('tr');
      const weekCell = document.createElement('th');
      const date = new Date(weekData.week);
      const options = { day: 'numeric', month: 'short' };
      weekCell.textContent = date.toLocaleDateString('en-GB', options).replace('.', '');

      row.appendChild(weekCell);

      plants.forEach(plant => {
        const cell = document.createElement('td');
        const update = weekData.updates[plant];

        if (update) {
          const img = document.createElement('img');
          img.src = update.image;
          img.alt = plant;
          img.className = 'plant-img';

          const note = document.createElement('p');
          note.textContent = update.note;

          cell.appendChild(img);
          cell.appendChild(note);
        } else {
          cell.textContent = "—";
        }

        row.appendChild(cell);
      });

      table.appendChild(row);
    });

    container.appendChild(table);
  } catch (err) {
    console.error('Error loading matrix:', err);
  }
}

loadMatrix();


loadMatrix();

