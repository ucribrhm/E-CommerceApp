
import React from "react";
import { Table } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/Api";
function Orders() {
  const { isPending, error, data } = useQuery({
    queryKey: ["admin:orders"],
    queryFn: () => fetchOrders(), 
  });
  if (isPending) return <div>"Loading...";</div>;
  if (error) return <div>"An error has occurred: " + error.message;</div>;
  console.log('data :>> ', data);
  return (
    <div>
       <Table.Root size="sm" striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>User</Table.ColumnHeader>
          <Table.ColumnHeader>Address</Table.ColumnHeader>
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader>Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">İtems </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item,id) => (
          <Table.Row key={id}>
            <Table.Cell>{item.user.email}</Table.Cell>
            <Table.Cell>{item.adress}</Table.Cell>
            <Table.Cell>{item.items.map((product)=>(product.title+", "))}</Table.Cell>
            <Table.Cell>{item.items.map((product)=>(product.price+", "))}</Table.Cell>
            <Table.Cell textAlign="end">{item.items.length}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </div>
  );
}

export default Orders;
