import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());

  // 获取当前月份的天数
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 获取当前月份第一天是星期几（0=周日）
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 生成日历数组
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // 添加空白占位
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 添加日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // 切换月份
  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // 检查是否是今天
  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // 模拟任务数据（后续可以从API获取）
  const hasTask = (day: number | null) => {
    if (!day) return false;
    // 示例：5号、12号、20号有任务
    return [5, 12, 20, 25].includes(day);
  };

  const weekDaysZh = ["日", "一", "二", "三", "四", "五", "六"];
  const weekDaysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthNamesZh = [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"
  ];

  const days = generateCalendar();

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-4">
      {/* 页面标题 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <CalendarIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{t("日历", "Calendar")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("查看和管理您的任务日程", "View and manage your schedule")}
          </p>
        </div>
      </div>

      {/* 日历卡片 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => changeMonth(-1)}
              data-testid="button-prev-month"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <CardTitle className="text-lg">
              {t(
                `${currentDate.getFullYear()}年 ${monthNamesZh[currentDate.getMonth()]}`,
                `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              )}
            </CardTitle>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => changeMonth(1)}
              data-testid="button-next-month"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* 星期标题 */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {(t("", "") === "" ? weekDaysEn : weekDaysZh).map((day, index) => (
              <div
                key={index}
                className="text-center text-xs font-medium text-muted-foreground py-2"
              >
                {t(weekDaysZh[index], weekDaysEn[index])}
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className="aspect-square"
              >
                {day && (
                  <button
                    data-testid={`calendar-day-${day}`}
                    className={`
                      w-full h-full rounded-lg flex flex-col items-center justify-center
                      text-sm font-medium transition-colors relative
                      hover-elevate active-elevate-2
                      ${isToday(day)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                      }
                    `}
                  >
                    <span>{day}</span>
                    {hasTask(day) && !isToday(day) && (
                      <div className="w-1 h-1 rounded-full bg-primary mt-1" />
                    )}
                    {hasTask(day) && isToday(day) && (
                      <div className="w-1 h-1 rounded-full bg-primary-foreground mt-1" />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 今日任务预览 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t("今日任务", "Today's Tasks")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* 模拟任务列表 */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm">{t("完成项目报告", "Finish project report")}</span>
            </div>
            <Badge variant="secondary">{t("今日", "Today")}</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm">{t("团队会议", "Team meeting")}</span>
            </div>
            <Badge variant="secondary">14:00</Badge>
          </div>

          <div className="text-center py-4 text-sm text-muted-foreground">
            {t("点击日期查看更多任务", "Tap on a date to see more tasks")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
