import { getServices } from "@/app/lib/getServices";
import ServicesIndexClient from "./ServicesIndexClient";

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesIndexClient services={services} />;
}
