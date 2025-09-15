import axios from "axios";

// Header Tanımlama
axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [import.meta.env.VITE_BASE_ENDPOINT]; // hnagi endpointlere istek yapılırken header eklenmeli onu söylüyorum
    const token = localStorage.getItem("access-token"); // authda storage attığım token
    if (allowedOrigins.includes(origin) && token) {
      config.headers.authorization = token;
    }
    // config.headers['Authorization'] = 'Bearer your_token';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ürün listeleme
export const fetchProductList = async ({ pageParam }) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_ENDPOINT}/product?page=${pageParam + 1}`
  ); // sayfalamada ekledim
  return data;
};
//product id ile tek ürün listeleme
export const fetchProduct = async (id) => {
  // product_id = id olarak parametere aldım
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_ENDPOINT}/product/${id}`
  );
  return data;
};
// kayıt işlemi
export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_ENDPOINT}/auth/register`,
    input
  );
  return data;
};
// giriş işlemi
export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_ENDPOINT}/auth/login`,
    input
  );
  return data;
};
// oturum acma
export const fetchMe = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_ENDPOINT}/auth/me`
  );
  return data;
};
//cıkış
export const fetchLogout = async () => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_ENDPOINT}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );
  return data;
};

//sipariş alma
export const postOrder = async (input) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_ENDPOINT}/order`,
    input
  );
  return data;
};
//sipariş listeleme
export const fetchOrders = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_ENDPOINT}/order`
  );
  return data;
};
//ürün sil
export const deleteProduct = async (id) => {
  //
  const { data } = await axios.delete(
    `${import.meta.env.VITE_BASE_ENDPOINT}/product/${id}`
  );
  return data;
};
//güncelleme
export const updateProduct = async (input, id) => {
  //
  const { data } = await axios.put(
    `${import.meta.env.VITE_BASE_ENDPOINT}/product/${id}`, //hangisini güncelleyeceğimi belirtmek için parametre verdim
    input // güncellenecek veri
  );
  return data;
};

// ürün kayıt etme
export const postProduct = async (input) => {
  // product_id = id olarak parametere aldım
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_ENDPOINT}/product`,
    input
  );
  return data;
};
