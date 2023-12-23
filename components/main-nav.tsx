"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNav = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "سەرەتا",
      active: pathname === "/",
    },
    {
      href: "/city",
      label: "شارەکان",
      active: pathname === "/city",
    },
    {
      href: "/town",
      label: "قەزا",
      active: pathname === "/town",
    },
    {
      href: "/street",
      label: "گەڕەک",
      active: pathname === "/street",
    },
    {
      href: "/volunteer",
      label: "خۆبەخشەکان",
      active: pathname === "/volunteer",
    },
  ];
  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-8 xl:ml-20",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black border rounded-full p-2 w-[110px] text-center justify-center border-black transition-all"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
