import { useState, createContext, useEffect, useContext } from "react";

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);

  useEffect(() => {
    // items her değiştiğinde yani sepete ürün eklediğimde onu localstorage kayıt et
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  //sepete ürün ekle
  const addToBasket = (item) => {
    setItems((prev) => [...prev, item]);
    console.log("sepet :>> ", items);
  };
  //  sepette eklenen ürün adeti bulmak için
  const Count = (id) => {
    return items.reduce((count, item) => {
      return item._id === id ? count + 1 : count;
    }, 0);
  };
  // sepetteki ürünü kaldırır
  const removeFromBasket = (id) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item._id === id);
      if (index !== -1) {
        const newItems = [...prev];
        newItems.splice(index, 1); // İlk eşleşen ürünü kaldırır
        return newItems;
      }
      return prev;
    });
  };
  //Sepeti boşalt
  const clearBasket = () => {
    setItems([]);
    localStorage.setItem("basket", JSON.stringify([]));
  };

  //ürünleri gruplama
  const groupItems = (items) => {
    // 'items' dizisini alır ve her bir ID'ye göre gruplar.
    return items.reduce((acc, item) => {
      // 'acc' (accumulator), gruplandırılmış öğeleri tutar.
      // 'item', üzerinde işlem yapılan mevcut öğedir.

      const existingItem = acc.find((i) => i._id === item._id);
      // 'acc' içinde aynı ID'ye sahip bir öğe olup olmadığını kontrol eder.

      if (existingItem) {
        // Eğer aynı ID'ye sahip bir öğe varsa, 'count' değerini artırır.
        existingItem.count += 1;
      } else {
        // Eğer aynı ID'ye sahip öğe yoksa, 'item'i yeni bir 'count' değeriyle ekler.
        acc.push({ ...item, count: 1 });
        // Spread operatorü ile 'item'in mevcut özelliklerini kopyalar ve yeni bir 'count' özelliği ekler.
      }

      return acc;
      // Güncellenmiş 'acc' (gruplandırılmış öğeler) bir sonraki döngüye aktarılır.
    }, []); // Başlangıç değeri olarak boş bir dizi verilir.
  };

  //toplu silme
  const remove = (id) => {
    const filtered = items.filter((item) => item._id !== id);
    setItems(filtered);
  };
  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
    Count,
    remove,
    groupItems,
    clearBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};
const useBasket = () => useContext(BasketContext);
export { BasketProvider, useBasket };
