import PageHeader from "@/components/common/PageHeader"
import EnrollmentChart from "@/components/charts/EnrollmentChart"
import QuizPerformanceChart from "@/components/charts/QuizPerformanceChart"
import UserDistributionChart from "@/components/charts/UserDistributionChart"
import CompletionChart from "@/components/charts/CompletionChart"

export default function AdminStatisticsPage() {
  return (
    <div>
      <PageHeader title="Platform Analytics & Statistics" description="Deep dive into system growth, user roles, quiz performance, and completion rates." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentChart />
        <QuizPerformanceChart />
        <UserDistributionChart />
        <CompletionChart />
      </div>
    </div>
  )
}
