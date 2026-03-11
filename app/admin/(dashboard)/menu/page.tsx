import { createClient } from "@/lib/supabase/server"
import { MenuItemsManager } from "@/components/admin/menu-items-manager"

export default async function AdminMenuPage() {
  const supabase = await createClient()
  
  const [{ data: menuItems }, { data: categories }] = await Promise.all([
    supabase
      .from("menu_items")
      .select("*, category:categories(*)")
      .order("sort_order"),
    supabase
      .from("categories")
      .select("*")
      .order("sort_order"),
  ])

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Menu Items</h1>
        <p className="text-muted-foreground mt-1">
          Manage your menu items
        </p>
      </div>

      <MenuItemsManager 
        initialItems={menuItems || []} 
        categories={categories || []} 
      />
    </div>
  )
}
