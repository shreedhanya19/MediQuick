import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Pill, TestTubeDiagonal, Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      title: "Wide Range of Products",
      description: "Explore our extensive catalog of medications and health products.",
      icon: Pill,
      href: "/products",
      cta: "Shop Now",
      dataAiHint: "pharmacy shelf"
    },
    {
      title: "Book Lab Tests",
      description: "Schedule lab tests online with ease and get results securely.",
      icon: TestTubeDiagonal,
      href: "/lab-tests",
      cta: "Book a Test",
      dataAiHint: "lab equipment"
    },
    {
      title: "AI Health Assistant",
      description: "Get personalized health advice and medication information from our AI.",
      icon: Bot,
      href: "/ai-assistant",
      cta: "Ask AI",
      dataAiHint: "friendly robot"
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center py-16 bg-gradient-to-r from-primary/10 via-background to-accent/10 rounded-lg shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Welcome to PharmaFlow
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Your trusted online pharmacy for all your health needs. Easy, reliable, and always caring.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Explore Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10 text-foreground">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <CardDescription className="mb-6">{feature.description}</CardDescription>
                 <Image 
                  src={`https://placehold.co/600x400.png`} 
                  alt={feature.title}
                  width={600}
                  height={400}
                  className="rounded-md mb-6 object-cover aspect-video"
                  data-ai-hint={feature.dataAiHint}
                />
              </CardContent>
              <div className="p-6 pt-0 text-center">
                <Link href={feature.href}>
                  <Button className="w-full">
                    {feature.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 bg-secondary/50 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-foreground">Why Choose PharmaFlow?</h2>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-accent mr-2 mt-0.5 shrink-0" />
                <span>Wide selection of authentic medicines and healthcare products.</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-accent mr-2 mt-0.5 shrink-0" />
                <span>Convenient online lab test booking and secure report access.</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-accent mr-2 mt-0.5 shrink-0" />
                <span>Personalized AI-powered health assistance at your fingertips.</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-6 w-6 text-accent mr-2 mt-0.5 shrink-0" />
                <span>Easy-to-use platform with secure payment options.</span>
              </li>
            </ul>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Happy customer with pharmacy bag"
              width={600}
              height={400}
              className="rounded-lg shadow-md object-cover"
              data-ai-hint="pharmacy customer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
