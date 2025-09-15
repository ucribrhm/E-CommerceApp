import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/Api";
import { Box, Button, Text, Container } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useBasket } from "@/contexts/BasketContext";
// params.teamId

function ProductDetail() {
  const { product_id } = useParams(); //   gelen parametre alma
  const { addToBasket, items, Count, removeFromBasket } = useBasket();

  const { isPending, error, data } = useQuery({
    queryKey: ["product", product_id],
    queryFn: () => fetchProduct(product_id), // parametre varsa ()=> kullanımı zorunlu
  });
  if (isPending) return <div>"Loading...";</div>;
  if (error) return <div>"An error has occurred: " + error.message;</div>;
  // sepete eklenleri döndürür
  const findBasket = items.find(
    (basket_item) => basket_item._id === product_id
  );
  const images = data.photos.map((url) => ({ original: url }));
  return (
    <div>
      <Container fluid centerContent>
   
        <Box variant="horizontal">
          <Button
            mr="5px"
            shadow="md"
            isplay="inline-block"
            pos="relative"
            colorPalette="green"
            onClick={() => {
              addToBasket(data);
            }}
          >
            Sepete Ekle ( {Count(product_id)} )
          </Button>

          {findBasket ? (
            <Button
              colorPalette="red"
              onClick={() => {
                removeFromBasket(product_id);
              }}
            >
              Sepetten Çıkar
            </Button>
          ) : null}
        </Box>
        <Text as={"h2"} fontSize={"2xl"}>
          {data.title}
        </Text>
        <Text textAlign="center" width="450px">
         
          {data.description}
        </Text>
        <Text>{moment(data.createdAt).format("DD/MM/YYYY")} </Text>
      </Container>
      <Box margin={10}>
        <ImageGallery
          items={images}
          showThumbnails={false}
          showPlayButton={false}
        />
      </Box>
    </div>
  );
}

export default ProductDetail;
