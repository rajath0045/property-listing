import { notFound, redirect } from "next/navigation"
import { getPropertyBySlug, properties } from "@/lib/properties"

interface PropertiesAliasPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }))
}

export default async function PropertiesAliasPage({ params }: PropertiesAliasPageProps) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  redirect(`/property/${property.slug}`)
}
