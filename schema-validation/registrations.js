const yup = require("yup");

const registrationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  age: yup.number().required(),
  course: yup.string().required(),
});

module.exports = registrationSchema;
