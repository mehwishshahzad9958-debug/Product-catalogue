/**
 * Company details for RASAM Spices.
 *
 * Source: the back page of `inventories/Rasam Catalog Print File.pdf`
 * ("For business enquiries & distributorships"). The same phone number,
 * email and address also appear on the pouch labels.
 *
 * Keep every company fact in this one file so it can be updated in one place.
 */
export const company = {
  displayName: "RASAM Spices",
  /** Brand line printed on the brochure cover. */
  brandLine: "Swad aisa Rasmo jaisa",
  /** Launch date stated in the brochure's About Us page. */
  launchDate: "11 October 2025",
  phone: {
    display: "+91 99581 68136",
    href: "tel:+919958168136",
  },
  email: "info@rasamfoods.com",
  website: {
    display: "rasamfoods.com",
    href: "https://rasamfoods.com",
  },
  address: {
    lines: ["H-73, Sector 63", "Noida 201301", "Uttar Pradesh, India"],
  },
  fssaiLicence: "12726054000026",
} as const;

/** Pre-filled email link for business enquiries. */
export const enquiryMailto = `mailto:${company.email}?subject=${encodeURIComponent(
  "Business enquiry – RASAM Spices",
)}`;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact Us", href: "/contact" },
] as const;
