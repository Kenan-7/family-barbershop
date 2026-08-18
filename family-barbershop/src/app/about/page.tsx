import { AboutClosingCta } from "@/components/about/AboutClosingCta";
import { AboutGalleryPreview } from "@/components/about/AboutGalleryPreview";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutJourney } from "@/components/about/AboutJourney";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutValues } from "@/components/about/AboutValues";

export const metadata = {
  title: "About",
  description:
    "Discover the story behind Family Barber Shop — premium barbering, family-friendly service, and a welcoming community in Roswell, GA.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <AboutJourney />
      <AboutStats />
      <AboutGalleryPreview />
      <AboutClosingCta />
    </>
  );
}
