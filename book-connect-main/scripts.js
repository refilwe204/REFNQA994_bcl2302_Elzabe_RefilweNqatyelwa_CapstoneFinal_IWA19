const BOOKS_PER_PAGE = 36;
let matches = books;
let page = 1;

// Check if books is an array
if (!Array.isArray(books)) throw new Error('Source required');

// Check if range has two elements
const range = [0, BOOKS_PER_PAGE];
if (range.length < 2) throw new Error('Range must be an array with two numbers');

const css = {
day: { dark: '10, 10, 20', light: '255, 255, 255' },
night: { dark: '255, 255, 255', light: '10, 10, 20' },
};

// Create options for genre filter
const genres = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Genres';
genres.appendChild(element);

for (const [id, name] of Object.entries(genres)) {
element = document.createElement('option');
element.value = id;
element.innerText = name;
genres.appendChild(element);
}

document.getElementById('data-search-genres').appendChild(genres);

// Create options for author filter
const authors = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authors.appendChild(element);

for (const [id, name] of Object.entries(authors)) {
element = document.createElement('option');
element.value = id;
element.innerText = name;
authors.appendChild(element);
}

document.getElementById('data-search-authors').appendChild(authors);

// Set page theme based on user preference
const root = document.documentElement;
const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = isDark ? 'night' : 'day';

root.style.setProperty('--color-dark', css[theme].dark);
root.style.setProperty('--color-light', css[theme].light);

// Update remaining number of books to display
const remaining = matches.length - range[1] > 0 ? matches.length - range[1] : 0;
document.getElementById('data-list-button').innerHTML = <span>Show more</span> <span class="list__remaining"> (${remaining})</span>;

// Show/hide search and settings overlays
document.getElementById('data-header-search').addEventListener('click', () => {
document.getElementById('data-search-overlay').open = true;
document.getElementById('data-search-title').focus();
});

document.getElementById('data-search-cancel').addEventListener('click', () => {
if (document.getElementById('data-search-overlay').open === false) return;
document.getElementById('data-search-overlay').open = false;
});

document.getElementById('data-settings-cancel').addEventListener('click', () => {
if (document.getElementById('data-settings-overlay').open === false) return;
document.getElementById('data-settings-overlay').open = false;
});

// Submit search and settings filters
document.getElementById('data-search-form').addEventListener('submit', (event) => {
event.preventDefault();
const formData = new FormData(event.target);
const filters = Object.fromEntries(formData);
let result = [];

for (const book of books) {
const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
const authorMatch = filters.author === 'any' || book.author === filters.author;
let genreMatch = filters.genre === 'any';

if (filters.genre !== 'any') {
  for (let i = 0; i < book.genres.length; i++) {
    if (book.genres[i] === filters.genre) {
      genreMatch = true;
      break;
    }
  }
}

if (authorMatch && genreMatch) {
  // Do something with the book
}
}