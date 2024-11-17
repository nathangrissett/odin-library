//class to make book

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = {
            title,
            author,
            pages,
            read
        };        
    }
}

//array that contains books

const myLibrary = [];

//function that adds books to the myLibrary array

function addBookToLibrary(book) {
    myLibrary.push(book.info);
}

//function that displays books on screen to user with delete button at the end

function displayBooks() {
    const element = document.querySelector("#div1");
    element.textContent = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const div = document.createElement("div");
        const para1 = document.createElement("p");
        const node1 = document.createTextNode(book.title);
        const para2 = document.createElement("p");
        const node2 = document.createTextNode(book.author);
        const para3 = document.createElement("p");
        const node3 = document.createTextNode(book.pages);
        const para4 = document.createElement("p");
        const node4 = document.createTextNode(book.read);
        const button = document.createElement('button');
        button.className += 'button';
        button.setAttribute('data-id', i);
        button.innerText = "Delete";
        const readButton = document.createElement('button');
        readButton.setAttribute('data-id', i);
        readButton.className += 'read-button';
        readButton.innerText = "Change read status";
        para1.appendChild(node1);
        para2.appendChild(node2);
        para3.appendChild(node3);
        para4.appendChild(node4);
        para4.appendChild(button);
        para4.appendChild(readButton);
        div.appendChild(para1);
        div.appendChild(para2);
        div.appendChild(para3);
        div.appendChild(para4);
        div.appendChild(button);
        div.appendChild(readButton);
        element.appendChild(div);
    }
}

//hides form

const form = document.querySelector('#form');
form.style.display = 'none';

//displays form

const newBook = document.querySelector('#newBook');

newBook.addEventListener('click', function () {
    form.style.display = 'block';
});

//button that displays content of text fields as book information to user

const submit = document.querySelector('#submit');

function newContent() {
    const bookTitle = document.querySelector('#title').value;
    const bookAuthor = document.querySelector('#author').value;
    const bookPages = document.querySelector('#pages').value;
    const bookRead = document.querySelector('#read').value;
    const addedBook = new Book (bookTitle, bookAuthor, bookPages, bookRead);
    addBookToLibrary(addedBook);
    displayBooks();
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#read').value = "";
    form.style.display = 'none';
}

submit.addEventListener('click', function() {
    if ((!document.querySelector('#title').checkValidity()) ||
    (!document.querySelector('#author').checkValidity()) ||
    (!document.querySelector('#pages').checkValidity()) ||
    (!document.querySelector('#read').checkValidity()))
    {
        return;
    }
    newContent();
});

// Event listener for delete buttons using event delegation

document.querySelector("#div1").addEventListener('click', function(event) {
    if (event.target.classList.contains('button')) {
        const index = event.target.getAttribute('data-id');
        myLibrary.splice(index, 1);
        displayBooks();
    }
    if (event.target.classList.contains('read-button')) {
        const index = parseInt(event.target.getAttribute('data-id'));
            if (index >= 0 && index < myLibrary.length) {
            if (myLibrary[index].read == "read") {
                myLibrary[index].read = "not read";
                newContent();
                myLibrary.splice(myLibrary.length - 1, 1);
                displayBooks();
            } else {
                myLibrary[index].read = "read";
                newContent();
                myLibrary.splice(myLibrary.length - 1, 1);
                displayBooks();
            }
        } else {
            console.error("Invalid index for read-button:", index)
        }
    }
});