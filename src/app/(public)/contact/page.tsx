"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData) => {
    console.log("Contact form:", data)
    reset()
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <div className="bg-slate-900 text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-slate-400">Have a question? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Get In Touch</h2>
            <p className="text-slate-500 text-sm leading-relaxed">Our support team typically responds within 24 hours. You can also reach us on social media.</p>
            {[
              { icon: Mail, label: "Email", value: "support@cpslms.com" },
              { icon: Phone, label: "Phone", value: "+880 1700-000000" },
              { icon: MapPin, label: "Address", value: "123 Learning Street, Dhaka 1200, Bangladesh" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950 shrink-0">
                    <Icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-slate-900 dark:text-white mt-0.5">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* form */}
          <div className="lg:col-span-2">
            {isSubmitSuccessful ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border rounded-xl">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-500">Thanks for reaching out. We'll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border rounded-xl p-6 lg:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" {...register("subject")} />
                  {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more..." rows={5} {...register("message")} />
                  {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                </div>
                <Button type="submit" size="lg" className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold gap-2">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
