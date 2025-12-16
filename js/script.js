// Base API URL
const API_BASE = 'https://api.tvmaze.com';

// DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

// Event listeners
searchForm.addEventListener('submit', handleSearch);

// Search handler (uses /search/shows endpoint)
async function handleSearch(e) {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  try {
    // Axios GET with async/await
    const response = await axios.get(`${API_BASE}/search/shows?q=${encodeURIComponent(query)}`);
    displayResults(response.data);  // response.data is the array of shows
  } catch (error) {
    console.error('Search error:', error);
    resultsGrid.innerHTML = '<p style="text-align: center; color: red;">Error fetching results. Try again!</p>';
  }
}

// Display search results as cards
function displayResults(shows) {
  resultsGrid.innerHTML = '';  // Clear previous
  shows.forEach(show => {
    const card = document.createElement('article');
    card.classList.add('show-card');
    card.innerHTML = `
      <img src="${show.show.image?.medium || 'https://via.placeholder.com/250x300?text=No+Image'}" alt="${show.show.name}">
      <div class="summary">
        <h3>${show.show.name}</h3>
        <p>${show.show.summary ? show.show.summary.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'No summary available.'}</p>
      </div>`;
    resultsGrid.appendChild(card);
  });
}