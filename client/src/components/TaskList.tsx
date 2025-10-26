import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

export type Task = {
  id: string;
  title: string;
  type: string;
  frequency: string;
  scheduledTime: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onToggleComplete?: (taskId: string) => void;
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

const frequencyLabels: Record<string, string> = {
  daily: "每日",
  weekly: "每周",
  monthly: "每月",
  yearly: "每年",
};

export function TaskList({ tasks, onToggleComplete }: TaskListProps) {
  const [localTasks, setLocalTasks] = useState(tasks);

  const handleToggle = (taskId: string) => {
    if (onToggleComplete) {
      onToggleComplete(taskId);
    } else {
      setLocalTasks(prev =>
        prev.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
      console.log(`Task ${taskId} toggled`);
    }
  };

  return (
    <div className="space-y-2">
      {localTasks.map((task) => (
        <Card
          key={task.id}
          className={`p-4 hover-elevate transition-all ${
            task.completed ? "opacity-60" : ""
          }`}
          data-testid={`card-task-${task.id}`}
        >
          <div className="flex items-start gap-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => handleToggle(task.id)}
              className="mt-1"
              data-testid={`checkbox-task-${task.id}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3
                  className={`font-medium ${
                    task.completed ? "line-through text-muted-foreground" : ""
                  }`}
                  data-testid={`text-task-title-${task.id}`}
                >
                  {task.title}
                </h3>
                <Badge variant="outline" className={typeColors[task.type]}>
                  {typeLabels[task.type]}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {frequencyLabels[task.frequency]}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="font-mono">{task.scheduledTime}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
