import { ProductsBarbersPick } from "@/components/products/ProductsBarbersPick";
import { ProductsClosingCta } from "@/components/products/ProductsClosingCta";
import { ProductsCollection } from "@/components/products/ProductsCollection";
import { ProductsComparison } from "@/components/products/ProductsComparison";
import { ProductsFeatured } from "@/components/products/ProductsFeatured";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductsWhyBarbers } from "@/components/products/ProductsWhyBarbers";

export const metadata = {
  title: "Products",
  description:
    "Professional grooming products used and recommended by the barbers at Family Barber Shop in Roswell, GA.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductsFeatured />
      <ProductsWhyBarbers />
      <ProductsComparison />
      <ProductsBarbersPick />
      <ProductsCollection />
      <ProductsClosingCta />
    </>
  );
}
