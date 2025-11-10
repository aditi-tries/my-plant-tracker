// Preload the pop sound once (reuse for all hovers)
const popSound = new Audio('data/sounds/pop.mp3');

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

    // Header row for plant names (with an empty top-left cell)
    const nameRow = document.createElement('tr');
    const emptyTh = document.createElement('th');
    emptyTh.textContent = "";
    nameRow.appendChild(emptyTh);

    plants.forEach(plant => {
      const th = document.createElement('th');
      th.textContent = plant;
      nameRow.appendChild(th);
    });

    table.appendChild(nameRow);

    // Table body (weeks)
    weeks.forEach(weekData => {
      const row = document.createElement('tr');

      // Date column
      const weekCell = document.createElement('th');
      const date = new Date(weekData.week);
      const options = { day: 'numeric', month: 'short' };
      weekCell.textContent = date
        .toLocaleDateString('en-GB', options)
        .replace('.', '');
      row.appendChild(weekCell);

      // Cells for each plant
      plants.forEach(plant => {
        const cell = document.createElement('td');
        const update = weekData.updates[plant];

        if (update) {
          const img = document.createElement('img');
          img.src = update.image;
          img.alt = plant;
          img.className = 'plant-img';
          img.loading = 'lazy';

          // Pop sound on hover (soft randomized volume)
          img.addEventListener('mouseenter', () => {
            const sound = popSound.cloneNode();
            const minVol = 0.08;
            const maxVol = 0.15;
            sound.volume = minVol + Math.random() * (maxVol - minVol);
            sound.play().catch(() => {}); // ignore autoplay restrictions
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



