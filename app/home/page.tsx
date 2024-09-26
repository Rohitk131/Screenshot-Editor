'use client'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import IconCloud from '../components/logoCloud'
import Features from '../components/Features'

const Pricing = dynamic(() => import('../components/pricing'), { 
  loading: () => <p>Loading...</p>,
  ssr: false 
})

const FAQ = dynamic(() => import('../components/faq'), { 
  loading: () => <p>Loading...</p>,
  ssr: false 
})

import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiM4YjVjZjYiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-10"></div>
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-300 to-indigo-300 rounded-full opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-yellow-300 to-pink-300 rounded-full opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <Navbar />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="w-full mx-auto pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-gray-900 leading-tight">
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-gray-700 mt-6 mb-12 max-w-4xl mx-auto"
            >
              Boost engagement by up to{" "}
              <span className="font-semibold text-indigo-600">60%</span> with
              eye-catching screenshots that captivate your audience.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
            >
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out hover:bg-indigo-50 border-2 border-indigo-600">
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
          <IconCloud />
          <Features />
          <Suspense fallback={<div>Loading pricing...</div>}>
            <Pricing />
          </Suspense>
          <h1 className="text-4xl font-bold text-center mt-16 mb-8">FAQs</h1>
          <Suspense fallback={<div>Loading FAQs...</div>}>
            <FAQ />
          </Suspense>
          <footer className="bg-purple-100 mt-4 rounded-t-2xl">
            <div className="mx-auto w-full max-w-7xl p-4 py-4 lg:py-8 lg:pt-16">
              <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                  <a href="https://flowbite.com/" className="flex items-center">
                    <img src="https://gixland.com/wp-content/uploads/2021/11/logoipsum-logo-17-01.png" className="h-8 me-3" alt="FlowBite Logo" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                    <ul className="text-gray-500 font-medium">
                      <li className="mb-4">
                        <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                      </li>
                      <li>
                        <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                    <ul className="text-gray-500 font-medium">
                      <li className="mb-4">
                        <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                      </li>
                      <li>
                        <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                    <ul className="text-gray-500 font-medium">
                      <li className="mb-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="my-6 border-gray-200 lg:my-8" />
              <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
                <div className="flex mt-4 sm:justify-center sm:mt-0">
                  {/* Social Media Links */}
                  {/* Include your social media icons here */}
                </div>
              </div>
            </div>
          </footer>
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
  )
}

export default Home