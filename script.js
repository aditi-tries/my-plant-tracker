async function loadPlants() {
  try {
    const res = await fetch('data/plants.json');
    if (!res.ok) throw new Error('Failed to load plants.json');
    const plants = await res.json();
    const container = document.getElementById('plants');
    plants.forEach(plant => {
      const plantDiv = document.createElement('section');
      plantDiv.className = 'plant';
      plantDiv.innerHTML = `<h2>${plant.name}</h2>`;
      plant.updates.forEach(update => {
        const u = document.createElement('div');
        u.className = 'update';
        u.innerHTML = `<p><strong>${update.date}</strong> — ${update.note}</p>`;
        if (update.image) {
          const img = document.createElement('img');
          img.src = update.image;
          img.alt = `${plant.name} photo`;
          u.appendChild(img);
        }
        plantDiv.appendChild(u);
      });
      container.appendChild(plantDiv);
    });
  } catch (err) {
    document.getElementById('plants').textContent = 'Error loading plant data.';
    console.error(err);
  }
}

loadPlants();
