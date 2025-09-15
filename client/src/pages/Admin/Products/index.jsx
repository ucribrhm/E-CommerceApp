import React, { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProductList, deleteProduct } from "@/Api";
import { Table, message, Button, Flex, Popconfirm } from "antd";
import { Link } from "react-router";
import { Text } from "@chakra-ui/react";
function Product() {
  // listeleme işlemi
  const { isPending, error, data } = useQuery({
    queryKey: ["admin:products"],
    queryFn: fetchProductList,
  });
  const queryClient = useQueryClient(); //invalidateQueries kullanmak için gerekli
  //silme işlemleri
  const deleteMutations = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // silme işlemi yapınca sayfayıo yenilesin diye sorguyu sıfırlıyor yeniden çalıştırıyor bir nevi
      queryClient.invalidateQueries({
        queryKey: ["admin:products"],
      });
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.refetchQueries({ queryKey: ["product"] });
      queryClient.refetchQueries({ queryKey: ["admin:products"] });
      message.success("Silindi");
    },
  });
  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => (
          <>
            <Link to={`${record._id}`}>
              <Button type="primary" variant="filled">
                Edit
              </Button>
            </Link>
            <Popconfirm
              title="Emin misin ?"
              description="Silmek istediğine emin misin"
              onConfirm={() => {
                deleteMutations.mutate(record._id);
              }}
              onCancel={(e) => {
                message.error("Silme işlemi iptal edildi");
              }}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button
                danger
                type="primary"
                variant="filled"
                style={{ marginLeft: "5px" }}
              >
                Delete
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);
  if (isPending) return <div>"Loading...";</div>;
  if (error) return <div>"An error has occurred: " + error.message;</div>;
  return (
    <div>
      <Flex justify="space-around" align="center">
        <Text textStyle="4xl">Products</Text>
        <Link to="new">
          <Button type="primary">New Product</Button>
        </Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey="_id" />
    </div>
  );
}

export default Product;
