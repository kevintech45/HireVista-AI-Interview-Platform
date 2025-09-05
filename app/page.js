
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, BarChart2, Users } from 'lucide-react';

// Main Page Component
export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

// --- Component: Header ---
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={'/logo.png'} alt="HireVista Logo" width={90} height={90} />
            {/* <span className="font-bold text-xl text-gray-900">HireVista</span> */}
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Pricing</Link>
          </nav>

          {/* Dashboard Button */}
          <Link href="/auth">
            <Button>Dashboard</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

// --- Component: Hero Section ---
function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            AI-Powered <span className="text-primary">Interview Assistant</span>  for Modern Recruiters
          </h1>
          <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg text-gray-600">
            Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Create Interview <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="mt-10 lg:mt-0">
          {/* USER ACTION: Replace this src with a screenshot of your actual dashboard */}
          <Image
            src={'/dashboard2.png'}
            alt="HireVista Dashboard Preview"
            width={1250}
            height={750}
            className="rounded-xl h-[300px] shadow-2xl ring-1 ring-gray-900/10"
            priority
          />
        </div>
      </div>
    </section>
  );
}

// --- Component: Features Section ---
function FeaturesSection() {
  const features = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Save Time",
      description: "Automate initial screening interviews and focus on final candidates.",
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: "Data-Driven Insights",
      description: "Get detailed analytics and candidate comparisons based on interview responses.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Reduce Bias",
      description: "Standardized interviews help eliminate unconscious bias in the hiring process.",
    },
  ];

  return (
    <section id="features" className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Streamline Your Hiring Process</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          HireVista helps you save time and find better candidates with our advanced AI interview technology.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-8 rounded-xl border shadow-sm text-center">
              <div className="bg-blue-100 rounded-full inline-flex p-4">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Component: How It Works Section ---
function HowItWorksSection() {
  const steps = [
    { number: 1, title: "Create Interview", description: "Set up your job requirements and customize interview questions." },
    { number: 2, title: "Share with Candidates", description: "Send interview links to candidates to complete at their convenience." },
    { number: 3, title: "Review Results", description: "Get AI-analyzed results, transcripts, and candidate comparisons." },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How HireVista Works</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Three simple steps to transform your recruitment process.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-blue-100 text-primary font-bold text-xl border-2 border-blue-200">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-base text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Component: Call-to-Action Section ---
function CTASection() {
  return (
    <section id="pricing" className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to Transform Your Hiring Process?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Join hundreds of companies already using HireVista to find the best talent.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={'/auth'}>
          <Button className='cursor-pointer' size="lg">Get Started for Free</Button>
          </Link>
          <Button size="lg" variant="outline">Schedule a Demo</Button>
        </div>
      </div>
    </section>
  );
}

// --- Component: Footer ---
function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center h-20 gap-4">
          <div className="flex items-center gap-2">
            <Image src={'/logo.png'} alt="HireVista Logo" width={80} height={80} />
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-600 hover:text-gray-900">Terms</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">Privacy</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} HireVista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}