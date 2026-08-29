import ProfilePage from "@/components/common/ProfilePage"
import { demoContentManager } from "@/data/users"

export default function ContentManagerProfilePage() {
  return <ProfilePage user={demoContentManager} />
}
