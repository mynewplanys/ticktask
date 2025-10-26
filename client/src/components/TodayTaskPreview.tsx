import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Circle } from "lucide-react";

export type TaskPreview = {
  id: string;
  title: string;
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

const typeLabels: Record<string, string> = {
  work: "工作",
  personal: "个人",
  health: "健康",
  learning: "学习",
  other: "其他",
};

export function TodayTaskPreview({ tasks }: TodayTaskPreviewProps) {
  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  // 按照完成时间或计划时间排序
  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = a.completed && a.completedAt ? a.completedAt : a.scheduledTime;
    const timeB = b.completed && b.completedAt ? b.completedAt : b.scheduledTime;
    return timeA.localeCompare(timeB);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>今日任务预览 Today's Preview</CardTitle>
        <CardDescription>
          {pendingCount} 个待完成，{completedCount} 个已完成
          <br />
          {pendingCount} pending, {completedCount} completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
              task.completed
                ? "bg-chart-2/5 border-chart-2/20"
                : "bg-card hover-elevate"
            }`}
            data-testid={`preview-task-${task.id}`}
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
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
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {task.completed && task.completedAt ? (
                  <>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-chart-2" />
                      <span className="font-mono text-chart-2">完成 {task.completedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-mono">计划 {task.scheduledTime}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="font-mono">计划 {task.scheduledTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">今天暂无任务</p>
            <p className="text-xs">No tasks for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
