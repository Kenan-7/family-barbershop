import { HomeHero } from "@/components/home/HomeHero";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PopularServices } from "@/components/home/PopularServices";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { ReviewsShowcase } from "@/components/home/ReviewsShowcase";
import { GalleryShowcase } from "@/components/home/GalleryShowcase";
import { LocationExperience } from "@/components/home/LocationExperience";
import { PremiumClosingCta } from "@/components/home/PremiumClosingCta";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustBar />
      <WhyChooseUs />
      <PopularServices />
      <ProductShowcase />
      <ReviewsShowcase />
      <GalleryShowcase limit={8} />
      <LocationExperience />
      <PremiumClosingCta />
    </>
  );
}
