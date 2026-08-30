const steps = [
  { step: "01", title: "Create Your Account", desc: "Sign up for free in minutes. Choose the plan that fits your learning goals." },
  { step: "02", title: "Browse & Enroll", desc: "Discover courses across 8+ categories. Enroll instantly with one click." },
  { step: "03", title: "Learn & Practice", desc: "Watch video lessons, complete quizzes, and track your progress in real time." },
  { step: "04", title: "Get Certified", desc: "Complete your course, pass the final quiz, and earn your certificate." },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#0075FD] mb-2 uppercase tracking-wider">Simple Process</p>
          <h2 className="text-3xl font-bold text-slate-900">How CPS LMS Works</h2>
          <p className="text-slate-500 mt-3">Four simple steps to transform your career.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0075FD] text-white text-2xl font-extrabold mb-4 mx-auto">
                {step.step}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[-50%] h-0.5 bg-blue-200" />
              )}
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
