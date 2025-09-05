"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CheckCircle2 } from 'lucide-react';


const plansData = [
  {
    title: "Free Plan",
    description: "Give it a try",
    price: { monthly: 0, yearly: 0 },
    features: [
      "5 Min Mock Interview",
      "Automated interview scheduling",
      "AI Score Analysis",
    ],
    isFeatured: false,
  },
  {
    title: "Basic Plan",
    description: "Quickly prepare for interview",
    price: { monthly: 499, yearly: 4790 }, // 499 * 12 * 0.8 = 4790.4
    features: [
      "150 Min Mock Interview",
      "Automated interview scheduling",
      "AI Score Analysis",
    ],
    isFeatured: false,
  },
  {
    title: "Professional Plan",
    description: "Best for interview preparation",
    price: { monthly: 1250, yearly: 12000 }, // 1250 * 12 * 0.8 = 12000
    features: [
      "450 Min Mock Interview",
      "Basic Plan Features",
      "Interview Report Analytics",
    ],
    isFeatured: true,
  },
];


function PricingCard({ plan, isYearly }) {
  const price = isYearly ? plan.price.yearly : plan.price.monthly;
  const term = isYearly ? "/yearly" : "/monthly";

  return (
    <div className={`flex flex-col rounded-xl border ${plan.isFeatured ? 'border-primary shadow-lg' : 'border-gray-200 shadow-md'} bg-white transition-transform hover:scale-105`}>
      {/* Card Header */}
      <div className={`p-6 rounded-t-xl ${plan.isFeatured ? 'bg-primary' : 'bg-indigo-600'}`}>
        <h3 className="text-xl font-bold text-white text-center">{plan.title}</h3>
      </div>

      {/* Card Body */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Price */}
        <div className="flex items-baseline justify-center">
          <span className={`text-4xl font-extrabold tracking-tight ${plan.isFeatured ? 'text-gray-900' : 'text-gray-400'}`}>
            ₹{price}
          </span>
          <span className="ml-1 text-xl font-semibold text-gray-500">{term}</span>
        </div>
        <p className="mt-4 text-center text-gray-600">{plan.description}</p>

        {/* Features */}
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">What's included</h4>
          <ul className="mt-4 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="mt-auto pt-8">
          <Button
            size="lg"
            className="w-full"
            variant={plan.isFeatured ? "default" : "outline"}
          >
            {plan.isFeatured ? "Choose and Get 20%" : "Choose Plan"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BillingsPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen mt-5 rounded-md shadow-md">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-300">
            Choose the Perfect Plan for <br />
            <span className="text-gray-800">Your Interview Needs</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Our Basic Plan is ideal for startups and small businesses looking to optimize their hiring process.
          </p>
        </div>

        
        <div className="flex items-center justify-center gap-4 mt-10">
          <span className={`font-semibold ${!isYearly ? 'text-primary' : 'text-gray-500'}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            aria-label="Toggle billing period"
          />
          <span className={`font-semibold ${isYearly ? 'text-primary' : 'text-gray-500'}`}>
            Yearly <span className="text-green-600">20% OFF</span>
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plansData.map((plan) => (
            <PricingCard key={plan.title} plan={plan} isYearly={isYearly} />
          ))}
        </div>
      </div>
    </div>
  );
}