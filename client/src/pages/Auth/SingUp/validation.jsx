import * as Yup from "yup";
 const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli Bir E-mail giriniz.")
    .required("Zorunlu alan"),
    password: Yup.string()
    .min(5, "parolanız en az 5 karakterden  fazla olmalıdır")
    .required("Zorunlu alan"),
    passwordConfirm: Yup.string()
   .oneOf([Yup.ref("password"),null],"Parolalar uyuşmuyor")
    .required("Zorunlu alan"),
});
export default validationSchema;    