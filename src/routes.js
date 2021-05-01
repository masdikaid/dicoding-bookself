const {
    addBookHandler,
    getAllBooksHandler,
    getSingleBookHandler,
    updateBookHandler,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getSingleBookHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookHandler,
    },
];
module.exports = routes;
