import { GAME_DATA, GameKey, IMAGES, TABS, Plan } from "./games";

export const GAME_META: Record<GameKey, { name: string; keyword: string; image: string }> = {
  weplay: { name: "WePlay", keyword: "WePlay CC Top-Up", image: IMAGES.weplayGold },
  jackaroo: { name: "Jackaroo King", keyword: "Jackaroo King Diamonds Top-Up", image: IMAGES.jackarooGold },
  bgmi: { name: "BGMI", keyword: "BGMI UC Top-Up", image: IMAGES.bgmi },
  freefire: { name: "Free Fire", keyword: "Free Fire Diamonds Top-Up", image: IMAGES.freefire },
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export type ProductEntry = {
  game: GameKey;
  gameName: string;
  sectionTitle: string;
  image: string;
  plan: Plan;
  slug: string;
  url: string;
};

export const ALL_PRODUCTS: ProductEntry[] = (Object.keys(GAME_DATA) as GameKey[]).flatMap(
  (game) => {
    const tab = TABS.find((t) => t.key === game)!;
    return GAME_DATA[game].sections.flatMap((section) =>
      section.plans.map<ProductEntry>((plan) => {
        const slug = `${game}-${slugify(plan.title)}`;
        return {
          game,
          gameName: tab.name,
          sectionTitle: section.title,
          image: section.image,
          plan,
          slug,
          url: `/product/${slug}`,
        };
      })
    );
  }
);

export const findProduct = (slug: string) => ALL_PRODUCTS.find((p) => p.slug === slug);
