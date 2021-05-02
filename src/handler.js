const { nanoid } = require('nanoid');
const books = require('./books');
const { booksFilter, getSingleBook } = require('./helper');

const addBookHandler = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const id = nanoid(16);

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
    }

    if (typeof year !== 'number') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Year harus berupa angka',
        });
        response.code(400);

        return response;
    }

    if (typeof pageCount !== 'number') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. pageCount harus berupa angka',
        });
        response.code(400);

        return response;
    }

    if (typeof readPage !== 'number') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage harus berupa angka',
        });
        response.code(400);

        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);

        return response;
    }

    if (typeof reading !== 'boolean') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. reading harus berisi boolean true atau false',
        });
        response.code(400);

        return response;
    }

    books.push(
        {
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished: pageCount === readPage,
            insertedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    );

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);

        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);

    return response;
};

const getAllBooksHandler = (request, h) => {
    const { name = null, reading = null, finished = null } = request.query;

    const filteredBooks = booksFilter(name, reading, finished);

    const response = h.response({
        status: 'success',
        data: {
            books: filteredBooks,
        },
    });
    response.code(200);

    return response;
};

const getSingleBookHandler = (request, h) => {
    const { bookId } = request.params;

    const book = getSingleBook(bookId);

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);

        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const updateBookHandler = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const { bookId } = request.params;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
    }

    if (typeof year !== 'number') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Year harus berupa angka',
        });
        response.code(400);

        return response;
    }

    if (typeof pageCount !== 'number') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. pageCount harus berupa angka',
        });
        response.code(400);

        return response;
    }

    if (typeof readPage !== 'number') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage harus berupa angka',
        });
        response.code(400);

        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);

        return response;
    }

    if (typeof reading !== 'boolean') {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. reading harus berisi boolean true atau false',
        });
        response.code(400);

        return response;
    }

    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);

        return response;
    }

    books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: pageCount === readPage,
        updatedAt: new Date().toISOString(),
    };

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
};

const deleteBookHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);

        return response;
    }

    books.splice(index, 1);
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getSingleBookHandler,
    updateBookHandler,
    deleteBookHandler,
};
