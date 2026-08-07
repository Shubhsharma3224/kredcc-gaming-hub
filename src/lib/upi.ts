export const UPI_IDS = [
  "shubhsharmaa@slc",
  "BHARATPE.9D0G0R0Y6T421308@unitype",
  "weplayrechargee@nyes",
  "lowestweplayy@axl",
  "lowestweplay@ibl",
  "weplayrecharge@ybl",
];

export const MERCHANT_NAME = "KredCC";

/**
 * One random UPI ID per page load (module is evaluated once per session/refresh).
 */
export const SESSION_UPI_ID = UPI_IDS[Math.floor(Math.random() * UPI_IDS.length)];

export const buildUpiUri = (opts: {
  upiId: string;
  amount: number;
  note: string;
  scheme?: string;
}) => {
  const params = new URLSearchParams({
    pa: opts.upiId,
    pn: MERCHANT_NAME,
    am: opts.amount.toFixed(2),
    cu: "INR",
    tn: opts.note.slice(0, 60),
  });
  return `${opts.scheme ?? "upi"}://pay?${params.toString()}`;
};

export const qrImageUrl = (upiUri: string, size = 240) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(upiUri)}`;

export const UPI_APPS: { name: string; scheme: string; logo: string; color: string }[] = [
  { name: "Paytm", scheme: "paytmmp", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg", color: "from-sky-500 to-blue-600" },
  { name: "BHIM", scheme: "upi", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1f/BHIM_logo.svg", color: "from-orange-500 to-amber-500" },
  { name: "Google Pay", scheme: "tez", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg", color: "from-emerald-500 to-green-600" },
  { name: "PhonePe", scheme: "phonepe", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/PhonePe-Logo.svg", color: "from-violet-500 to-purple-600" },
];
