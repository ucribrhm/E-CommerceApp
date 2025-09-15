import React from "react";
import moment from "moment";
import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { useBasket } from "@/contexts/BasketContext";
function Cards({ item }) {
  const { items, addToBasket, removeFromBasket, Count } = useBasket();
  const findBasket = items.find((basket_item) => basket_item._id === item._id);//sepete ekli ürünü buluyorum

  return (
    <Card.Root maxW="sm" overflow="hidden" variant="elevated" mr="5">
      <Link to={`/product/${item._id}`}>
        <Image
          src={item.photos[0]}
          alt="product"
          loading="lazy"
          width="100%" // Enini 100% yaparak genişlet
          height="200px" // Yüksekliği otomatik olarak ayarla
          objectFit="cover" // Resmi bozmadan sığdır
        />
        <Card.Body gap="2">
          <Card.Title>{item.title}</Card.Title>
          <Card.Description>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces.
          </Card.Description>
          <Text textStyle="xl" fontWeight="medium" letterSpacing="tight" mt="2">
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </Text>
          <Text textStyle="xl" fontWeight="medium" letterSpacing="tight" mt="2">
            {item.price} TL
          </Text>
        </Card.Body>
      </Link>
      <Card.Footer gap="2">
        <Button
          colorPalette="green"
          variant="solid"
          onClick={() => addToBasket(item, findBasket)}
        >
          Sepete Ekle {findBasket ? `(${Count(item._id)}) `: null}
        </Button>
        {findBasket ? (
          <Button
            colorPalette="red"
            variant="surface"
            onClick={() => removeFromBasket(item._id)}
          >
            Sepetten Cıkar
          </Button>
        ) : null}
      </Card.Footer>
    </Card.Root>
  );
}

export default Cards;
