import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "product" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE = "https://kredcc.lovable.app";

const Seo = ({ title, description, canonical, image, type = "website", jsonLd }: Props) => {
  const url = canonical ? (canonical.startsWith("http") ? canonical : `${SITE}${canonical}`) : SITE;
  const img = image || "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776372681/kred_cc_croped_img_av55uf.png";
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
