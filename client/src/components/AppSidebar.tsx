import { CalendarPlus, BarChart3, CheckSquare, Settings } from "lucide-react";
import { useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

const menuItems = [
  {
    titleZh: "今日任务",
    titleEn: "Today",
    url: "/today",
    icon: CheckSquare,
  },
  {
    titleZh: "任务管理",
    titleEn: "Tasks",
    url: "/",
    icon: CalendarPlus,
  },
  {
    titleZh: "统计分析",
    titleEn: "Statistics",
    url: "/statistics",
    icon: BarChart3,
  },
  {
    titleZh: "设置",
    titleEn: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { t } = useLanguage();

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CalendarPlus className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">{t("任务计划", "Task Planner")}</h1>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("导航", "Navigation")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-nav-${item.titleEn.toLowerCase()}`}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{t(item.titleZh, item.titleEn)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
