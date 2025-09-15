import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Zorunlu alan"),
  description: Yup.string().min(5).required("Zorunlu alan"),
  price: Yup.string().required("Zorunlu alan"),
  
});
export default validationSchema;
