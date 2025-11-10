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

    // top header row
    const headerRow = document.createElement('tr');
    
    // blank top-left corner cell
    const corner = document.createElement('th');
    corner.textContent = ""; // leave blank
    headerRow.appendChild(corner);
    
    // heading cell (spanning the rest of the columns)
    const headingCell = document.createElement('th');
    headingCell.textContent = "🌱 My Plant Tracker";
    headingCell.colSpan = plants.length; // span across all plant columns
    headingCell.className = 'main-heading';
    headerRow.appendChild(headingCell);
    
    table.appendChild(headerRow);
    
    // now add second row for plant names
    const nameRow = document.createElement('tr');
    const emptyTh = document.createElement('th'); // keep column alignment
    emptyTh.textContent = "";
    nameRow.appendChild(emptyTh);
    
    plants.forEach(plant => {
      const th = document.createElement('th');
      th.textContent = plant;
      nameRow.appendChild(th);
    });
    table.appendChild(nameRow);


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
          // --- pop sound on hover ---
          const popSound = new Audio('data/sounds/pop.mp3');
          popSound.volume = 0.3;

          img.addEventListener('mouseenter', () => {
          const sound = popSound.cloneNode(); // allows rapid replays
          sound.play().catch(() => {}); // ignore autoplay errors
});


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

