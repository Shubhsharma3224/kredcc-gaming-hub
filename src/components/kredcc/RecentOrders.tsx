import { useEffect } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

const NAMES = [
  "Rohan", "Priya", "Akash", "Neha", "Vikram", "Ananya", "Aditya", "Sneha",
  "Arjun", "Pooja", "Karan", "Riya", "Rahul", "Kavya", "Siddharth", "Isha",
  "Manish", "Divya", "Nikhil", "Tanya", "Suresh", "Meera", "Harsh", "Anjali",
];

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Indore", "Bhopal", "Patna",
  "Chandigarh", "Nagpur", "Kochi", "Coimbatore", "Visakhapatnam", "Guwahati",
  "Noida", "Gurgaon", "Faridabad", "Thane", "Ranchi",
];

const PLANS = [
  "10K Gold CC", "50K Gold CC", "100K Gold CC", "250K Gold CC", "500K Gold CC",
  "10K Red Packet CC", "50K Red Packet CC",
  "9250 UC", "13100 UC", "25212 UC", "47000 UC", "75500 UC",
  "3160 Diamonds", "5600 Diamonds", "8400 Diamonds", "16800 Diamonds", "33600 Diamonds",
];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const showOrderToast = () => {
  const name = pick(NAMES);
  const city = pick(CITIES);
  const plan = pick(PLANS);
  const minsAgo = Math.floor(Math.random() * 5) + 1;

  toast(
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 shrink-0 rounded-full gradient-bg grid place-items-center text-primary-foreground shadow-glow">
        <ShoppingBag className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight">
          {name} from {city}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          just purchased <span className="font-semibold text-foreground">{plan}</span>
        </p>
        <p className="text-[10px] text-muted-foreground mt-1">
          {minsAgo} min ago · ✓ Verified Order
        </p>
      </div>
    </div>,
    { duration: 5000, position: "bottom-right" }
  );
};

const RecentOrders = () => {
  useEffect(() => {
    const first = setTimeout(showOrderToast, 4000);
    let id: ReturnType<typeof setTimeout>;
    const loop = () => {
      const delay = Math.floor(Math.random() * 5000) + 15000; // 15-20s
      id = setTimeout(() => {
        showOrderToast();
        loop();
      }, delay);
    };
    loop();
    return () => {
      clearTimeout(first);
      clearTimeout(id);
    };
  }, []);

  return null;
};

export default RecentOrders;
