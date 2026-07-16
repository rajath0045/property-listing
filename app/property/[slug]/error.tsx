"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function PropertyError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="solid" />
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-3 text-3xl font-semibold text-foreground">We could not load this stay</h1>
        <p className="mb-6 text-muted-foreground">
          Please try again, or return to the property collection.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outline">
            <Link href="/#properties">View all stays</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
