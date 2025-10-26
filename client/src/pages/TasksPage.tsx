import { useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList, type Task } from "@/components/TaskList";
import { TodayTaskPreview, type TaskPreview } from "@/components/TodayTaskPreview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "晨间锻炼 Morning Exercise",
      type: "health",
      frequency: "daily",
      scheduledTime: "07:00",
      completed: true,
    },
    {
      id: "2",
      title: "团队会议 Team Meeting",
      type: "work",
      frequency: "weekly",
      scheduledTime: "10:00",
      completed: false,
    },
    {
      id: "3",
      title: "学习新技术 Learn New Tech",
      type: "learning",
      frequency: "daily",
      scheduledTime: "20:00",
      completed: false,
    },
    {
      id: "4",
      title: "午餐冥想 Lunch Meditation",
      type: "health",
      frequency: "daily",
      scheduledTime: "12:30",
      completed: true,
    },
  ]);

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const todayPreviewTasks: TaskPreview[] = tasks.map(task => ({
    id: task.id,
    title: task.title,
    type: task.type,
    scheduledTime: task.scheduledTime,
    completed: task.completed,
    completedAt: task.completed ? "07:15" : undefined,
  }));

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">任务计划 Task Planning</h1>
        <p className="text-muted-foreground">
          创建和管理您的重复任务，按时完成计划 Create and manage your recurring tasks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TaskForm />

          <Card>
            <CardHeader>
              <CardTitle>今日任务 Today's Tasks</CardTitle>
              <CardDescription>
                完成今天的任务以保持进度 Complete today's tasks to stay on track
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tasks.length > 0 ? (
                <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>暂无任务 No tasks yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <TodayTaskPreview tasks={todayPreviewTasks} />
        </div>
      </div>
    </div>
  );
}
