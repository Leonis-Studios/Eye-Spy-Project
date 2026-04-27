import { siteSettings } from "./schema/siteSettings";
import { blogPost } from "./schema/blogPost";
import { testimonial } from "./schema/testimonial";
import { faqItem } from "./schema/faqItem";
import { teamMember } from "./schema/teamMember";
import { serviceArea } from "./schema/serviceArea";
import { servicePage } from "./schema/servicePage";
import { pricingPage } from "./schema/pricingPage";
import { homePage } from "./schema/homePage";
import { aboutPage } from "./schema/aboutPage";
import { contactPage } from "./schema/contactPage";

export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  blogPost,
  testimonial,
  faqItem,
  teamMember,
  serviceArea,
  servicePage,
  pricingPage,
];
