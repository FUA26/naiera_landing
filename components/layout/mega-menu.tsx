"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Users,
  Stethoscope,
  GraduationCap,
  Receipt,
  Building2,
  HeartHandshake,
  Newspaper,
  Calendar,
  FileText,
  Scale,
  Map,
  Image as ImageIcon,
  Landmark,
  UserCircle,
  Tent,
  Building,
  Contact,
} from "lucide-react";

export function MegaMenu() {
  const t = useTranslations("Navigation.megaMenu");
  const tNav = useTranslations("Navigation");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Home Link - Simple */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#beranda"
              className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
            >
              {tNav("home")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Services - Mega Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {t("services.title")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-emerald-600/50 to-emerald-600 p-6 no-underline outline-none select-none focus:shadow-md"
                    href="#layanan"
                  >
                    <Building2 className="h-6 w-6 text-white" />
                    <div className="mt-4 mb-2 text-lg font-medium text-white">
                      {t("services.title")}
                    </div>
                    <p className="text-sm leading-tight text-white/90">
                      {t("services.description")}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="#"
                title={t("services.items.population.title")}
                icon={Users}
              >
                {t("services.items.population.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("services.items.health.title")}
                icon={Stethoscope}
              >
                {t("services.items.health.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("services.items.education.title")}
                icon={GraduationCap}
              >
                {t("services.items.education.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("services.items.tax.title")}
                icon={Receipt}
              >
                {t("services.items.tax.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("services.items.business.title")}
                icon={Building2}
              >
                {t("services.items.business.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("services.items.social.title")}
                icon={HeartHandshake}
              >
                {t("services.items.social.desc")}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Information - Mega Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {t("information.title")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                href="#"
                title={t("information.items.news.title")}
                icon={Newspaper}
              >
                {t("information.items.news.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("information.items.agenda.title")}
                icon={Calendar}
              >
                {t("information.items.agenda.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("information.items.transparency.title")}
                icon={FileText}
              >
                {t("information.items.transparency.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("information.items.regulations.title")}
                icon={Scale}
              >
                {t("information.items.regulations.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("information.items.tourism.title")}
                icon={Map}
              >
                {t("information.items.tourism.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("information.items.gallery.title")}
                icon={ImageIcon}
              >
                {t("information.items.gallery.desc")}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Government - Mega Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            {t("agency.title")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                href="#"
                title={t("agency.items.profile.title")}
                icon={Landmark}
              >
                {t("agency.items.profile.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("agency.items.structure.title")}
                icon={UserCircle}
              >
                {t("agency.items.structure.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("agency.items.dinas.title")}
                icon={Building}
              >
                {t("agency.items.dinas.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("agency.items.camat.title")}
                icon={Tent}
              >
                {t("agency.items.camat.desc")}
              </ListItem>
              <ListItem
                href="#"
                title={t("agency.items.dpr.title")}
                icon={Building2}
              >
                {t("agency.items.dpr.desc")}
              </ListItem>
              <ListItem
                href="/kontak"
                title={t("agency.items.contact.title")}
                icon={Contact}
              >
                {t("agency.items.contact.desc")}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm leading-none font-medium">
            {Icon && <Icon className="h-4 w-4 text-emerald-600" />}
            {title}
          </div>
          <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
