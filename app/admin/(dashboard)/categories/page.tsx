import { createClient } from "@/lib/supabase/server"
import { CategoriesManager } from "@/components/admin/categories-manager"

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  
  const { data: categories } = await supabase
    .from("menu_categories")
    .select("*")
    .order("sort_order")

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Menu Categories</h1>
        <p className="text-muted-foreground mt-1">
          Manage your menu categories
        </p>
      </div>

      <CategoriesManager initialCategories={categories || []} />
    </div>
  )
}
