//Book contructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}
//add book to list function
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  // creat a tr
  const row = document.createElement("tr");
  //append book to tr
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><i class="fa fa-trash-o" style="font-size:24px"></i></td>`;
  list.appendChild(row);
};
UI.prototype.clearFileds = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
UI.prototype.erroMessage = function (message, classNam) {
  //creating a new div
  const div = document.createElement("div");
  //add class name
  div.className = classNam;
  //adding the message
  div.appendChild(document.createTextNode(message));
  //graping the container
  const container = document.querySelector(".container");
  //graping the form
  const form = document.getElementById("book-form");
  //inserting div befor the form
  container.insertBefore(div, form);
  //timeout after three seconds
  setTimeout(function () {
    document.querySelector(".error").remove();
  }, 3000);
};
UI.prototype.successMessage = function (message, className) {
  const div = document.createElement("div");
  //add class name
  div.className = className;
  //adding the message
  div.appendChild(document.createTextNode(message));
  //graping the container
  const container = document.querySelector(".container");
  //graping the form
  const form = document.getElementById("book-form");
  //inserting div befor the form
  container.insertBefore(div, form);
  //timeout after three seconds
  setTimeout(function () {
    document.querySelector(".success").remove();
  }, 3000);
};
UI.prototype.deletBook = function (target) {
  if (target.className === "fa fa-trash-o") {
    target.parentElement.parentElement.remove();
  }
};

//event listener FOR SUBMITING FORM
document.getElementById("book-form").addEventListener("submit", function (e) {
  //form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  // onsubmit, new book should be form. This can be done by instantiating the book constructor
  const book = new Book(title, author, isbn);
  //in other to add a book to the ui, instantiate a ui object
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.erroMessage("Please fill in all fields", "error");
  } else {
    //Add a book to the list i.e the ui
    ui.addBookToList(book);
    //clear fileds
    ui.clearFileds(book);
    ui.successMessage("Book  Added", "success");
  }

  e.preventDefault();
});

//EVENT LISTENER FOR DELET
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  //delet entire raw
  ui.deletBook(e.target);
  //alert of delet book
  ui.successMessage("Book Removed", "success");
  e.preventDefault();
});
