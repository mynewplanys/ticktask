import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Circle, XCircle } from "lucide-react";

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

const typeLabels: Record<string, string> = {
  work: "工作",
  personal: "个人",
  health: "健康",
  learning: "学习",
  other: "其他",
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
  const tasks = mockTasks;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = a.completed && a.completedAt ? a.completedAt : a.scheduledTime;
    const timeB = b.completed && b.completedAt ? b.completedAt : b.scheduledTime;
    return timeA.localeCompare(timeB);
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">今日任务 Today's Tasks</h1>
        <p className="text-muted-foreground">
          {pendingCount} 个待完成，{completedCount} 个已完成
          <br />
          {pendingCount} pending, {completedCount} completed
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
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-chart-2 flex-shrink-0" />
              ) : isMissed ? (
                <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
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
      </div>
    </div>
  );
}
