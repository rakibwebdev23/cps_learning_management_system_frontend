"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [regOpen, setRegOpen] = useState(true)
  const [maintenance, setMaintenance] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader title="System Settings" description="Global application configuration." />

      <div className="w-full rounded-xl border bg-white p-6 space-y-6 shadow-sm">
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Platform Name</Label>
              <Input defaultValue="CPS LMS" />
            </div>
            <div className="space-y-1.5">
              <Label>Support Email</Label>
              <Input defaultValue="support@cpslms.com" />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-slate-900 mb-4">Platform Controls</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Allow New Registrations</p>
                <p className="text-xs text-slate-500">Enable or disable new user signups</p>
              </div>
              <Switch checked={regOpen} onCheckedChange={setRegOpen} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Maintenance Mode</p>
                <p className="text-xs text-slate-500">Take the site offline for non-admins</p>
              </div>
              <Switch checked={maintenance} onCheckedChange={setMaintenance} />
            </div>
          </div>
        </div>

        <Separator />

        <Button onClick={handleSave} className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold">
          <Save className="h-4 w-4 text-white" />{saved ? "Saved!" : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
