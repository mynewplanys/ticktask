import { useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList, type Task } from "@/components/TaskList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "晨间锻炼 Morning Exercise",
      type: "health",
      frequency: "daily",
      scheduledTime: "07:00",
      completed: false,
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
  ]);

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">任务管理 Task Management</h1>
        <p className="text-muted-foreground">
          创建和管理您的重复任务，按时完成计划 Create and manage your recurring tasks
        </p>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList data-testid="tabs-task-management">
          <TabsTrigger value="create" data-testid="tab-create">
            创建任务 Create
          </TabsTrigger>
          <TabsTrigger value="today" data-testid="tab-today">
            今日任务 Today ({tasks.filter(t => !t.completed).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <TaskForm />
        </TabsContent>

        <TabsContent value="today">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
