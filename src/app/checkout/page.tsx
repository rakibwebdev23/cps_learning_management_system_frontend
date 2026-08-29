"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Wallet, ShieldCheck, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { getCourseById } from "@/data/courses"
import { formatPrice } from "@/lib/utils"

// using course c1 as demo checkout course
const course = getCourseById("c1")!

export default function CheckoutPage() {
  const router = useRouter()
  const [method, setMethod] = useState("card")
  const [loading, setLoading] = useState(false)

  const discounted = course.discountPrice ?? course.price
  const savings = course.discountPrice ? course.price - course.discountPrice : 0

  const handlePay = () => {
    setLoading(true)
    setTimeout(() => router.push("/checkout/success"), 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 border-b px-6 h-14 flex items-center gap-2">
        <Lock className="h-4 w-4 text-emerald-600" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Secure Checkout</span>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Complete Your Purchase</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* left: payment */}
          <div className="lg:col-span-3 space-y-6">
            {/* payment method */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border p-6">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Payment Method</h2>
              <RadioGroup value={method} onValueChange={setMethod} className="space-y-3">
                {[
                  { value: "card", label: "Credit / Debit Card", icon: CreditCard },
                  { value: "bkash", label: "bKash", icon: Wallet },
                  { value: "nagad", label: "Nagad", icon: Wallet },
                ].map((opt) => {
                  const Icon = opt.icon
                  return (
                    <label key={opt.value} className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${method === opt.value ? "border-[#F59E0B] bg-amber-50 dark:bg-amber-950" : "border-slate-200 dark:border-slate-700 hover:border-slate-300"}`}>
                      <RadioGroupItem value={opt.value} />
                      <Icon className="h-5 w-5 text-slate-500" />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </label>
                  )
                })}
              </RadioGroup>
            </div>

            {/* card details */}
            {method === "card" && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border p-6 space-y-4">
                <h2 className="font-semibold text-slate-900 dark:text-white">Card Details</h2>
                <div className="space-y-1.5">
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM / YY" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>CVV</Label>
                    <Input placeholder="•••" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Cardholder Name</Label>
                  <Input placeholder="John Doe" />
                </div>
              </div>
            )}
          </div>

          {/* right: order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-xl border p-6 sticky top-6">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Order Summary</h2>

              {/* course */}
              <div className="flex gap-3 mb-5">
                <div className="relative h-16 w-24 rounded-lg overflow-hidden shrink-0">
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" sizes="96px" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2 leading-snug">{course.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{course.instructorName}</p>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Original Price</span><span>{formatPrice(course.price)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span><span>-{formatPrice(savings)}</span>
                  </div>
                )}
              </div>

              <Separator className="mb-4" />
              <div className="flex justify-between font-bold text-lg text-slate-900 dark:text-white mb-5">
                <span>Total</span><span>{formatPrice(discounted)}</span>
              </div>

              <Button
                onClick={handlePay}
                disabled={loading}
                className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold gap-2"
                size="lg"
              >
                <ShieldCheck className="h-4 w-4" />
                {loading ? "Processing..." : "Pay Now"}
              </Button>
              <p className="text-center text-xs text-slate-400 mt-3">🔒 Secured by SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
