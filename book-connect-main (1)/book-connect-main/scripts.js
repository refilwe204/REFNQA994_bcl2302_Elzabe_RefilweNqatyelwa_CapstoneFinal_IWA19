import { books, authors, BOOKS_PER_PAGE, genres } from "./data.js";
let page = 1;
const matches = books;

// Show more books on the list
function createPreview({ author, id, image, title }) {
  let element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', id);
  element.innerHTML = /* html */ `
      <img
          class="preview__image"
          src="${image}"
      />
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">"${authors[author]}"</div>
      </div>
  `;
  return element;
}

// Responsible for list of books
let fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);
for (const { author, title, image, id } of extracted) {
  const preview = createPreview({ author, id, image, title });
  fragment.appendChild(preview);
}
const dataListItems = document.querySelector("[data-list-items]");
dataListItems.appendChild(fragment);
const moreBooks = document.querySelector("[data-list-button]");
let showMore = page * BOOKS_PER_PAGE;

// show more books button
moreBooks.addEventListener("click", () => {
  const dataListItems = document.querySelector("[data-list-items]");
  const remaining = matches.slice(showMore, matches.length);
  const fragment = document.createDocumentFragment();
  for (const { author, title, image, id } of remaining) {
    const preview = createPreview({ author, id, image, title });
    fragment.appendChild(preview);
  }
  dataListItems.appendChild(fragment);
  showMore += remaining.length;
  moreBooks.disabled = !(matches.length - showMore > 0);
});

// Responsible for show more title
moreBooks.innerHTML = /* html */ `
  <span>Show more</span> (
  <span class="list__remaining">${
    matches.length - showMore > 0 ? matches.length - showMore : 0
  }</span> )
`;

// Handle preview click
document.querySelector("[data-list-items]").addEventListener("click", (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active;
  for (const node of pathArray) {
    if (active) break;
    const previewId = node?.dataset?.preview;
    for (const singleBook of books) {
      if (singleBook.id === previewId) {
        active = singleBook;
        break;
      }
    }
  };
  if (!active) return;
  document.querySelector("[data-list-active]").open = true;
  document.querySelector("[data-list-image]").setAttribute("src", active.image);
  document.querySelector( "[data-list-blur]" ).style.backgroundImage = `url('${active.image}')`;
  document.querySelector("[data-list-title]").textContent = active.title;
  document.querySelector( "[data-list-subtitle]").textContent = `${authors[active.author]} (${new Date(  active.published ).getFullYear()})`;
  document.querySelector("[data-list-description]").textContent = active.description;
  
  //CLOSE BUTTON
    const closeButton = document.querySelector('[data-list-close]');
    closeButton.addEventListener('click', () => {
      document.querySelector('[data-list-active]').open = false;
    });
});

//Search modal show
document.querySelector('[data-header-search]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').open = true ;
  data-search-title.focus();
})

