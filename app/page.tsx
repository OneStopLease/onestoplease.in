"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Categories } from "./constants";
import MobileNavbar from "@/components/MobileNavbar";
import useIsMobile from "@/hooks/useIsMobile";
import { useState, useEffect, useRef } from "react";
import { 
  FiTruck, 
  FiRefreshCw, 
  FiShield, 
  FiDollarSign,
  FiArrowRight,
  FiArrowDown
} from "react-icons/fi";

export default function Home() {
  const isMobile = useIsMobile();
  const categoryGridRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (categoryGridRef.current) {
        const rect = categoryGridRef.current.getBoundingClientRect();
        // Show arrow only if the category grid is below the viewport (needs scrolling)
        // Check if the top of the grid is below the bottom of the viewport
        const needsScrolling = rect.top > window.innerHeight;
        setShowArrow(needsScrolling);
      }
    };

    // Check on mount and scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);
  
  return (
    <main className="min-h-screen flex flex-col bg-gray">
      {isMobile ? <MobileNavbar /> : <Navbar />}
      
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28 bg-gradient-to-br from-background via-background to-gray/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                  Rent Smarter with{" "}
                  <span className="text-highlight relative inline-block">
                    OneStopLease
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-highlight/20 rounded-full"></span>
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-lg text-foreground/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Affordable rentals for furniture, appliances, electronics and many more. 
                  All in one place, experience fast delivery, easy returns, and hassle-free service.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/products">
                  <Button className="px-8 py-6 text-base sm:text-lg bg-highlight hover:bg-highlightHover text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Explore Products
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contribute">
                  <Button className="px-8 py-6 text-base sm:text-lg bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Contribute & Earn
                  </Button>
                </Link>
                <Link href="/contribute/view-contributions">
                  <Button className="px-8 py-6 text-base sm:text-lg bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    View Contributions
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-foreground/10">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-highlight">1000+</div>
                  <div className="text-xs sm:text-sm text-foreground/70 mt-1">Products</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-highlight">500+</div>
                  <div className="text-xs sm:text-sm text-foreground/70 mt-1">Happy Customers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-highlight">24/7</div>
                  <div className="text-xs sm:text-sm text-foreground/70 mt-1">Support</div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg lg:max-w-xl relative z-0">
              <div className="relative">
                <div className="absolute inset-0 bg-highlight/10 rounded-3xl blur-3xl transform rotate-6"></div>
                <div className="relative z-10">
                  <Image
                    src="/hero.svg"
                    alt="Rental service illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Browse by <span className="text-highlight">Category</span>
              </h2>
              {showArrow && (
                <FiArrowDown className="text-highlight text-2xl sm:text-3xl lg:text-4xl animate-pulse" />
              )}
            </div>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Explore our wide range of rental products across different categories
            </p>
          </div>
          
          <div ref={categoryGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {Categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link 
                  key={category.name} 
                  href={`/products/${category.category}`}
                  className="group"
                >
                  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:shadow-highlight/20 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center h-full transform hover:-translate-y-1">
                    <div className="w-10 h-10 bg-highlight/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-highlight/20 transition-all duration-300">
                      <Icon className="text-3xl text-highlight group-hover:text-highlightHover transition-colors" />
                    </div>
                    <p className="text-sm font-semibold text-black text-center group-hover:text-highlight transition-colors">
                      {category.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="text-highlight">OneStopLease</span>?
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Experience the best in rental services with our commitment to quality and convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: FiTruck,
                title: "Fast Delivery",
                description: "Quick and reliable delivery to your doorstep"
              },
              {
                icon: FiRefreshCw,
                title: "Easy Returns",
                description: "Hassle-free return process whenever you need"
              },
              {
                icon: FiShield,
                title: "Quality Assured",
                description: "Premium products with quality guarantee"
              },
              {
                icon: FiDollarSign,
                title: "Affordable Prices",
                description: "Best rental rates without compromising quality"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-foreground/10 dark:border-background/10 p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-highlight/10 rounded-xl flex items-center justify-center mb-2  group-hover:bg-highlight/20 transition-colors">
                  <feature.icon className="text-2xl text-highlight" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-black text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-gradient-to-r from-highlight to-highlightHover">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust OneStopLease for their rental needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="px-8 py-6 text-base sm:text-lg bg-white text-highlight hover:bg-white/90 shadow-xl transition-all duration-300">
                Browse Products
              </Button>
            </Link>
            <Link href="/contribute">
              <Button className="px-8 py-6 text-base sm:text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300">
                Start Contributing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-background border-t border-foreground/10 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-foreground/70">
                © {new Date().getFullYear()} OneStopLease. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/products" className="text-foreground/70 hover:text-highlight transition-colors">
                Products
              </Link>
              <Link href="/contribute" className="text-foreground/70 hover:text-highlight transition-colors">
                Contribute
              </Link>
              <Link href="/contribute/view-contributions" className="text-foreground/70 hover:text-highlight transition-colors">
                View Contributions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
