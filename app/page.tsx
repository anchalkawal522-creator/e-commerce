"use client"
import Image from "next/image";
import Hero from "./componets/Hero/Hero";
import Categories from "./componets/categories/page";
import Deals from "./componets/Deals/page";
import Brand from "./componets/Brand/page";
import Offers from "./componets/Offers/page";
import Popular from "./componets/Popular/page";
import Offerbanner from "./componets/offerbanner/page";
export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Deals />
      <Brand />
      <Offers />
      <Popular />
      <Offerbanner />
    </div>
  );
}
