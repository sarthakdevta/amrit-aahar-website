import { createClient } from "@/lib/supabase/server"
import { MessagesManager } from "@/components/admin/messages-manager"

export default async function AdminMessagesPage() {
  const supabase = await createClient()
  
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">
          View and manage contact messages
        </p>
      </div>

      <MessagesManager initialMessages={messages || []} />
    </div>
  )
}
