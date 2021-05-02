const books = require('./books');

function booksFilter(name, reading, finished) {
    let mapedBooks = books;

    if (name) {
        mapedBooks = mapedBooks.filter((book) => book.name
            .toLowerCase()
            .includes(name.toLowerCase()));
    }

    if (reading !== null) {
        console.log(Boolean(Number(reading)));
        mapedBooks = mapedBooks.filter((book) => book.reading === Boolean(Number(reading)));
    }

    if (finished !== null) {
        console.log(Boolean(Number(finished)));
        mapedBooks = mapedBooks.filter((book) => book.finished === Boolean(Number(finished)));
    }

    return mapedBooks.map((book) => (
        {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }
    ));
}

function getSingleBook(id) {
    return books.filter((book) => book.id === id)[0];
}

module.exports = { booksFilter, getSingleBook };
