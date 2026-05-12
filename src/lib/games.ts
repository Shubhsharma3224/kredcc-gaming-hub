export type Plan = {
  title: string;
  desc: string;
  price: number;
  link: string;
  badge?: string;
};

export type GameKey = "weplay" | "jackaroo" | "bgmi" | "freefire";

export const TABS: { key: GameKey; name: string; logo: string }[] = [
  { key: "weplay", name: "WePlay", logo: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776371629/weplay_logo_xuj5nz.png" },
  { key: "jackaroo", name: "Jackaroo King", logo: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776495737/jackaroo_king_img_j8wd1u.webp" },
  { key: "bgmi", name: "BGMI", logo: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776371629/bgmi_logo_pyyal4.webp" },
  { key: "freefire", name: "Free Fire", logo: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776371630/Free_Fire_Max_Logo_gjjccx.jpg" },
];

export const IMAGES = {
  redPacket: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776371628/weplay_redpacket_img_lrmhuq.png",
  weplayGold: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776371628/weplay_coin_img_lukmnc.png",
  jackarooGold: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776495737/diamond_img_j292lz.png",
  bgmi: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776371629/bgmi_uc_img_vjkmxf.jpg",
  freefire: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776371629/free_fire_diamond_img_uelkf1.png",
  logo: "https://res.cloudinary.com/dptwx8vd3/image/upload/v1776372681/kred_cc_croped_img_av55uf.png",
};

const weplayRed: Plan[] = [
  { title: "10K RED PACKET CC", desc: "10,000 + 1,000 bonus", price: 479, link: "https://upikar.in/shared-payment?amount=479.00&purpose=10K+GOLD+CC&clientName=LOWESTWEPLAY&merchantName=KredCC&upiId=lowestweplay%40ybl&merchantPhoto=https%3A%2F%2Fupikarprofile.blob.core.windows.net%2Fprofile-photos%2F4g0jC0YR6KZyOAXM2spHvlth1192%2F1777737074096-kred-cc-croped-img.png" },
  { title: "50K RED PACKET CC", desc: "50,000 + 5,000 bonus", price: 1299, link: "https://upikar.in/shared-payment?amount=1299.00&purpose=50K+GOLD+CC&clientName=LOWESTWEPLAY&merchantName=KredCC&upiId=lowestweplay%40ybl&merchantPhoto=https%3A%2F%2Fupikarprofile.blob.core.windows.net%2Fprofile-photos%2F4g0jC0YR6KZyOAXM2spHvlth1192%2F1777737074096-kred-cc-croped-img.png", badge: "Popular" },
];
const weplayGold: Plan[] = [
  { title: "10K GOLD CC", desc: "10,000 + 1,000 bonus", price: 479, link: "https://upikar.in/shared-payment?amount=479.00&purpose=10K+GOLD+CC&clientName=LOWESTWEPLAY&merchantName=KredCC&upiId=lowestweplay%40ybl&merchantPhoto=https%3A%2F%2Fupikarprofile.blob.core.windows.net%2Fprofile-photos%2F4g0jC0YR6KZyOAXM2spHvlth1192%2F1777737074096-kred-cc-croped-img.png" },
  { title: "50K GOLD CC", desc: "50,000 + 5,000 bonus + 1 Broad Absolute", price: 1299, link: "https://upikar.in/shared-payment?amount=1299.00&purpose=50K+GOLD+CC&clientName=LOWESTWEPLAY&merchantName=KredCC&upiId=lowestweplay%40ybl&merchantPhoto=https%3A%2F%2Fupikarprofile.blob.core.windows.net%2Fprofile-photos%2F4g0jC0YR6KZyOAXM2spHvlth1192%2F1777737074096-kred-cc-croped-img.png" },
  { title: "100K GOLD CC", desc: "1 Lakh + 10,000 bonus + 2 Broad Absolute", price: 2199, link: "https://razorpay.me/@fluxfinds?amount=PJ6ahFrCviFu2k0RR%2FxHaQ%3D%3D", badge: "Best Value" },
  { title: "250K GOLD CC", desc: "2.5 Lakh + 25,000 bonus + 5 Broad Absolute", price: 4200, link: "https://razorpay.me/@fluxfinds?amount=oh4Guho1gKcvyRP5As1tWg%3D%3D" },
  { title: "500K GOLD CC", desc: "5 Lakh + 50,000 bonus + 10 Broad Absolute", price: 5999, link: "https://razorpay.me/@fluxfinds?amount=Uj2fVBg%2FvclD1RF0o2z%2BbA%3D%3D", badge: "Mega" },
];

const swap = (s: string) => s.replace(/bonus/g, "bonus DIAMONDS");
const jackarooRed: Plan[] = weplayRed.map(p => ({ ...p, desc: swap(p.desc) }));
const jackarooGold: Plan[] = weplayGold.map(p => ({ ...p, desc: swap(p.desc) }));

export const GAME_DATA: Record<GameKey, {
  needsName: boolean;
  sections: { title: string; image: string; plans: Plan[] }[];
}> = {
  weplay: {
    needsName: true,
    sections: [
      { title: "Red Packet CC", image: IMAGES.redPacket, plans: weplayRed },
      { title: "Gold CC", image: IMAGES.weplayGold, plans: weplayGold },
    ],
  },
  jackaroo: {
    needsName: true,
    sections: [
      { title: "Red Packet Diamonds", image: IMAGES.redPacket, plans: jackarooRed },
      { title: "Gold Diamonds", image: IMAGES.jackarooGold, plans: jackarooGold },
    ],
  },
  bgmi: {
    needsName: false,
    sections: [{
      title: "BGMI UC",
      image: IMAGES.bgmi,
      plans: [
        { title: "9,250 UC", desc: "Unknown Cash", price: 599, link: "https://razorpay.me/@fluxfinds?amount=QmsUqSRscbBFbActEhLNwg%3D%3D" },
        { title: "13,100 UC", desc: "Unknown Cash", price: 699, link: "https://razorpay.me/@fluxfinds?amount=sIVBxHOzXntdIH1q7%2FFnVA%3D%3D" },
        { title: "25,212 UC", desc: "Unknown Cash", price: 799, link: "https://razorpay.me/@fluxfinds?amount=ouka7pPo%2Fz198lsjyH%2BoeQ%3D%3D" },
        { title: "32,400 UC", desc: "Unknown Cash", price: 899, link: "https://razorpay.me/@fluxfinds?amount=NIt3xHCNPNi%2BgrwecRISoA%3D%3D" },
        { title: "35,500 UC", desc: "Unknown Cash", price: 999, link: "https://razorpay.me/@fluxfinds?amount=hs5%2BhsUaIlsmW%2BfZKlAvnw%3D%3D", badge: "Popular" },
        { title: "47,000 UC", desc: "Unknown Cash", price: 1299, link: "https://razorpay.me/@fluxfinds?amount=N6UC2nLxOlAFTrRn0HmYgw%3D%3D" },
        { title: "56,500 UC", desc: "Unknown Cash", price: 1499, link: "https://razorpay.me/@fluxfinds?amount=7unOpejHme904tlqAZFr2g%3D%3D" },
        { title: "75,500 UC", desc: "Unknown Cash", price: 1999, link: "https://razorpay.me/@fluxfinds?amount=UQXm6JwtQ1bplHyCJN9ubQ%3D%3D" },
        { title: "95,500 UC", desc: "Unknown Cash", price: 2499, link: "https://razorpay.me/@fluxfinds?amount=CdUuh2XJyIebYS7yQ%2F0%2F3A%3D%3D" },
        { title: "1,25,000 UC", desc: "Unknown Cash", price: 2999, link: "https://razorpay.me/@fluxfinds?amount=rUxChLvree1kySW2MNpYVg%3D%3D", badge: "Mega" },
      ],
    }],
  },
  freefire: {
    needsName: false,
    sections: [{
      title: "Free Fire Diamonds",
      image: IMAGES.freefire,
      plans: [
        { title: "3,160 Diamonds", desc: "In-game currency", price: 599, link: "https://razorpay.me/@fluxfinds?amount=QmsUqSRscbBFbActEhLNwg%3D%3D" },
        { title: "4,200 Diamonds", desc: "In-game currency", price: 799, link: "https://razorpay.me/@fluxfinds?amount=ouka7pPo%2Fz198lsjyH%2BoeQ%3D%3D" },
        { title: "5,600 Diamonds", desc: "In-game currency", price: 999, link: "https://razorpay.me/@fluxfinds?amount=hs5%2BhsUaIlsmW%2BfZKlAvnw%3D%3D" },
        { title: "6,520 Diamonds", desc: "In-game currency", price: 1199, link: "https://razorpay.me/@fluxfinds?amount=u2pdjT4Ul7xaZii3HFkDCA%3D%3D" },
        { title: "8,400 Diamonds", desc: "In-game currency", price: 1499, link: "https://razorpay.me/@fluxfinds?amount=7unOpejHme904tlqAZFr2g%3D%3D", badge: "Popular" },
        { title: "16,800 Diamonds", desc: "In-game currency", price: 1698, link: "https://razorpay.me/@fluxfinds?amount=XvVGiDzbIS9D2RTu%2FcaDKw%3D%3D" },
        { title: "33,600 Diamonds", desc: "In-game currency", price: 1999, link: "https://razorpay.me/@fluxfinds?amount=UQXm6JwtQ1bplHyCJN9ubQ%3D%3D" },
        { title: "50,000 Diamonds", desc: "In-game currency", price: 3999, link: "https://razorpay.me/@fluxfinds?amount=89HMs09uDz5J5tXbJBtk9w%3D%3D", badge: "Mega" },
      ],
    }],
  },
};

export const REVIEWS = [
  { name: "Rohan M.", text: "Best prices for WePlay! Delivery within 2 minutes.", color: "from-indigo-500 to-violet-500" },
  { name: "Priya S.", text: "BGMI UC received instantly. Trustworthy website!", color: "from-pink-500 to-fuchsia-500" },
  { name: "Akash K.", text: "Jackaroo King diamonds at cheapest rate ever!", color: "from-amber-500 to-orange-500" },
  { name: "Neha V.", text: "Free Fire top-up is super fast. Highly recommend!", color: "from-emerald-500 to-teal-500" },
  { name: "Vikram J.", text: "Using for 3 months, never had any issue. 10/10", color: "from-sky-500 to-blue-500" },
  { name: "Ananya P.", text: "Customer support is very helpful. Instant resolution.", color: "from-rose-500 to-pink-500" },
];
