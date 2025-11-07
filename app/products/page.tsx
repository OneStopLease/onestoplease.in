"use client";

import Link from "next/link";
import { CategoriesPath } from "@/app/constants";
import { FiArrowRight } from "react-icons/fi";

function getDescriptionForCategory(name: string) {
   switch (name.toLowerCase()) {
      case "furniture":
         return "Beds, sofas, tables & more";
      case "appliances":
         return "Fridge, oven, washing machine";
      case "electronics":
         return "Mobiles, laptops & gadgets";
      case "vehicles":
         return "Scooters, bikes, cars";
      case "fitness":
         return "Treadmills, bikes & more";
      case "baby":
         return "Cribs, toys & essentials";
      default:
         return "";
   }
}

export default function ProductsPage() {
   return (
      <main className="min-h-screen bg-gray">
         {/* Header Section */}
         <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-gradient-to-br from-background via-background to-gray/30">
            <div className="max-w-7xl mx-auto text-center">
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                  Explore Our <span className="text-highlight">Categories</span>
               </h1>
               <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
                  Browse through our wide range of rental products and find exactly what you need
               </p>
            </div>
         </section>

         {/* Categories Grid */}
         <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {CategoriesPath.map(({ name, icon, pathName }) => {
                     const Icon = icon;

                     return (
                        <Link key={pathName} href={pathName} className="group">
                           <div className="h-full bg-background rounded-2xl p-8 cursor-pointer transition-all duration-300 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:shadow-highlight/20 border border-foreground/10 hover:border-highlight/30 transform hover:-translate-y-2">
                              {/* Icon Container */}
                              <div className="w-10 h-10 bg-highlight/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-highlight/20 transition-all duration-300 group-hover:scale-110">
                                 <Icon className="text-4xl text-highlight group-hover:text-highlightHover transition-colors" />
                              </div>
                              
                              {/* Category Name */}
                              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-highlight transition-colors">
                                 {name}
                              </h3>
                              
                              {/* Description */}
                              <p className="text-sm sm:text-base text-foreground/70 mb-4 leading-relaxed">
                                 {getDescriptionForCategory(name)}
                              </p>
                              
                              {/* Arrow Indicator */}
                              <div className="mt-auto flex items-center text-highlight group-hover:text-highlightHover transition-colors">
                                 <span className="text-sm font-medium mr-2">Explore</span>
                                 <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                              </div>
                           </div>
                        </Link>
                     )
                  })}
               </div>
            </div>
         </section>
      </main>
   );
}
