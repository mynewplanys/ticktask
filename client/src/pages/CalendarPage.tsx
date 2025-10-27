import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, Plus, Pencil, Trash2, CalendarDays, CalendarRange } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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

// 视图类型
type ViewMode = 'month' | 'week';

export default function CalendarPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  
  // 对话框状态
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // 表单数据
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  
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
    date.setDate(date.getDate() + dayOffset);
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

  // 切换周
  const changeWeek = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (offset * 7));
    setCurrentDate(newDate);
  };

  // 生成周视图日期数组
  const generateWeekDays = () => {
    const weekDays = [];
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day); // 调整到周日

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }

    return weekDays;
  };

  // 获取周视图的日期范围显示
  const getWeekRangeText = () => {
    const weekDays = generateWeekDays();
    const startDate = weekDays[0];
    const endDate = weekDays[6];
    
    if (language === 'zh') {
      return `${startDate.getMonth() + 1}月${startDate.getDate()}日 - ${endDate.getMonth() + 1}月${endDate.getDate()}日`;
    } else {
      return `${monthNames[startDate.getMonth()]} ${startDate.getDate()} - ${monthNames[endDate.getMonth()]} ${endDate.getDate()}`;
    }
  };

  // 检查是否是今天（支持number和Date）
  const isToday = (day: number | Date | null) => {
    if (!day) return false;
    const today = new Date();
    
    if (typeof day === 'number') {
      return (
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()
      );
    } else {
      return formatDate(day) === formatDate(today);
    }
  };

  // 检查是否是选中日期（支持number和Date）
  const isSelected = (day: number | Date | null) => {
    if (!day || !selectedDate) return false;
    
    if (typeof day === 'number') {
      return (
        day === selectedDate.getDate() &&
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear()
      );
    } else {
      return formatDate(day) === formatDate(selectedDate);
    }
  };

  // 获取指定日期的任务数量（支持number和Date）
  const getTaskCount = (day: number | Date | null) => {
    if (!day) return 0;
    let dateStr: string;
    
    if (typeof day === 'number') {
      dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    } else {
      dateStr = formatDate(day);
    }
    
    return tasks.filter(task => task.date === dateStr).length;
  };

  // 点击日期（支持number和Date）
  const handleDateClick = (day: number | Date) => {
    let newDate: Date;
    
    if (typeof day === 'number') {
      newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    } else {
      newDate = day;
    }
    
    setSelectedDate(newDate);
  };

  // 切换任务完成状态
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // 打开添加任务对话框
  const openAddDialog = () => {
    setTaskTitle("");
    setTaskTime("");
    setIsAddDialogOpen(true);
  };

  // 添加新任务
  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      toast({
        title: t("请输入任务标题", "Please enter task title"),
        variant: "destructive"
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: t("请选择日期", "Please select a date"),
        variant: "destructive"
      });
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      date: formatDate(selectedDate),
      title: taskTitle,
      titleEn: taskTitle, // 简化处理，实际应用中可能需要翻译
      completed: false,
      time: taskTime || undefined
    };

    setTasks([...tasks, newTask]);
    setIsAddDialogOpen(false);
    setTaskTitle("");
    setTaskTime("");

    toast({
      title: t("任务已添加", "Task added"),
      description: t(`已成功添加任务：${taskTitle}`, `Successfully added: ${taskTitle}`)
    });
  };

  // 打开编辑任务对话框
  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setTaskTitle(language === "zh" ? task.title : task.titleEn);
    setTaskTime(task.time || "");
    setIsEditDialogOpen(true);
  };

  // 更新任务
  const handleUpdateTask = () => {
    if (!taskTitle.trim()) {
      toast({
        title: t("请输入任务标题", "Please enter task title"),
        variant: "destructive"
      });
      return;
    }

    if (!editingTask) return;

    setTasks(tasks.map(task =>
      task.id === editingTask.id
        ? {
            ...task,
            title: language === "zh" ? taskTitle : task.title,
            titleEn: language === "en" ? taskTitle : task.titleEn,
            time: taskTime || undefined
          }
        : task
    ));

    setIsEditDialogOpen(false);
    setEditingTask(null);
    setTaskTitle("");
    setTaskTime("");

    toast({
      title: t("任务已更新", "Task updated"),
      description: t("任务信息已成功更新", "Task has been updated successfully")
    });
  };

  // 删除任务
  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    
    toast({
      title: t("任务已删除", "Task deleted"),
      description: t(`已删除任务：${taskTitle}`, `Deleted: ${taskTitle}`)
    });
  };

  // 获取选中日期的任务（按时间排序）
  const getSelectedDateTasks = () => {
    if (!selectedDate) return [];
    const dateStr = formatDate(selectedDate);
    const filteredTasks = tasks.filter(task => task.date === dateStr);
    
    // 按时间排序：有时间的任务在前，按时间升序；没有时间的任务在后
    return filteredTasks.sort((a, b) => {
      // 如果两个任务都有时间，按时间升序排列
      if (a.time && b.time) {
        return a.time.localeCompare(b.time);
      }
      // 有时间的任务排在没时间的任务前面
      if (a.time && !b.time) return -1;
      if (!a.time && b.time) return 1;
      // 两个都没时间，保持原顺序
      return 0;
    });
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
        <CardHeader className="pb-3 space-y-3">
          {/* 导航和标题 */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => viewMode === 'month' ? changeMonth(-1) : changeWeek(-1)}
              data-testid={viewMode === 'month' ? "button-prev-month" : "button-prev-week"}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <CardTitle className="text-lg">
              {viewMode === 'month' ? (
                t(
                  `${currentDate.getFullYear()}年 ${monthNamesZh[currentDate.getMonth()]}`,
                  `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                )
              ) : (
                getWeekRangeText()
              )}
            </CardTitle>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => viewMode === 'month' ? changeMonth(1) : changeWeek(1)}
              data-testid={viewMode === 'month' ? "button-next-month" : "button-next-week"}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* 视图切换按钮 */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
              data-testid="button-view-month"
              className="flex items-center gap-2"
            >
              <CalendarDays className="h-4 w-4" />
              {t("月", "Month")}
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
              data-testid="button-view-week"
              className="flex items-center gap-2"
            >
              <CalendarRange className="h-4 w-4" />
              {t("周", "Week")}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* 星期标题 - 周视图可点击，月视图静态 */}
          {viewMode === 'week' ? (
            <div className="grid grid-cols-7 gap-1 mb-2">
              {generateWeekDays().map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  data-testid={`week-header-${index}`}
                  className={cn(
                    "text-center text-xs font-medium py-2 rounded-md transition-colors",
                    "hover-elevate active-elevate-2",
                    isToday(date) ? "text-primary font-bold" : "text-muted-foreground",
                    isSelected(date) && "bg-accent"
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{t(weekDaysZh[date.getDay()], weekDaysEn[date.getDay()])}</span>
                    <span className={cn(
                      "text-base font-semibold",
                      isToday(date) && "text-primary"
                    )}>
                      {date.getDate()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
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
          )}

          {/* 月视图 */}
          {viewMode === 'month' && (
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
          )}

          {/* 周视图 */}
          {viewMode === 'week' && (
            <div className="space-y-2">
              {generateWeekDays().map((date, index) => {
                const dayTasks = tasks.filter(task => task.date === formatDate(date)).sort((a, b) => {
                  if (a.time && b.time) return a.time.localeCompare(b.time);
                  if (a.time && !b.time) return -1;
                  if (!a.time && b.time) return 1;
                  return 0;
                });

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    data-testid={`week-day-${formatDate(date)}`}
                    className={cn(
                      "w-full p-3 rounded-lg transition-colors text-left",
                      "hover-elevate active-elevate-2",
                      isToday(date) && "bg-primary/10 border border-primary",
                      isSelected(date) && !isToday(date) && "bg-accent",
                      !isToday(date) && !isSelected(date) && "bg-muted/30"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-xs font-medium",
                          isToday(date) ? "text-primary" : "text-muted-foreground"
                        )}>
                          {t(weekDaysZh[date.getDay()], weekDaysEn[date.getDay()])}
                        </span>
                        <span className={cn(
                          "text-lg font-semibold",
                          isToday(date) && "text-primary"
                        )}>
                          {date.getDate()}
                        </span>
                        {isToday(date) && (
                          <Badge variant="default" className="text-xs">
                            {t("今", "Today")}
                          </Badge>
                        )}
                      </div>
                      {dayTasks.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {dayTasks.length}
                        </Badge>
                      )}
                    </div>
                    
                    {dayTasks.length > 0 ? (
                      <div className="space-y-1">
                        {dayTasks.slice(0, 3).map(task => (
                          <div
                            key={task.id}
                            className={cn(
                              "text-xs truncate",
                              task.completed && "line-through text-muted-foreground"
                            )}
                          >
                            {task.time && (
                              <span className="text-muted-foreground mr-1">{task.time}</span>
                            )}
                            {t(task.title, task.titleEn)}
                          </div>
                        ))}
                        {dayTasks.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayTasks.length - 3} {t("更多", "more")}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        {t("无任务", "No tasks")}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 选中日期的任务列表 - 仅在月视图下显示 */}
      {selectedDate && viewMode === 'month' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
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
              <Button
                size="sm"
                onClick={openAddDialog}
                data-testid="button-add-task"
              >
                <Plus className="h-4 w-4 mr-1" />
                {t("添加", "Add")}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedDateTasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-4">
                  {t("该日期暂无任务", "No tasks for this date")}
                </p>
                <Button variant="outline" onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  {t("添加第一个任务", "Add first task")}
                </Button>
              </div>
            ) : (
              selectedDateTasks.map((task) => (
                <div
                  key={task.id}
                  data-testid={`task-${task.id}`}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors group",
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
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(task)}
                      data-testid={`button-edit-${task.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteTask(task.id, t(task.title, task.titleEn))}
                      data-testid={`button-delete-${task.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* 添加任务对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent data-testid="dialog-add-task">
          <DialogHeader>
            <DialogTitle>{t("添加新任务", "Add New Task")}</DialogTitle>
            <DialogDescription>
              {t("为选中的日期添加新任务", "Add a new task for the selected date")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">{t("任务标题", "Task Title")}</Label>
              <Input
                id="task-title"
                placeholder={t("输入任务标题...", "Enter task title...")}
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                data-testid="input-task-title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-time">{t("时间（可选）", "Time (Optional)")}</Label>
              <Input
                id="task-time"
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                data-testid="input-task-time"
              />
            </div>
            {selectedDate && (
              <div className="text-sm text-muted-foreground">
                {t("日期", "Date")}: {formatDisplayDate(selectedDate)}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t("取消", "Cancel")}
            </Button>
            <Button onClick={handleAddTask} data-testid="button-confirm-add">
              {t("添加", "Add")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑任务对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent data-testid="dialog-edit-task">
          <DialogHeader>
            <DialogTitle>{t("编辑任务", "Edit Task")}</DialogTitle>
            <DialogDescription>
              {t("修改任务信息", "Update task information")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-task-title">{t("任务标题", "Task Title")}</Label>
              <Input
                id="edit-task-title"
                placeholder={t("输入任务标题...", "Enter task title...")}
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                data-testid="input-edit-task-title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-task-time">{t("时间（可选）", "Time (Optional)")}</Label>
              <Input
                id="edit-task-time"
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                data-testid="input-edit-task-time"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t("取消", "Cancel")}
            </Button>
            <Button onClick={handleUpdateTask} data-testid="button-confirm-edit">
              {t("保存", "Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
