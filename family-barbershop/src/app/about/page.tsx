import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`Welcome to ${business.name}`}
        description="A family barbershop built on clean work, friendly service, and a community-first mindset."
      />

      <section>
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Our story"
                title="Professional cuts in a warm, family-friendly space."
                description="Use this section to share your real story—how the shop started, what you stand for, and what customers can expect every visit."
              />
              <div className="mt-8 space-y-4 text-sm leading-7 text-white/70">
                <p>
                  {business.name} is a neighborhood barbershop serving men, kids, and families.
                  We focus on clean, modern styles and timeless classics—always finished with
                  careful detail.
                </p>
                <p>
                  Our goal is simple: make every customer feel comfortable, respected, and
                  confident walking out the door. We keep a clean environment, take pride in
                  our craft, and treat every appointment like it matters—because it does.
                </p>
                <p>
                  We’re community-focused and proud to be a local spot where regulars come back
                  and new customers feel welcome right away.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="p-6">
                <div className="text-sm font-semibold text-white">What to expect</div>
                <ul className="mt-4 space-y-3 text-sm text-white/70">
                  {[
                    "A clean, comfortable shop with a professional atmosphere",
                    "Skilled barbers who listen and deliver consistent results",
                    "Family-friendly service—patient and welcoming for kids",
                    "Clear pricing and quick booking options",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                        ✓
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-black/30">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Values"
            title="Clean, skilled, community-focused."
            description="These are the trust signals that matter for local businesses—keep them honest and specific."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Clean environment",
                desc: "Fresh stations, tidy tools, and a comfortable experience.",
              },
              {
                title: "Skilled barbers",
                desc: "Modern fades, classic cuts, and careful finishing work.",
              },
              {
                title: "Family-friendly",
                desc: "A welcoming atmosphere for kids and parents alike.",
              },
              {
                title: "Community-first",
                desc: "A local shop built on relationships and repeat visits.",
              },
            ].map((v) => (
              <Card key={v.title} className="p-6">
                <div className="text-base font-semibold text-white">{v.title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{v.desc}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

