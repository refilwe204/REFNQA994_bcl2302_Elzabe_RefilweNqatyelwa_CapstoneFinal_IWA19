import { books, authors, BOOKS_PER_PAGE, genres } from "./data.js";

let page = 1;
let range = books.length;

const matches = books;

function createPreview({ author, id, image, title }) {
  const preview = document.createElement("div");
  preview.classList.add("preview");
  const kat = /*html*/ `
    <div class="preview__info">
      <img class="preview__image" src="${image}">
      <h1 class="preview__title">${title}</h1>
      <h2 class="preview__author">${authors[author]}</h2>
    </div>
  `;
  preview.innerHTML = kat;
  preview.dataset.preview = id; // add book ID as a data attribute to the preview element
  return preview;
}

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

moreBooks.innerHTML = /* html */ [
    `<span>Show more</span>`,
    `<span class="list__remaining">${
      matches.length - showMore > 0 ? matches.length - showMore : 0}</span>`,
    ]

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
  moreBooks.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining">${
      matches.length - showMore > 0 ? matches.length - showMore : 0
    }</span>
  `;
});


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
  }

  if (!active) return;
  document.querySelector("[data-list-active]").open = true;
  document.querySelector("[data-list-image]").setAttribute("src", active.image);
  document.querySelector(
    "[data-list-blur]"
  ).style.backgroundImage = `url('${active.image}')`;
  document.querySelector("[data-list-title]").textContent = active.title;
  document.querySelector(
    "[data-list-subtitle]"
  ).textContent = `${authors[active.author]} (${new Date(
    active.published
  ).getFullYear()})`;
  document.querySelector("[data-list-description]").textContent =
    active.description;

    const closeButton = document.querySelector('[data-list-close]');
    closeButton.addEventListener('click', () => {
      document.querySelector('[data-list-active]').open = false;
    });
    
});


// Open the search button overlay
const searchForm = document.createElement("form");
searchForm.classList.add("search-form");

const headerButton = document.querySelector(".header__button");

headerButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchOverlay = document.querySelector("[data-search-overlay]");
  searchOverlay.showModal();

  const cancelButton = document.querySelector("[data-search-cancel]");

  cancelButton.addEventListener("click", () => {
    const searchOverlay = document.querySelector("[data-search-overlay]");
    searchOverlay.open = false;
  });
});

// Helper function to create dropdown options
function createDropdownOptions(parentElement, options, defaultOption) {
  const defaultOptionElement = document.createElement("option");
  defaultOptionElement.value = "any";
  defaultOptionElement.innerText = defaultOption;
  parentElement.appendChild(defaultOptionElement);
  for (const [id, name] of Object.entries(options)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    parentElement.appendChild(element);
  }
}

  
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

// settings button for day and night
const settingsBtn = document.querySelector('[data-header-settings]');
settingsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  
  const themeOverlay = document.querySelector('[data-settings-overlay]');
  themeOverlay.showModal();

  const settingsCancelBtn = document.querySelector('[data-settings-cancel]');
  settingsCancelBtn.addEventListener('click', () => {
    const themeOverlay = document.querySelector('[data-settings-overlay]');
    themeOverlay.close();
  });
  
//--------------------Changing themes-----------------------------
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
  }
  document.querySelector("[data-settings-overlay]").style.display = "none";
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
     }
     document.querySelector("[data-settings-overlay]").style.display = "none";
} )
document.addEventListener(saveButtonToggle)

})





