import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/advertisement-agency-in-delhi",
        destination: "/ppc-advertising-management-and-performance-marketing",
        permanent: true,
      },
      {
        source: "/ai-automation",
        destination: "/ai-marketing-workflow-automation-solutions",
        permanent: true,
      },
      {
        source: "/best-digital-marketing-services-in-delhi",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/blog-post",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/clients",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact-search-performance-marketing-agency",
        permanent: true,
      },
      {
        source: "/descriptive-case-study",
        destination: "/case-studies",
        permanent: true,
      },

      // Digital Marketing Location Pages
      ...[
        "arun-vihar",
        "bilaspur",
        "chanakyapuri",
        "connaught-place",
        "defence-colony",
        "dlf-phase-1-to-5",
        "golf-course-road",
        "golf-links",
        "greater-kailash",
        "greater-noida",
        "gtp-nagar",
        "gurugram",
        "hauz-khaz",
        "jaypee-green",
        "jor-bagh",
        "khan-market",
        "kirti-nagar",
        "lodi-road",
        "mayapuri",
        "naraina",
        "noida",
        "okhla",
        "sector-15a",
        "sector-18",
        "sector-27",
        "sector-37",
        "sector-42",
        "sector-43",
        "sector-44",
        "sector-45",
        "sector-46",
        "sector-49",
        "sector-50",
        "sector-60",
        "sector-62",
        "sector-65",
        "sector-80",
        "sector-81",
        "sector-82",
        "sector-83",
        "sector-84",
        "sector-85",
        "sector-86",
        "sector-87",
        "sector-88",
        "shanti-niketan",
        "shushant-lok",
        "sohna-road",
        "tilak-nagar",
        "udyog-nagar",
        "vasant-kunj",
        "vasant-vihar",
        "wazirpur",
      ].map((location) => ({
        source: `/digital-marketing-agency-in-${location}`,
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      })),

      {
        source: "/digital-marketing-services-in-delhi",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/digital-marketing-services-in-delhi-1",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/ecommerce-market-in-gagency-in-delhi",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/faqs",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/how-we-work",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/lp-pm",
        destination: "/ppc-advertising-management-and-performance-marketing",
        permanent: true,
      },
      {
        source: "/lp-ppc",
        destination: "/ppc-advertising-management-and-performance-marketing",
        permanent: true,
      },
      {
        source: "/lp-ppc-1",
        destination: "/ppc-advertising-management-and-performance-marketing",
        permanent: true,
      },
      {
        source: "/lp-seo",
        destination: "/search-engine-optimization-seo-growth-services",
        permanent: true,
      },
      {
        source: "/lp-shop",
        destination: "/google-shopping-ads-management-for-ecommerce",
        permanent: true,
      },
      {
        source: "/lp-wb",
        destination: "/high-conversion-website-development-services",
        permanent: true,
      },
      {
        source: "/market-place-optimisation",
        destination: "/marketplace-listing-optimization-for-ecommerce",
        permanent: true,
      },
      {
        source: "/meet-the-team",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/nhp",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/performance-marketing",
        destination: "/ppc-advertising-management-and-performance-marketing",
        permanent: true,
      },
      {
        source: "/performance-marketing-agency-in-delhi",
        destination: "/ppc-advertising-management-and-performance-marketing",
        permanent: true,
      },
      {
        source: "/real-estate-marketing-agency-in-delhi",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/research-analytics",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/seo",
        destination: "/search-engine-optimization-seo-growth-services",
        permanent: true,
      },
      {
        source: "/seo-services-in-delhi",
        destination: "/search-engine-optimization-seo-growth-services",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/shopify-agency-in-delhi",
        destination: "/marketplace-listing-optimization-for-ecommerce",
        permanent: true,
      },

      // Social Media Marketing Location Pages
      ...[
        "arun-vihar",
        "bilaspur",
        "chanakyapuri",
        "connaught-place",
        "defence-colony",
        "dlf-phase-1-to-5",
        "golf-course-road",
        "golf-links",
        "greater-kailash",
        "greater-noida",
        "gtp-nagar",
        "gurugram",
        "hauz-khaz",
        "jaypee-green",
        "jor-bagh",
        "khan-market",
        "kirti-nagar",
        "lodi-road",
        "mayapuri",
        "naraina",
        "noida",
        "okhla",
        "sector-15a",
        "sector-18",
        "sector-27",
        "sector-37",
        "sector-42",
        "sector-43",
        "sector-44",
        "sector-45",
        "sector-46",
        "sector-49",
        "sector-50",
        "sector-60",
        "sector-62",
        "sector-65",
        "sector-80",
        "sector-81",
        "sector-82",
        "sector-83",
        "sector-84",
        "sector-85",
        "sector-86",
        "sector-87",
        "sector-88",
        "shanti-niketan",
        "shushant-lok",
        "sohna-road",
        "tilak-nagar",
        "udyog-nagar",
        "vasant-kunj",
        "vasant-vihar",
        "wazirpur",
      ].map((location) => ({
        source: `/social-media-marketing-agency-in-${location}`,
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      })),

      {
        source: "/social-media-marketing-agency-in-delhi",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
      {
        source: "/thank-you",
        destination: "/contact-search-performance-marketing-agency",
        permanent: true,
      },
      {
        source: "/website-design-agency-in-delhi",
        destination: "/conversion-focused-ui-ux-design-for-websites",
        permanent: true,
      },
      {
        source: "/websitedevelopment",
        destination: "/high-conversion-website-development-services",
        permanent: true,
      },
      {
        source: "/wordpress-design-agency-in-delhi",
        destination: "/high-conversion-website-development-services",
        permanent: true,
      },

      // Blog Redirects
      {
        source: "/blog/best-b2b-platforms-for-indian-exporters-2025",
        destination: "/blog/best-b2b-platforms-for-indian-exporters-2026",
        permanent: true,
      },
      {
        source: "/blog/best-ai-automation-tools-for-marketing-teams-in-2025",
        destination:
          "/blog/boost-productivity-5x-best-ai-automation-tools-for-marketing-teams-in-2026",
        permanent: true,
      },
      {
        source: "/blog/how-to-get-seen-and-grow-your-business-today",
        destination:
          "/blog/social-media-marketing-strategy-how-to-get-seen-and-grow-your-business-today",
        permanent: true,
      },
      {
        source: "/blog/how-to-start-an-ecommerce-business-from-scratch-in-2025",
        destination:
          "/blog/how-to-start-an-ecommerce-business-from-scratch-in-2026",
        permanent: true,
      },

      // About Us
      {
        source: "/aboutus",
        destination: "/search-driven-performance-marketing-company",
        permanent: true,
      },
    ];
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;