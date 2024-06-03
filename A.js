window.addEventListener('load', () => {
    restoreLocal();
    render();
});

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const myLibrary = [];

const modal = document.getElementById('addBookModal');
document.querySelector(".form").addEventListener("submit", function(event){
    event.preventDefault();
    addBookToLibrary();
    closeModal();
    document.querySelector(".form").reset();
});

const openModal = () => {
    modal.classList.add('active');
};

const closeModal = () => {
    modal.classList.remove('active');
};

const addBookBtn = document.getElementById('addBookbtn');
addBookBtn.addEventListener('click', openModal);

function render(){
    let libraryEl = document.querySelector('.library');
    libraryEl.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookEl = document.createElement('div');
        bookEl.classList.add('book');
        bookEl.innerHTML = `
            <h3>${book.title}</h3>
            <h4>${book.author}</h4>
            <h5>pages: ${book.pages}</h5>
            <button class="removeBtn" onclick="removeBook(${index})">Remove</button>
            <button class="readBtn" onclick="toggleRead(${index})">${book.read ? 'Read' : 'Not Read'}</button>
        `;
        libraryEl.appendChild(bookEl);
    });
}

function toggleRead(index){
    myLibrary[index].read = !myLibrary[index].read;
    saveLocal();
    render();
}

function removeBook(index){
    myLibrary.splice(index, 1);
    saveLocal();
    render();
}

function addBookToLibrary(){
    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('pages').value;
    let bookRead = document.getElementById('isRead').checked;

    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBook);
    saveLocal();
    render();
}

const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary));
};

const JSONToBook = (book) => {
    return new Book(book.title, book.author, book.pages, book.read);
};

const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'));
    if (books) {
        myLibrary.length = 0;
        books.forEach(book => {
            myLibrary.push(JSONToBook(book));
        });
    }
};