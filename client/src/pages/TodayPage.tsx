import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Circle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export type TaskPreview = {
  id: string;
  title: string;
  type: string;
  scheduledTime: string;
  completed: boolean;
  completedAt?: string;
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

export default function TodayPage() {
  const [tasks, setTasks] = useState<TaskPreview[]>(mockTasks);
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

  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = a.completed && a.completedAt ? a.completedAt : a.scheduledTime;
    const timeB = b.completed && b.completedAt ? b.completedAt : b.scheduledTime;
    return timeA.localeCompare(timeB);
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{t("今日任务", "Today's Tasks")}</h1>
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
    </div>
  );
}
