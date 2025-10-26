import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Clock, CheckCircle2, Circle, XCircle, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export type TaskPreview = {
  id: string;
  title: string;
  type: string;
  scheduledTime: string;
  completed: boolean;
  completedAt?: string;
};

export type HistoricalTaskPreview = TaskPreview & {
  date: string; // YYYY-MM-DD format
};

const typeColors: Record<string, string> = {
  work: "bg-primary/10 text-primary border-primary/20",
  personal: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  health: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  learning: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  other: "bg-muted text-muted-foreground border-muted",
};

const typeLabelsZh: Record<string, string> = {
  work: "工作",
  personal: "个人",
  health: "健康",
  learning: "学习",
  other: "其他",
};

const typeLabelsEn: Record<string, string> = {
  work: "Work",
  personal: "Personal",
  health: "Health",
  learning: "Learning",
  other: "Other",
};

const isTaskMissed = (task: TaskPreview): boolean => {
  if (task.completed) return false;
  
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  return task.scheduledTime < currentTime;
};

const mockTasks: TaskPreview[] = [
  {
    id: "1",
    title: "晨间锻炼",
    type: "health",
    scheduledTime: "07:00",
    completed: true,
    completedAt: "07:15",
  },
  {
    id: "2",
    title: "查看邮件",
    type: "work",
    scheduledTime: "09:00",
    completed: true,
    completedAt: "09:05",
  },
  {
    id: "3",
    title: "团队会议",
    type: "work",
    scheduledTime: "10:30",
    completed: false,
  },
  {
    id: "4",
    title: "午餐",
    type: "personal",
    scheduledTime: "12:00",
    completed: false,
  },
  {
    id: "5",
    title: "项目开发",
    type: "work",
    scheduledTime: "14:00",
    completed: false,
  },
];

// Mock historical tasks for different dates
const mockHistoricalTasks: HistoricalTaskPreview[] = [
  {
    id: "h1",
    date: "2025-10-25",
    title: "晨间锻炼",
    type: "health",
    scheduledTime: "07:00",
    completed: true,
    completedAt: "07:20",
  },
  {
    id: "h2",
    date: "2025-10-25",
    title: "查看邮件",
    type: "work",
    scheduledTime: "09:00",
    completed: false,
  },
  {
    id: "h3",
    date: "2025-10-24",
    title: "晨间锻炼",
    type: "health",
    scheduledTime: "07:00",
    completed: true,
    completedAt: "07:10",
  },
  {
    id: "h4",
    date: "2025-10-24",
    title: "团队会议",
    type: "work",
    scheduledTime: "10:00",
    completed: true,
    completedAt: "10:05",
  },
];

