async function loadMatrix() {
  const res = await fetch('data/plants.json?nocache=' + new Date().getTime());
  const data = await res.json();

  const { plants, weeks } = data;
  const container = document.querySelector('#matrix-scroll');


  // Create table
  const table = document.createElement('table');
  table.className = 'matrix';

 // Header row (plants)
const headerRow = document.createElement('tr');

// blank top-left corner cell (keeps alignment)
const corner = document.createElement('th');
corner.textContent = ""; // leave blank
headerRow.appendChild(corner);


  
  plants.forEach(plant => {
    const th = document.createElement('th');
    th.textContent = plant;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Rows for each week
  weeks.forEach(weekData => {
    const row = document.createElement('tr');

    const weekCell = document.createElement('th');
    const date = new Date(weekData.week);
    weekCell.textContent = date.toDateString();
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
        cell.textContent = "—"; // no update yet
      }

      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  container.appendChild(table);
}

loadMatrix();

