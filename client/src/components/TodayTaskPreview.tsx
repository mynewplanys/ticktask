import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Circle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

// 检查任务是否错过（简化版：未完成的任务如果计划时间已过就算错过）
const isTaskMissed = (task: TaskPreview): boolean => {
  if (task.completed) return false;
  
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  return task.scheduledTime < currentTime;
};

export function TodayTaskPreview({ tasks: initialTasks }: TodayTaskPreviewProps) {
  const [tasks, setTasks] = useState<TaskPreview[]>(initialTasks);
  const { toast } = useToast();
  
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
              title: "任务已完成 Task Completed",
              description: `${task.title} - ${currentTime}`,
            });
          } else {
            toast({
              title: "取消完成 Uncompleted",
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
              data-testid={`preview-task-${task.id}`}
            >
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleToggleComplete(task.id)}
                className="flex-shrink-0 h-8 w-8"
                data-testid={`button-toggle-preview-${task.id}`}
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
                      完成 Completed
                    </Badge>
                  )}
                  {!task.completed && isMissed && (
                    <Badge className="text-xs bg-destructive text-white border-0">
                      错过 Missed
                    </Badge>
                  )}
                  {!task.completed && !isMissed && (
                    <Badge className="text-xs bg-primary text-white border-0">
                      待完成 Pending
                    </Badge>
                  )}
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
          );
        })}

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