export default function TodayPage() {
  const [tasks, setTasks] = useState<TaskPreview[]>(mockTasks);
  const [historicalTasks, setHistoricalTasks] = useState<HistoricalTaskPreview[]>(mockHistoricalTasks);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  const typeLabels = language === "zh" ? typeLabelsZh : typeLabelsEn;
  
  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const handleToggleComplete = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          const now = new Date();
          const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          
          if (newCompleted) {
            toast({
              title: t("任务已完成", "Task Completed"),
              description: `${task.title} - ${currentTime}`,
            });
          } else {
            toast({
              title: t("取消完成", "Uncompleted"),
              description: task.title,
              variant: "destructive",
            });
          }
          
          return {
            ...task,
            completed: newCompleted,
            completedAt: newCompleted ? currentTime : undefined,
          };
        }
        return task;
      })
    );
  };

  const handleToggleHistoricalComplete = (taskId: string) => {
    setHistoricalTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          const now = new Date();
          const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          
          if (newCompleted) {
            toast({
              title: t("任务已完成", "Task Completed"),
              description: `${task.title} - ${currentTime}`,
            });
          } else {
            toast({
              title: t("取消完成", "Uncompleted"),
              description: task.title,
              variant: "destructive",
            });
          }
          
          return {
            ...task,
            completed: newCompleted,
            completedAt: newCompleted ? currentTime : undefined,
          };
        }
        return task;
      })
    );
  };

  const getTasksForDate = (date: Date): HistoricalTaskPreview[] => {
    const dateStr = format(date, "yyyy-MM-dd");
    return historicalTasks.filter(task => task.date === dateStr);
  };

  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = a.completed && a.completedAt ? a.completedAt : a.scheduledTime;
    const timeB = b.completed && b.completedAt ? b.completedAt : b.scheduledTime;
    return timeA.localeCompare(timeB);
  });

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">{t("今日任务", "Today's Tasks")}</h1>
        <p className="text-muted-foreground">
          {t(
            `${pendingCount} 个待完成，${completedCount} 个已完成`,
            `${pendingCount} pending, ${completedCount} completed`
          )}
        </p>
      </div>

      <div className="space-y-2">
        {sortedTasks.map((task) => {
          const isMissed = isTaskMissed(task);
          
          return (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                task.completed
                  ? "bg-chart-2/5 border-chart-2/20"
                  : isMissed
                  ? "bg-destructive/5 border-destructive/20"
                  : "bg-card hover-elevate"
              }`}
              data-testid={`today-task-${task.id}`}
            >
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleToggleComplete(task.id)}
                className="flex-shrink-0 h-8 w-8"
                data-testid={`button-toggle-${task.id}`}
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-chart-2" />
                ) : isMissed ? (
                  <XCircle className="h-5 w-5 text-destructive" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className={`font-medium text-sm ${
                      task.completed ? "text-chart-2" : isMissed ? "text-destructive" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                  <Badge variant="outline" className={`text-xs ${typeColors[task.type]}`}>
                    {typeLabels[task.type]}
                  </Badge>
                  {task.completed && (
                    <Badge className="text-xs bg-chart-2 text-white border-0">
                      {t("完成", "Completed")}
                    </Badge>
                  )}
                  {!task.completed && isMissed && (
                    <Badge className="text-xs bg-destructive text-white border-0">
                      {t("错过", "Missed")}
                    </Badge>
                  )}
                  {!task.completed && !isMissed && (
                    <Badge className="text-xs bg-primary text-white border-0">
                      {t("待完成", "Pending")}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {task.completed && task.completedAt ? (
                    <>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-mono">{t("计划", "Scheduled")} {task.scheduledTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-chart-2" />
                        <span className="font-mono text-chart-2">{t("完成", "Completed")} {task.completedAt}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-mono">{t("计划", "Scheduled")} {task.scheduledTime}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                size="sm"
                variant={task.completed ? "outline" : "default"}
                onClick={() => handleToggleComplete(task.id)}
                className="flex-shrink-0"
                data-testid={`button-complete-${task.id}`}
              >
                {task.completed ? t("取消完成", "Undo") : t("点击完成", "Complete")}
              </Button>
            </div>
          );
        })}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">{t("今天暂无任务", "No tasks for today")}</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2" data-testid="button-history-backlog">
              <History className="h-4 w-4" />
              {t("补登记", "Backlog Entry")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("历史任务补登记", "Historical Task Backlog")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  {t("选择日期查看和修改任务完成情况", "Select a date to view and modify task completion")}
                </p>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={language === "zh" ? zhCN : undefined}
                  className="rounded-md border"
                  disabled={(date) => date > new Date()}
                  data-testid="calendar-historical"
                />
              </div>

              {selectedDate && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {format(selectedDate, language === "zh" ? "yyyy年MM月dd日" : "MMMM d, yyyy", {
                        locale: language === "zh" ? zhCN : undefined,
                      })}
                    </h3>
                    <Badge variant="outline">
                      {t(
                        `${selectedDateTasks.length} 个任务`,
                        `${selectedDateTasks.length} tasks`
                      )}
                    </Badge>
                  </div>

                  {selectedDateTasks.length > 0 ? (
                    <div className="space-y-2">
                      {selectedDateTasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            task.completed
                              ? "bg-chart-2/5 border-chart-2/20"
                              : "bg-card"
                          }`}
                          data-testid={`historical-task-${task.id}`}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleToggleHistoricalComplete(task.id)}
                            className="flex-shrink-0 h-8 w-8"
                            data-testid={`button-toggle-historical-${task.id}`}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-chart-2" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                          </Button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span
                                className={`font-medium text-sm ${
                                  task.completed ? "text-chart-2" : ""
                                }`}
                              >
                                {task.title}
                              </span>
                              <Badge variant="outline" className={`text-xs ${typeColors[task.type]}`}>
                                {typeLabels[task.type]}
                              </Badge>
                              {task.completed && (
                                <Badge className="text-xs bg-chart-2 text-white border-0">
                                  {t("完成", "Completed")}
                                </Badge>
                              )}
                              {!task.completed && (
                                <Badge className="text-xs bg-muted text-muted-foreground border-0">
                                  {t("未完成", "Incomplete")}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              {task.completed && task.completedAt ? (
                                <>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span className="font-mono">{t("计划", "Scheduled")} {task.scheduledTime}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-chart-2" />
                                    <span className="font-mono text-chart-2">{t("完成", "Completed")} {task.completedAt}</span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span className="font-mono">{t("计划", "Scheduled")} {task.scheduledTime}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={task.completed ? "outline" : "default"}
                            onClick={() => handleToggleHistoricalComplete(task.id)}
                            className="flex-shrink-0"
                            data-testid={`button-complete-historical-${task.id}`}
                          >
                            {task.completed ? t("取消完成", "Undo") : t("标记完成", "Mark Done")}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">{t("该日期暂无任务", "No tasks for this date")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
