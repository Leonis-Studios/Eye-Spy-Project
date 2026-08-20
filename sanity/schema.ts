import { seo } from "./schema/objects/seo";
import { siteSettings } from "./schema/siteSettings";
import { author } from "./schema/author";
import { blogPost } from "./schema/blogPost";
import { testimonial } from "./schema/testimonial";
import { faqItem } from "./schema/faqItem";
import { teamMember } from "./schema/teamMember";
import { serviceArea } from "./schema/serviceArea";
import { servicePage } from "./schema/servicePage";
import { serviceLandingPage } from "./schema/serviceLandingPage";
import { pricingPage } from "./schema/pricingPage";
import { homePage } from "./schema/homePage";
import { aboutPage } from "./schema/aboutPage";
import { contactPage } from "./schema/contactPage";

export const schemaTypes = [
  seo,
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  author,
  blogPost,
  testimonial,
  faqItem,
  teamMember,
  serviceArea,
  servicePage,
  serviceLandingPage,
  pricingPage,
];
