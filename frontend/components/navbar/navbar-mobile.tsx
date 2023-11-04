import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export function NavbarMobile() {
  return (
    <div className="flex items-center justify-end px-4 sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <HamburgerMenuIcon className="h-6 w-6 mt-4 cursor-pointer" />
        </SheetTrigger>
        <SheetContent>
          <div className="grid gap-4 py-4">
            <Link href="/link1">
              <h2>link1</h2>
            </Link>
            <Link href="/link2">
              <h2>link2</h2>
            </Link>
            <Link href="/link3">
              <h2>link3</h2>
            </Link>
            <Link href="/link4">
              <h2>link4</h2>
            </Link>
          </div>
          <div className="mt-4">
            <h2>odaberi jezik</h2>
            <LocaleSwitcher />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
