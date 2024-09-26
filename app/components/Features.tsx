"use client"

import { useEffect, useRef } from "react"
import { Layers, Zap, Smartphone, Globe } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"

const features = [
  {
    icon: Layers,
    title: "Modular Architecture",
    description: "Build scalable applications with our modular component system.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed and performance across all devices and platforms.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Responsive design that looks great on any screen size.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Localization support for worldwide accessibility and engagement.",
  },
]

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
      }}
      className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-purple-50 ${
        index % 2 === 0 ? "md:transform md:-translate-y-4" : ""
      }`}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-purple-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

export default function EnhancedFeatureSection() {
  return (
    <section className="py-20 relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiMwMDAiPjwvY2lyY2xlPgo8L3N2Zz4=')]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Our <span className="text-purple-300">Powerful</span> Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}