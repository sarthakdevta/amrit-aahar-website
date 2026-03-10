import { createClient } from "@/lib/supabase/server"
import { SettingsManager } from "@/components/admin/settings-manager"

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  
  const { data: contactInfo } = await supabase
    .from("contact_info")
    .select("*")
    .single()

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your restaurant contact information
        </p>
      </div>

      <SettingsManager initialContactInfo={contactInfo} />
    </div>
  )
}
