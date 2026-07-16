import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="solid" />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-3 text-3xl font-semibold text-foreground">Property not found</h1>
        <p className="mb-6 text-muted-foreground">
          This listing may have moved, but the full collection is still available.
        </p>
        <Button asChild>
          <Link href="/#properties">View all stays</Link>
        </Button>
      </main>
    </div>
  )
}
