import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/app/lib/sanity";
import {
  singleServicePageQuery,
  allServicePageSlugsQuery,
} from "@/app/lib/queries";
import { type ServicePage } from "@/app/lib/types";
import { getServices } from "@/app/lib/getServices";
import ServicePageClient from "./ServicePageClient";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(allServicePageSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await sanityFetch<ServicePage | null>(
    singleServicePageQuery,
    { slug }
  );

  if (!service) return { title: "Service Not Found | EyeSpy Cabling" };

  return {
    title: service.metaTitle ?? `${service.title} | EyeSpy Cabling`,
    description: service.metaDescription ?? service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, services] = await Promise.all([
    sanityFetch<ServicePage | null>(singleServicePageQuery, { slug }),
    getServices(),
  ]);

  if (!service) notFound();

  return <ServicePageClient service={service} services={services} />;
}
