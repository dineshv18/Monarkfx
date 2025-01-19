"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BarChart3, TrendingUp, Coins } from "lucide-react";
import Image from "next/image";

const educationData = [
  {
    title: "Stocks",
    icon: <BarChart3 className="h-6 w-6" />,
    description: "Master the art of stock trading with our comprehensive courses.",
    image: '/card/c1.jpg',
  },
  {
    title: "Forex",
    icon: <TrendingUp className="h-6 w-6" />,
    description: "Learn to navigate the foreign exchange market like a pro.",
    image: '/card/c2.jpg',
  },
  {
    title: "Cryptocurrency",
    icon: <Coins className="h-6 w-6" />,
    description: "Dive into the world of digital assets and blockchain technology.",
    image: '/card/c3.jpg',
  }
];

export function EducationCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {educationData.map((item, index) => (
        <CardContainer key={index} className="inter-var">
          <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-red-500/[0.1] border-black/[0.1] w-auto sm:w-[300px] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 "
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {item.title}
              </div>
            </CardItem>
            
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={item.image}
                height="200"
                width="300"
                className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={item.title}
              />
            </CardItem>
            
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-4 "
            >
              {item.description}
            </CardItem>
            
            <CardItem
              translateZ="30"
              className="w-full mt-4"
            >
              <button className="rounded-lg h-10 w-full bg-black  text-white text-sm font-bold transition-all hover:bg-red-600 ">
                Learn More →
              </button>
            </CardItem>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}