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
  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <Card>
      <CardHeader>
        <CardTitle>今日任务预览 Today's Preview</CardTitle>
        <CardDescription>
          {pendingTasks.length} 个待完成，{completedTasks.length} 个已完成
          <br />
          {pendingTasks.length} pending, {completedTasks.length} completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingTasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">待完成 Pending</h4>
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover-elevate"
                data-testid={`preview-pending-${task.id}`}
              >
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-sm">{task.title}</span>
                    <Badge variant="outline" className={`text-xs ${typeColors[task.type]}`}>
                      {typeLabels[task.type]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="font-mono">计划时间 {task.scheduledTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">已完成 Completed</h4>
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card opacity-75"
                data-testid={`preview-completed-${task.id}`}
              >
                <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-sm line-through text-muted-foreground">
                      {task.title}
                    </span>
                    <Badge variant="outline" className={`text-xs ${typeColors[task.type]}`}>
                      {typeLabels[task.type]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-mono">计划 {task.scheduledTime}</span>
                    </div>
                    {task.completedAt && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span className="font-mono">完成 {task.completedAt}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