// SEARCH BUTTON
// Search specific books
const searchFilter = document.querySelector('[data-search-form]')
// add event listener to search form
searchFilter.addEventListener('submit', (event)=>{
    event.preventDefault();

// hide book list
   document.querySelector('[data-list-items]').style.display = 'none'

// clear message area
   document.querySelector('[data-list-message]').innerHTML = ''

   // get form data
   const formData = new FormData(event.target)
    const title1 = formData.get('title');
    const genre1 = formData.get('genre');
    const author1 = formData.get('author');

// array to store filtered books
const filteredBooks = [];

// loop through all books
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  // if genre and author are not selected, filter by title only
  if (genre1 === 'any' && author1 === 'any') {
   if (book.title.toLowerCase().includes(title1.toLowerCase())){
    filteredBooks.push(book);
   }
  }
  // if genre is not selected, filter by title and author
  if (genre1 === 'any') {
    if (book.title.toLowerCase().includes(title1.toLowerCase()) && book.author === author1){
     filteredBooks.push(book);
    }
   }
   // if title is not entered, filter by author and genre
   if (title1 === '') {
    if (book.author === author1 && book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   // if neither title nor author are selected, filter by genre only
   if (title1 === '' && author1 === 'any' ) {
    if (book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   // display message if no books match filters
   if (filteredBooks.length > 0){
    document.querySelector('[data-list-message]').innerText = ''
    document.querySelector('[data-list-button]').disabled = true
    document.querySelector('[data-list-message]').style.marginTop = '-125px';
   } else{
    document.querySelector('[data-list-message]').innerText = 'No results found. Your filters might be too narrow.'
    document.querySelector('[data-list-button]').disabled = true
   }
};

// display filtered books
document.querySelector('[class="list__message"]').style.display = 'block'

// create fragment to hold filtered books
const fragment2 = document.createDocumentFragment()
    for (const {author ,image, title, id , description, published} of filteredBooks) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        preview.dataset.genre = genres
        // create preview button with book information
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`

      // append preview button to fragment
        fragment2.appendChild(preview)
      }
      // add filtered books to message area
          const booklist2 = document.querySelector('[class="list__message"]')
          booklist2.append(fragment2)
              document.querySelector('[data-search-form]').reset()
              document.querySelector("[data-search-overlay]").close()
          })

// Drop down for genres
const dataSearchGenres = document.querySelector("[data-search-genres]");
const allGenresOption = document.createElement("option");
allGenresOption.value = "any";
allGenresOption.innerText = "All Genres";
dataSearchGenres.appendChild(allGenresOption);
for (const [id, names] of Object.entries(genres)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = names;
    dataSearchGenres.appendChild(element);
}
for (const [id, names] of Object.entries(genres)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = names;
    dataSearchGenres.appendChild(element);
}
// Drop down for authors
const dataSearchAuthors = document.querySelector("[data-search-authors]");
const allAuthorsOption = document.createElement("option");
allAuthorsOption.value = "any";
allAuthorsOption.innerText = "All Authors";
dataSearchAuthors.appendChild(allAuthorsOption);
for (const [id, names] of Object.entries(authors)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = names;
    dataSearchAuthors.appendChild(element);
}
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  actions.settings.submit();
  });
  
  // Closes the preview overlay
document.querySelector('[data-list-close]').addEventListener('click', () => {
  document.querySelector('[data-list-active]').open = false;
});
;

//Theme mode
// Get the settings button and add a click event listener
const settingsBtn = document.querySelector('[data-header-settings]');
settingsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  // Show the theme overlay dialog
  const themeOverlay = document.querySelector('[data-settings-overlay]');
  themeOverlay.showModal();
  const settingsCancelBtn = document.querySelector('[data-settings-cancel]');
    settingsCancelBtn.addEventListener('click', () => {
      const themeOverlay = document.querySelector('[data-settings-overlay]');
      themeOverlay.close();
    });
});

// Get the theme select element and the root element
const themeSelect = document.querySelector('[data-settings-theme]');
//const root = document.documentElement;
// Define the color values for the day and night themes
const css = {
  day: {
    dark: '10, 10, 20',
    light: '255, 255, 255',
  },
  night: {
    dark: '255, 255, 255',
    light: '10, 10, 20',
  }
}
 const form = document.getElementById('settings');
 
 //const themeSelect = document.querySelector('[data-settings-theme]');
 form.addEventListener('submit', (event) => {
   event.preventDefault();
   const theme = themeSelect.value;
   document.documentElement.style.setProperty('--color-dark', css[theme].dark);
   document.documentElement.style.setProperty('--color-light', css[theme].light);
 });
 
 // Initialize theme based on user's OS theme preference
 const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
 const initialTheme = prefersDarkMode ? 'night' : 'day';
 document.documentElement.style.setProperty('--color-dark', css[initialTheme].dark);
 document.documentElement.style.setProperty('--color-light', css[initialTheme].light)