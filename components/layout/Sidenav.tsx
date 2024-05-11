import {
  CalendarIcon,
  CarFront,
  Users,
  WashingMachine,
  ShoppingCart,
} from "lucide-react";
import { UsersAutocomplete } from "../UsersAutocomplete";
import Link from "next/link";
import { dummyData } from "@/dummyData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { DetailedUser } from "@/types/types";
export async function Sidenav() {
  const links = [
    { href: "/users", icon: Users, label: "Users" },
    { href: "/subscriptions", icon: CarFront, label: "Subscriptions" },
    { href: "/purchases", icon: ShoppingCart, label: "Purchases" },
  ];

  return (
    <div
      className="fixed hidden h-full w-[200px] flex-col items-center space-y-12 border-r  py-8 sm:flex"
      aria-label="Sidebar"
    >
      <Link
        href="/"
        className="flex flex-row items-center space-x-1 rounded-full p-2 duration-200 hover:bg-white/10 hover:text-pink-100"
      >
        <WashingMachine className="h-10 w-10 text-pink-400/90 " />
        <span className="sr-only">'Home'</span>
      </Link>
      {links.map(({ href, icon: Icon, label }) => (
        <TooltipProvider key={label} delayDuration={300}>
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Link
                href={href}
                className="relative flex flex-row items-center space-x-4 rounded-full px-4 py-3  hover:bg-white/10"
              >
                <Icon className="h-8 w-8" />
                <span className="sr-only">{label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="m-0 border-none" side="right">
              {label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      <UsersAutocomplete users={dummyData as unknown as DetailedUser[]} />
    </div>
  );
}
