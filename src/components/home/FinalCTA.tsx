import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0F172A] p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-left max-w-xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-sm text-slate-300">
              Join thousands of learners and start your journey today.
            </p>
          </div>

          <Link
            href="/register"
            className="group relative border-2 border-[#F59E0B] text-white bg-transparent rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-300 cursor-pointer overflow-hidden z-10 shadow-lg shadow-amber-500/20 shrink-0 inline-flex items-center justify-center"
          >
            <span className="absolute inset-0 bg-[#F59E0B] -z-20" />
            <span className="absolute inset-0 bg-[#050C1C] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10" />
            <span className="relative z-20 text-white transition-colors duration-300">
              Get Started Now
            </span>
          </Link>

        </div>
      </div>
    </section>
  )
}
