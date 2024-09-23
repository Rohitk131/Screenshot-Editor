'use client'
import React from "react";
import Navbar from "../components/Navbar";
import { ChevronRight } from 'lucide-react';
import Pricing from '../components/pricing';

const logos = [
    {
      name: 'Vercel',
      url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg',
    },
    {
      name: 'Nextjs',
      url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881475/nextjs_logo_dark_gfkf8m.svg',
    },
    {
      name: 'Prime',
      url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg',
    },
    {
      name: 'Trustpilot',
      url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tkfspxqmjflfllbuqxsi.svg',
    },
    {
      name: 'Webflow',
      url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg',
    },
  
    {
      name: 'Airbnb',
      url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg',
    },
    {
      name: 'Tina',
      url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/afqhiygywyphuou6xtxc.svg',
    },
    {
      name: 'Stackoverflow',
      url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/ts1j4mkooxqmscgptafa.svg',
    },
    {
      name: 'mistral',
      url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg',
    },
  ]
  
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <div className="container mx-auto px-4">
        <main className="max-w-5xl mx-auto py-20 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900 leading-tight">
            Supercharge Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Screenshots
            </span> in{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-extrabold text-yellow-500 crayon-highlight px-2">
                Seconds
              </span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mt-6 mb-12 max-w-3xl mx-auto">
            Boost engagement by up to{" "}
            <span className="font-semibold text-indigo-600">60%</span> with
            eye-catching screenshots that captivate your audience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out hover:bg-indigo-50 border-2 border-indigo-600">
              Watch Demo
            </button>
          </div>
          <div className="w-full py-12 bg-gray-50 rounded-xl shadow-inner">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Trusted by industry leaders</h3>
            <div className="mx-auto w-full px-4 md:px-8">
              <div
                className="group relative mt-6 flex gap-6 overflow-hidden p-2"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
              >
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                    >
                      {logos.map((logo, key) => (
                        <img
                          key={key}
                          src={logo.url}
                          className="h-8 w-24 px-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
                          alt={`${logo.name}`}
                        />
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Pricing/>
        </main>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap");

        .crayon-highlight {
          font-family: "Caveat", cursive;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,50 Q25,20 50,50 T100,50' stroke='%23fde047' stroke-width='30' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: 100% 95%;
          background-position: center;
          padding: 0.2em 0.1em;
        }

        @keyframes logo-cloud {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-logo-cloud {
          animation: logo-cloud 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;