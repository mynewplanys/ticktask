import { CalendarPlus, BarChart3, CheckSquare, Settings, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const tabItems = [
  {
    titleZh: "今日",
    titleEn: "Today",
    url: "/",
    icon: CheckSquare,
  },
  {
    titleZh: "日历",
    titleEn: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    titleZh: "任务",
    titleEn: "Tasks",
    url: "/tasks",
    icon: CalendarPlus,
  },
  {
    titleZh: "统计",
    titleEn: "Stats",
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

export function BottomTabBar() {
  const [location, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="ios-tab-bar">
      <div className="flex items-stretch justify-around h-full">
        {tabItems.map((item) => {
          const isActive = location === item.url;
          const Icon = item.icon;
          
          return (
            <button
              key={item.url}
              onClick={() => setLocation(item.url)}
              data-testid={`tab-${item.titleEn.toLowerCase()}`}
              className={cn(
                "flex flex-col items-center justify-center flex-1 gap-1 transition-colors",
                "active:bg-accent/50",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "scale-105")} />
              <span className="text-[10px] font-medium">
                {t(item.titleZh, item.titleEn)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
