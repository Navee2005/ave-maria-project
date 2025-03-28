"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="bg-background py-16 sm:py-24 relative overflow-hidden" id="about">
      {/* Add background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-light rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary-light rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:text-center">
          <motion.h2
            className="text-base text-primary font-semibold tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our Mission and Vision
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-20">
          <div className="space-y-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">Who We Are</h3>
              <p className="text-lg text-muted-foreground">
                Ave Maria is a dedicated team of media professionals who are passionate about using our skills to serve
                churches and religious organizations. Founded in 2015, we have worked with over 50 churches across the
                country, helping them effectively communicate their message through various media channels.
              </p>
              <p className="text-lg text-muted-foreground mt-4">
                Our team consists of videographers, photographers, audio engineers, graphic designers, and web
                developers who are committed to providing high-quality media services to churches at no cost.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground">
                Our mission is to empower churches with professional media services that help them effectively spread
                their message and connect with their communities. We believe that every church, regardless of size or
                budget, deserves access to high-quality media resources.
              </p>
              <p className="text-lg text-muted-foreground mt-4">
                We are driven by our faith and the belief that our skills and talents can be used to serve God's
                kingdom. By providing free media services to churches, we aim to contribute to the growth and impact of
                the church in today's digital world.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 lg:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4 lg:text-center">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="relative group overflow-hidden rounded-lg bg-background border-2 border-blue-500/30 hover:border-blue-500/70 transition-all duration-300">
                {/* Add shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative p-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <h4 className="text-xl font-semibold text-foreground mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    Excellence
                  </h4>
                  <p className="text-muted-foreground transform group-hover:translate-x-1 transition-all duration-300">
                    We are committed to delivering the highest quality media services that reflect the excellence of the
                    message we help communicate.
                  </p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg bg-background border-2 border-blue-500/30 hover:border-blue-500/70 transition-all duration-300">
                {/* Add shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative p-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <h4 className="text-xl font-semibold text-foreground mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    Service
                  </h4>
                  <p className="text-muted-foreground transform group-hover:translate-x-1 transition-all duration-300">
                    We serve churches with humility and dedication, putting their needs and vision at the center of our
                    work.
                  </p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg bg-background border-2 border-blue-500/30 hover:border-blue-500/70 transition-all duration-300">
                {/* Add shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative p-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <h4 className="text-xl font-semibold text-foreground mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    Innovation
                  </h4>
                  <p className="text-muted-foreground transform group-hover:translate-x-1 transition-all duration-300">
                    We embrace creative and innovative approaches to media production, staying current with the latest
                    technologies and trends to effectively communicate timeless truths.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

