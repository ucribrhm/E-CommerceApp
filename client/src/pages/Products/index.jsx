import Cards from "@/Component/Card";
import React from "react";
import { Grid, Box, Flex, Button } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductList } from "@/Api";
function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["product"],
    queryFn: fetchProductList,
    initialPageParam: 0,
    getNextPageParam: (lastGroup, allGroup) => {
      const morePageExist = lastGroup?.length === 12;
      if (!morePageExist) return undefined;
      return allGroup.length;
    },
  });

  if (status === "pending") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;
  console.log('data12 :>> ', data);
  return (
    <div>
      <Grid
        templateColumns={{
          base: "1fr", // Küçük ekranlar için tek sütun (sm ve altı)
          sm: "repeat(1, 1fr)", // sm ekran boyutları için tek sütun
          md: "repeat(2, fr)", // md ve üstü ekran boyutları için 3 sütun
          lg: "repeat(4, 1fr)", // md ve üstü ekran boyutları için 3 sütun
          xl: "repeat(4, 1fr)", // md ve üstü ekran boyutları için 3 sütun
        }}
        gap=""
        autoFlow="row"
        p={{ base: "0 1px" }}
      >
        {/* {data.map((item, key) => (
          <Cards key={key} item={item} />
        ))} */}
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box
                width="350px"
                height="500px"
                m="0 5px 15px 15px"
                key={item._id}
              >
                <Cards item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Flex justifyContent={"center"} mt={10}>
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>

        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </Flex>
    </div>
  );
}

export default Products;
