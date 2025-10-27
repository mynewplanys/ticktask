import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// 任务数据类型
interface Task {
  id: string;
  date: string; // YYYY-MM-DD格式
  title: string;
  titleEn: string;
  completed: boolean;
  time?: string;
}

export default function CalendarPage() {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  
  // 模拟任务数据（后续从API获取）
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      date: formatDate(new Date()),
      title: "完成项目报告",
      titleEn: "Finish project report",
      completed: false,
      time: "09:00"
    },
    {
      id: "2",
      date: formatDate(new Date()),
      title: "团队会议",
      titleEn: "Team meeting",
      completed: true,
      time: "14:00"
    },
    {
      id: "3",
      date: formatDate(new Date()),
      title: "代码审查",
      titleEn: "Code review",
      completed: false,
      time: "16:30"
    },
    {
      id: "4",
      date: formatDate(getDateWithOffset(5)),
      title: "客户演示",
      titleEn: "Client demo",
      completed: false,
      time: "10:00"
    },
    {
      id: "5",
      date: formatDate(getDateWithOffset(5)),
      title: "更新文档",
      titleEn: "Update documentation",
      completed: false,
    },
    {
      id: "6",
      date: formatDate(getDateWithOffset(12)),
      title: "月度总结",
      titleEn: "Monthly summary",
      completed: false,
    },
    {
      id: "7",
      date: formatDate(getDateWithOffset(20)),
      title: "产品发布",
      titleEn: "Product release",
      completed: false,
      time: "15:00"
    },
    {
      id: "8",
      date: formatDate(getDateWithOffset(25)),
      title: "季度规划",
      titleEn: "Quarterly planning",
      completed: false,
    },
  ]);

  // 格式化日期为 YYYY-MM-DD
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 获取偏移日期
  function getDateWithOffset(dayOffset: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset - date.getDate() + dayOffset);
    return date;
  }

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

  // 检查是否是选中日期
  const isSelected = (day: number | null) => {
    if (!day || !selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  // 获取指定日期的任务数量
  const getTaskCount = (day: number | null) => {
    if (!day) return 0;
    const dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    return tasks.filter(task => task.date === dateStr).length;
  };

  // 点击日期
  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  // 切换任务完成状态
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // 获取选中日期的任务
  const getSelectedDateTasks = () => {
    if (!selectedDate) return [];
    const dateStr = formatDate(selectedDate);
    return tasks.filter(task => task.date === dateStr);
  };

  // 格式化显示日期
  const formatDisplayDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (formatDate(date) === formatDate(today)) {
      return t("今天", "Today");
    } else if (formatDate(date) === formatDate(tomorrow)) {
      return t("明天", "Tomorrow");
    } else if (formatDate(date) === formatDate(yesterday)) {
      return t("昨天", "Yesterday");
    } else {
      return t(
        `${date.getMonth() + 1}月${date.getDate()}日`,
        `${monthNames[date.getMonth()]} ${date.getDate()}`
      );
    }
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
  const selectedDateTasks = getSelectedDateTasks();

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
            {weekDaysZh.map((day, index) => (
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
                    onClick={() => handleDateClick(day)}
                    data-testid={`calendar-day-${day}`}
                    className={cn(
                      "w-full h-full rounded-lg flex flex-col items-center justify-center",
                      "text-sm font-medium transition-colors relative",
                      "hover-elevate active-elevate-2",
                      isToday(day) && "bg-primary text-primary-foreground",
                      isSelected(day) && !isToday(day) && "bg-accent text-accent-foreground",
                      !isToday(day) && !isSelected(day) && "text-foreground"
                    )}
                  >
                    <span>{day}</span>
                    {getTaskCount(day) > 0 && (
                      <div className={cn(
                        "w-1 h-1 rounded-full mt-1",
                        isToday(day) ? "bg-primary-foreground" : "bg-primary"
                      )} />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 选中日期的任务列表 */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {formatDisplayDate(selectedDate)}
                {selectedDateTasks.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({selectedDateTasks.filter(t => t.completed).length}/{selectedDateTasks.length} {t("已完成", "completed")})
                  </span>
                )}
              </CardTitle>
              {isToday(selectedDate.getDate()) && (
                <Badge variant="default">{t("今日", "Today")}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedDateTasks.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                {t("该日期暂无任务", "No tasks for this date")}
              </div>
            ) : (
              selectedDateTasks.map((task) => (
                <div
                  key={task.id}
                  data-testid={`task-${task.id}`}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors",
                    "bg-muted/50 hover-elevate"
                  )}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    data-testid={`checkbox-task-${task.id}`}
                    className="h-5 w-5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm",
                      task.completed && "line-through text-muted-foreground"
                    )}>
                      {t(task.title, task.titleEn)}
                    </p>
                  </div>
                  {task.time && (
                    <Badge variant="secondary" className="shrink-0">
                      {task.time}
                    </Badge>
                  )}
                  {task.completed && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
