import { Header } from "@/components/header"
import { Skeleton } from "@/components/ui/skeleton"

export default function PropertyLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="solid" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-9 w-24" />
        </div>
        <Skeleton className="mb-4 h-10 w-full max-w-xl" />
        <Skeleton className="mb-8 h-5 w-72" />
        <Skeleton className="mb-10 h-[450px] w-full rounded-xl" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-36 w-full" />
          </div>
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </main>
    </div>
  )
}
