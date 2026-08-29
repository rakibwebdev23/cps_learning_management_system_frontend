"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Camera, Save, Bell, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHeader from "@/components/common/PageHeader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import type { User } from "@/types/user"

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  bio: z.string().optional(),
})
type ProfileData = z.infer<typeof profileSchema>

const pwSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(8),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] })
type PwData = z.infer<typeof pwSchema>

export default function ProfilePage({ user }: { user: User }) {
  const [saved, setSaved] = useState(false)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [smsNotifs, setSmsNotifs] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, email: user.email, phone: user.phone, bio: user.bio },
  })
  const pwForm = useForm<PwData>({ resolver: zodResolver(pwSchema) })

  const onSave = (data: ProfileData) => {
    console.log("Profile update:", data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const onPwChange = (data: PwData) => {
    console.log("Password change:", data)
    pwForm.reset()
  }

  return (
    <div>
      <PageHeader title="My Profile" description="Manage your account settings and preferences." />

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* avatar */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl bg-amber-100 text-amber-900 font-bold">{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-[#F59E0B] text-white rounded-full p-1.5 hover:bg-amber-600 transition-colors shadow-sm cursor-pointer">
                    <Camera className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 capitalize">{user.role.toLowerCase().replace("_", " ")}</p>
              </div>
            </div>

            {/* form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSave)} className="rounded-xl border bg-white p-6 space-y-4 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Full Name</Label>
                    <Input {...register("name")} />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Email Address</Label>
                    <Input type="email" {...register("email")} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <Input {...register("phone")} placeholder="+880 1700-000000" />
                </div>
                <div className="space-y-1.5">
                  <Label>Bio</Label>
                  <Textarea {...register("bio")} rows={4} placeholder="Tell us about yourself..." />
                </div>
                <Button type="submit" className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold cursor-pointer">
                  <Save className="h-4 w-4 text-white" />{saved ? "Saved!" : "Save Changes"}
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <form onSubmit={pwForm.handleSubmit(onPwChange)} className="rounded-xl border bg-white p-6 max-w-md space-y-4 shadow-sm">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Lock className="h-4 w-4" />Change Password</h3>
            <Separator />
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field} className="space-y-1.5">
                <Label>{field === "currentPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm New Password"}</Label>
                <Input type="password" {...pwForm.register(field as any)} />
                {pwForm.formState.errors[field as keyof PwData] && (
                  <p className="text-xs text-red-500">{pwForm.formState.errors[field as keyof PwData]?.message}</p>
                )}
              </div>
            ))}
            <Button type="submit" className="bg-[#F59E0B] hover:bg-amber-600 text-white font-bold gap-2 cursor-pointer">
              <Lock className="h-4 w-4 text-white" />Update Password
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="rounded-xl border bg-white p-6 max-w-md space-y-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Bell className="h-4 w-4" />Notification Preferences</h3>
            <Separator />
            {[
              { label: "Email notifications", desc: "Receive updates, reminders via email", value: emailNotifs, onChange: setEmailNotifs },
              { label: "SMS notifications", desc: "Receive important alerts via SMS", value: smsNotifs, onChange: setSmsNotifs },
            ].map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <Switch checked={item.value} onCheckedChange={item.onChange} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
