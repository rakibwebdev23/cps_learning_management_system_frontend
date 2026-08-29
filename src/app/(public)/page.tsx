import type { Metadata } from "next"
import HeroSection from "@/components/home/HeroSection"
import PopularCourses from "@/components/home/PopularCourses"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import StudentTestimonials from "@/components/home/StudentTestimonials"
import FinalCTA from "@/components/home/FinalCTA"

export const metadata: Metadata = {
  title: "CPS LMS — Professional Learning Management System",
  description: "Master in-demand skills with expert-led courses in web dev, data science, design, and more. Join 15,000+ learners on CPS LMS.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularCourses />
      <WhyChooseUs />
      <StudentTestimonials />
      <FinalCTA />
    </>
  )
}
