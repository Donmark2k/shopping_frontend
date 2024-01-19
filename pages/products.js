import Header from "@/components/header";
import styled from "styled-components";
import Center from "@/components/center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/product";
import ProductsGrid from "@/components/productsGrid";
import Title from "@/components/title";

export default function ProductsPage({products}) {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, {sort:{'_id':-1}});
  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}