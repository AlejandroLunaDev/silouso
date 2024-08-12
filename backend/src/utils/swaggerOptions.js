module.exports = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación SiLoUsoTec",
      description: "",
    },
  },
  apis: [`${__dirname}/../../docs/**/*.yaml`],
};
