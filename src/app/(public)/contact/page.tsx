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

import { useSubmitContactMutation } from "@/redux/api/featuresApi/contact/contact.api"

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(schema) })
  const [submitContact, { isSuccess: isSubmitSuccessful, isLoading }] = useSubmitContactMutation()

  const onSubmit = async (data: FormData) => {
    try {
      await submitContact(data).unwrap()
      reset()
    } catch (err) {
      console.error("Failed to submit contact form:", err)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white border-b border-slate-100 text-slate-900 pt-20 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm shrink-0 bg-[#0075FD] text-white">
              <Mail className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-black tracking-tight">Contact Us</h1>
              <p className="text-slate-600 font-medium mt-1">Have a question? We'd love to hear from you.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900">Get In Touch</h2>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">Our support team typically responds within 24 hours. You can also reach us on social media.</p>
            {[
              { icon: Mail, label: "Email", value: "support@cpslms.com" },
              { icon: Phone, label: "Phone", value: "+880 1700-000000" },
              { icon: MapPin, label: "Address", value: "123 Learning Street, Dhaka 1200, Bangladesh" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl shrink-0 shadow-sm bg-[#0075FD] text-white">
                    <Icon className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5 block">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="lg:col-span-2">
            {isSubmitSuccessful ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-slate-200 bg-white">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600 font-medium">Thanks for reaching out. We'll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border border-slate-200 bg-white p-6 lg:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-slate-900 font-bold block">Full Name</Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} className="text-slate-900 bg-white border-slate-300 placeholder:text-slate-400" />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-slate-900 font-bold block">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" {...register("email")} className="text-slate-900 bg-white border-slate-300 placeholder:text-slate-400" />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-slate-900 font-bold block">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" {...register("subject")} className="text-slate-900 bg-white border-slate-300 placeholder:text-slate-400" />
                  {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-slate-900 font-bold block">Message</Label>
                  <Textarea id="message" placeholder="Tell us more..." rows={5} {...register("message")} className="text-slate-900 bg-white border-slate-300 placeholder:text-slate-400" />
                  {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                </div>
                <Button type="submit" size="lg" className="w-full bg-[#0075FD] hover:bg-blue-600 text-white font-bold gap-2 rounded-full">
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
