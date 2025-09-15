import React, { useRef, useState } from "react";
import { useBasket } from "@/contexts/BasketContext";
import { Alert } from "@/components/ui/alert";
import {
  Box,
  Stack,
  Image,
  Text,
  Textarea,
  Flex,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { postOrder } from "@/Api";

function Basket() {
  const {
    items,
    clearBasket,
    addToBasket,
    removeFromBasket,
    Count,
    remove,
    groupItems,
  } = useBasket();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    adress: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async () => {
    //sipariş alma
    const address = user.adress;
    const itemIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
    };
    await postOrder(input);
    clearBasket();
  };
  const groupedItems = groupItems(items);
  const total = items.reduce((acc, obj) => acc + obj.price, 0);
  const ref = useRef(null); // Modal ayni dialog için

  return (
    <div>
      <Box p={5}>
        {items.length < 1 ? (
          <Alert status="warning">Sepetinizde ürün yok</Alert>
        ) : (
          <>
            {groupedItems.map((item, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                <Stack direction="row" align="center">
                  <Link to={`/product/${item._id}`}>
                    <Image
                      boxSize="90px"
                      src={item.photos[0]}
                      alt={item.title}
                      loading="lazy"
                      width="200px" // Enini 100% yaparak genişlet
                      height="200px" // Yüksekliği otomatik olarak ayarla
                      objectFit="cover"
                    />
                    <Box flex="1">
                      <Text fontWeight="bold">{item.title}</Text>
                      <Text>Fiyat: {item.price}₺</Text>
                      <Text>Adet: {Count(item._id)}</Text>
                    </Box>
                  </Link>
                  <Stack direction="row">
                    <Button
                      colorPalette="green"
                      onClick={() => addToBasket(item)}
                    >
                      Arttır
                    </Button>
                    <Button
                      colorPalette="red"
                      onClick={() => removeFromBasket(item._id)}
                    >
                      Azalt
                    </Button>
                    <Button
                      colorPalette="blue"
                      onClick={() => remove(item._id)}
                    >
                      Kaldır
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            ))}

            <Flex gap="4" justify="center" align="center">
              <Text fontWeight="semibold"> Toplam Tutar : {total} TL </Text>
              <Button colorPalette="red" onClick={() => clearBasket()}>
                sepeti Boşalt
              </Button>

              <DialogRoot initialFocusEl={() => ref.current} size="md">
                <DialogTrigger asChild>
                  <Button variant="surface" colorPalette="green">
                    Sipariş Ver
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Üye Bilgileri</DialogTitle>
                  </DialogHeader>
                  <DialogBody pb="4">
                    <Stack gap="4">
                      <Field label="First Name">
                        <Input
                          name="name"
                          ref={ref}
                          placeholder="İsim"
                          onChange={handleChange}
                        />
                      </Field>
                      <Field label="Last Name">
                        <Input
                          name="surname"
                          placeholder="Soyad"
                          onChange={handleChange}
                        />
                      </Field>
                      <Field label="Last Name">
                        <Textarea
                          name="adress"
                          placeholder="Adress"
                          onChange={handleChange}
                        />
                      </Field>
                    </Stack>
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button variant="outline" colorPalette="red">
                        Cancel
                      </Button>
                    </DialogActionTrigger>
                    <Button colorPalette="green" onClick={handleSubmit}>
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </DialogRoot>
            </Flex>
          </>
        )}
      </Box>
    </div>
  );
}

export default Basket;
