const { productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {

    const query = {};


    if (req.query.category) {
      query.category = req.query.category; 
    }

    // Opciones para la paginación y el ordenamiento
    const options = {
      pagination: true,
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      sort: { [req.query.sortBy || 'createdAt']: req.query.sort || 'desc' },
      lean: true,
      populate: 'category' 
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
