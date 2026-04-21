import { Book } from "../models/Book.js";

export const findBooks = async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
};
export const findBook = async (re, res) => {
    const { id } = req.params;
    const book = await Book.findOne({ where: { id: id } });

    if (!book) return res.status(404).send({ menssage: "Libro no encontrado" });

    res.json(book);
};
export const createBook = async (req, res) => {
    const { title, author, rating, pageCount, summary, imageUrl, available } =
        req.body;

    if (!title || !author)
        return res
            .status(400)
            .send({ menssage: "Titulo y autor son requeridos" });

    const newBook = await Book.create({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available,
    });
    res.json(newBook);
};
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, pageCount, summary, imageUrl, available } =
        req.body;

    if (!title || !author)
        return res
            .status(400)
            .send({ menssage: "Titulo y autor son requeridos" });

    // Buscamos el libro por id de la base de datos
    const book = await Book.findByPk(id);

    // Lo actualizamos
    await book.update({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available,
    });

    await book.save();

    if (!book) return res.status(404).send({ menssage: "Libro no encontrado" });

    res.json(book);
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    await book.destroy();

    if (!book) return res.status(404).send({ menssage: "Libro no encontrado" });

    res.send(`Libro con id: ${id} borrado!`);
};
