const books = require('./books');

function booksFilter(name, reading, finished) {
    const mapedBooks = books.map((book) => (
        {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }
    ));
    return mapedBooks;
}

function getSingleBook(id) {
    return books.filter((book) => book.id === id)[0];
}

module.exports = { booksFilter, getSingleBook };
