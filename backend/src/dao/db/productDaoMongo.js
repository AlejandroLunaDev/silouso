import { productModel } from '../models/productModel.js';

const getAllProducts = async () => {
    return await productModel.find();
};

const getProductById = async (productId) => {
    return await productModel.findById(productId);
};

const addProduct = async (productData) => {
    const { title, description, price, thumbnails, code, stock, owner, category } = productData;

    const existingProduct = await productModel.findOne({ code });
    if (existingProduct) {
        throw new Error('El código del producto ya existe');
    }

    const newProduct = new productModel({
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        owner: owner || 'admin'
    });

    return await newProduct.save();
};

const updateProduct = async (productId, newData) => {
    return await productModel.findByIdAndUpdate(productId, newData, { new: true });
};

const deleteProduct = async (productId) => {
    return await productModel.findByIdAndDelete(productId);
};

export { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };
