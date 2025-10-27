import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { taskTypeLabels } from "@/lib/translations";

export type TaskPreview = {
  id: string;
  title: string;
  titleEn: string;
  type: string;
  scheduledTime: string;
  completed: boolean;
  completedAt?: string;
};

type TodayTaskPreviewProps = {
  tasks: TaskPreview[];
};

const typeColors: Record<string, string> = {
  work: "bg-primary/10 text-primary border-primary/20",
  personal: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  health: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  learning: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  other: "bg-muted text-muted-foreground border-muted",
};

export function TodayTaskPreview({ tasks }: TodayTaskPreviewProps) {
  const { t, language } = useLanguage();
  
  // 按照计划时间排序
  const sortedTasks = [...tasks].sort((a, b) => {
    return a.scheduledTime.localeCompare(b.scheduledTime);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("今日任务预览", "Today's Preview")}</CardTitle>
        <CardDescription>
          {t(`${tasks.length} 个任务`, `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {sortedTasks.map((task) => {
          return (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card"
              data-testid={`preview-task-${task.id}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-medium text-sm">
                    {t(task.title, task.titleEn)}
                  </span>
                  <Badge variant="outline" className={`text-xs ${typeColors[task.type]}`}>
                    {taskTypeLabels[language][task.type as keyof typeof taskTypeLabels.zh]}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="font-mono">{t("计划", "Scheduled")} {task.scheduledTime}</span>
                </div>
              </div>
            </div>
          );
        })}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">{t("今天暂无任务", "No tasks for today")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
