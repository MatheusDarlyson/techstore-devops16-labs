const productService = require("../services/productService"); // Faz o import do serviço de produtos

// Função para listar todos os produtos
const listProducts = (req, res) => {

    const products = productService.getProducts();

    return res.status(200).json(products);

};

// Função para criar (cadastrar) um novo produto
const createProduct = (req, res) => {

    const product = productService.createProduct(req.body);

    return res.status(201).json({
        message: "Produto cadastrado com sucesso.",
        product
    });

};

// Função para atualizar um produto existente
const updateProduct = (req, res) => {

    try {

        const product = productService.updateProduct(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            message: "Produto atualizado com sucesso.",
            product
        });

    } catch (error) {

        return res.status(404).json({
            message: error.message
        });

    }

};

// Função para deletar um produto existente
const deleteProduct = (req, res) => {

    try {

        const product = productService.deleteProduct(
            req.params.id
        );

        return res.status(200).json({
            message: "Produto removido com sucesso.",
            product
        });

    } catch (error) {

        return res.status(404).json({
            message: error.message
        });

    }

};

module.exports = { // Exporta as funções do controller para serem utilizadas em outros arquivos
    listProducts,
    createProduct,
    updateProduct,
    deleteProduct
};