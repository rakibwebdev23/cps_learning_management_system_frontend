import ProfilePage from "@/components/common/ProfilePage"
import { demoAdmin } from "@/data/users"

export default function AdminProfilePage() {
  return <ProfilePage user={demoAdmin} />
}
