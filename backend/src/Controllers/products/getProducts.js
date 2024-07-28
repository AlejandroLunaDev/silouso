const { productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const query = {}; // Puedes ajustar el query según tus necesidades
    const options = {
      pagination: true,
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      sort: { [req.query.sortBy || 'createdAt']: req.query.sort || 'desc' },
      lean: true,
      populate: 'category' // Esto asegura que la categoría se popule
    };

    const products = await productService.get(query, options);
    return res.sendSuccess({
      products: products.docs,
      totalPages: products.totalPages,
      totalDocs: products.totalDocs,
      page: products.page,
      limit: products.limit
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
