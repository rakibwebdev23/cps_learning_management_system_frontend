"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Camera, Save, Bell, Lock, Loader2 } from "lucide-react"
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
import { useGetMeQuery, useUpdateProfileMutation } from "@/redux/api/featuresApi/auth/authApi"

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

export default function ProfilePage({ user: initialUser }: { user?: User }) {
  const { data: meData, isLoading } = useGetMeQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

  // use api data or fallback to initialuser for ui if api is still loading (or just show loader)
  const user = meData || initialUser

  const [saved, setSaved] = useState(false)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [smsNotifs, setSmsNotifs] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { 
      name: user?.name || user?.username || "", 
      email: user?.email || "", 
      phone: (user as any)?.phone || "", 
      bio: (user as any)?.bio || "" 
    },
  })
  
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || user.username || "",
        email: user.email || "",
        phone: (user as any).phone || "",
        bio: (user as any).bio || ""
      })
    }
  }, [user, reset])

  const pwForm = useForm<PwData>({ resolver: zodResolver(pwSchema) })

  const onSave = async (data: ProfileData) => {
    try {
      await updateProfile({
        username: data.name,
        // @ts-ignore - assuming these fields exist in backend
        phone: data.phone,
        bio: data.bio
      }).unwrap()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Failed to update profile:", error)
      alert("Failed to update profile. Check console.")
    }
  }

  const onPwChange = (data: PwData) => {
    console.log("Password change:", data)
    pwForm.reset()
  }

  if (isLoading && !user) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
  if (!user) return <div className="p-12 text-center text-slate-500">Could not load profile.</div>

  const displayName = user.name || user.username || "User"
  const roleName = (user as any).role?.name || (user as any).role || "student"

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
            <div className="lg:col-span-1">
              <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={(user as any).avatar} />
                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-900 font-bold">{getInitials(displayName)}</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-[#0075FD] text-white rounded-full p-1.5 hover:bg-blue-600 transition-colors shadow-sm cursor-pointer">
                    <Camera className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
                <p className="font-semibold text-slate-900">{displayName}</p>
                <p className="text-xs text-slate-500 mt-0.5 capitalize">{typeof roleName === "string" ? roleName.toLowerCase().replace("_", " ") : "User"}</p>
              </div>
            </div>

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
                    <Input type="email" {...register("email")} disabled className="bg-slate-50" />
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
                <Button type="submit" disabled={isUpdating} className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold cursor-pointer">
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="h-4 w-4 text-white" />}
                  {isUpdating ? "Saving..." : saved ? "Saved!" : "Save Changes"}
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
            <Button type="submit" className="bg-[#0075FD] hover:bg-blue-600 text-white font-bold gap-2 cursor-pointer">
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
