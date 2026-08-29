import ProfilePage from "@/components/common/ProfilePage"
import { demoInstructor } from "@/data/users"

export default function InstructorProfilePage() {
  return <ProfilePage user={demoInstructor} />
}
