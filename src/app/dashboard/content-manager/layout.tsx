import DashboardLayout from "@/components/layout/DashboardLayout"

export default function ContentManagerLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="content-manager">{children}</DashboardLayout>
}
