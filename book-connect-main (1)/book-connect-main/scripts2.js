import{
    BOOKS_PER_PAGE, authors, genres, books
  } from './data.js'
  const inco = document.querySelector('[data-list-items]') // created a variable and took the empty div from HTML line 93
  const searchButton = document.querySelector('[data-header-search]')// created a variable and took the empty div from HTML line 65
  const searchBar = document.querySelector('[data-search-overlay]')// created a variable and took the empty div from HTML line 113
  
  const matches = books   //added const
  
  const page = 1;         //added const
  
  // if (!books && !Array.isArray(books)) throw new Error('Source required') 
  
  // if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')
  
  // const day = {                       //added const
  //     dark: '10, 10, 20',
  //     light: '255, 255, 255',
  // }
  
  // const night = {
  //     dark: '255, 255, 255',
  //     light: '10, 10, 20',
  // }
  
  // // const fragment = document.createDocument(fragment)  //moved fragment inside the brackets and lowercased f
  
  // // let extracted =  
  
  // // for ({ authors, image, title, id }; extracted; i++) {    //added s to make it authors so that it can be called
  // //     const preview = document.createPreview(){        //typed in document. and closed createPreview
  // //         authors,      // added s to make it authors
  // //         id,books.slice(0, 36)
  // //         image,
  // //         title,             //added ,
  // //     }           //removed )
  
  // //     fragment.appendChild(preview)
  // // }
  
  
  // data-list-items.appendChild(fragment)
  
  // const genres = document.createDocument(fragment)         //moved fragment inside the brackets and lowercased f and added const
  // const element = document.createElement('option')
  // element.value = 'any'
  // element = 'All Genres'
  // genres.appendChild(element)
  
  // for ([id, name]; Object.entries(genres); i++) {
  //     document.createElement('option')
  //     element.value = value
  //     element.innerText = text
  //     genres.appendChild(element)
  // }
  
  // data-search-genres.appendChild(genres)
  
  // authors = document.createDocumentFragment()
  // element = document.createElement('option')
  // element.value = 'any'
  // element.innerText = 'All Authors'
  // authors.appendChild(element)
  
  // for ([id, name];Object.entries(authors); id++) {
  //    const document.createElement('option')    //added const
  //     element.value = value
  //     element = text
  //     authors.appendChild(element)
  // }
  
  // data-search-authors.appendChild(authors)
  
  // data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
  // v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'
  
  // documentElement.style.setProperty('--color-dark', css[v].dark);
  // documentElement.style.setProperty('--color-light', css[v].light);
  
  const moreBooks = document.querySelector('[data-list-button]') // created a variable and called data-list-button from the DOM
  const showMore = page * BOOKS_PER_PAGE; /*  Show more */   //moved it to the line below and removed the = before. removed books and replaced with matches so that it can get total number of books
  
  moreBooks.disabled = !(matches.length - showMore > 0)   //replaced data-list-button  with the variable I just created, replaced [page * BOOKS_PER_PAGE] with showMore on this code block
  
  moreBooks.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining">${matches.length - showMore > 0 ? matches.length - showMore : 0}</span>
  `;
  // removed the () on the main and removed [] on page*BOOKS_PER_PAGE and replaced with (). Removed the [] and replaced with ``
  
  moreBooks.addEventListener( 'click', () =>{
    showMore.click = true ;
   moreBooks.focus();
    // page++;
    // showMore += BOOKS_PER_PAGE; // increment the showMore variable by the number of books per page
    // console.log(showMore);
    // code to display more books goes here
  });
  
  // data-search-cancel.click()  { data-search-overlay.open === false }
  // data-settings-cancel.click() { querySelect0r         (data-settings-overlay).open === false }
  // data-settings-form.submit() { actions.settings.submit }
  // data-list-close.click() { data-list-active.open === false }
  
  // data-list-button.click() {
  //     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x [BOOKS_PER_PAGE]))       // added opening [ bracket
  //     actions.list.updateRemaining()
  //     page = page + 1
  // }
  
  searchButton.addEventListener( "click", () =>{
   searchBar.open = true ;
   searchButton.focus();
  })
  
  // data-search-form.click(filters) {
  //     preventDefault()
  //     const formData = new FormData(event.target)
  //     const filters = Object.fromEntries(formData)
  //     result = []
  
  //     for (book; booksList; i++) {
  //         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
  //         authorMatch = filters.author = 'any' || book.author === filters.author
  
  //         {
  //             genreMatch = filters.genre = 'any'
  //             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
  //         }
  
  //         if titleMatch && authorMatch && genreMatch => result.push(book)
  //     }
  
  //     if display.length < 1 
  //     data-list-message.class.add('list__message_show')
  //     else data-list-message.class.remove('list__message_show')
    
  
  //     data-list-items.innerHTML = ''
    const fragment = document.createDocumentFragment()                  
    const extracted =   books.slice(0, 36) //source.slice(range[0], range[1])   // commented out source and replaced it with books to display the 36 books
   
     for ( const {authors, image, title, id } of  extracted) {       // added s on author, turned it into a for loop
        //const { author: authorId, id, image, title } = props
  
        let element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
  
        element.innerHTML = /* html */ `
            <img
                class ="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                // <div class="preview__author">${"authors[authorId]"}</div>
            </div>
        `
  
        fragment.appendChild(element)
    }
  
    inco.appendChild(fragment)      // appended the fragment into inco