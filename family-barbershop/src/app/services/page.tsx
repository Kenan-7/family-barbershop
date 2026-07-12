import { ServicesAllServices } from "@/components/services/ServicesAllServices";
import { ServicesBeforeAfter } from "@/components/services/ServicesBeforeAfter";
import { ServicesClosingCta } from "@/components/services/ServicesClosingCta";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesHowItWorks } from "@/components/services/ServicesHowItWorks";
import { ServicesMostBooked } from "@/components/services/ServicesMostBooked";
import { ServicesWhyChoose } from "@/components/services/ServicesWhyChoose";

export const metadata = {
  title: "Services",
  description:
    "Premium barbering services at Family Barber Shop — haircuts, skin fades, beard trims, and more in Roswell, GA.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesMostBooked />
      <ServicesAllServices />
      <ServicesHowItWorks />
      <ServicesBeforeAfter />
      <ServicesWhyChoose />
      <ServicesFaq />
      <ServicesClosingCta />
    </>
  );
}
