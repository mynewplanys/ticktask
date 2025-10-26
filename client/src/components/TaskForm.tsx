import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskTypeManager, type TaskType } from "@/components/TaskTypeManager";

const defaultTaskTypes: TaskType[] = [
  { value: "work", label: "工作 Work", labelEn: "Work" },
  { value: "personal", label: "个人 Personal", labelEn: "Personal" },
  { value: "health", label: "健康 Health", labelEn: "Health" },
  { value: "learning", label: "学习 Learning", labelEn: "Learning" },
  { value: "other", label: "其他 Other", labelEn: "Other" },
];

const frequencies = [
  { value: "daily", label: "每日 Daily", description: "每天重复" },
  { value: "weekly", label: "每周 Weekly", description: "每周重复" },
  { value: "monthly", label: "每月 Monthly", description: "每月重复" },
  { value: "yearly", label: "每年 Yearly", description: "每年重复" },
];

const reminderTypes = [
  { value: "fixed", label: "固定时间提醒", description: "在设定的时间提醒" },
  { value: "overdue", label: "错过后提醒", description: "错过完成时间后提醒" },
];

export function TaskForm() {
  const [taskTypes, setTaskTypes] = useState<TaskType[]>(defaultTaskTypes);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [completionHours, setCompletionHours] = useState("18");
  const [completionMinutes, setCompletionMinutes] = useState("0");
  const [reminderType, setReminderType] = useState("fixed");
  const [reminderHours, setReminderHours] = useState("9");
  const [reminderMinutes, setReminderMinutes] = useState("0");
  const [overdueMinutes, setOverdueMinutes] = useState("10");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Task submitted:", {
      title,
      description,
      taskType,
      frequency,
      completionTime: `${completionHours}:${completionMinutes}`,
      reminderType,
      reminderTime: reminderType === "fixed" ? `${reminderHours}:${reminderMinutes}` : null,
      overdueMinutes: reminderType === "overdue" ? overdueMinutes : null,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>创建新任务 Create New Task</CardTitle>
        <CardDescription>设置任务详情和提醒时间 Set task details and reminder time</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">任务标题 Title *</Label>
            <Input
              id="title"
              placeholder="输入任务标题 Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              data-testid="input-task-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">任务描述 Description</Label>
            <Textarea
              id="description"
              placeholder="输入任务描述（可选）Enter task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 resize-y"
              data-testid="input-task-description"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="taskType">任务类型 Task Type *</Label>
              <TaskTypeManager 
                taskTypes={taskTypes} 
                onTaskTypesChange={setTaskTypes} 
              />
            </div>
            <Select value={taskType} onValueChange={setTaskType} required>
              <SelectTrigger id="taskType" data-testid="select-task-type">
                <SelectValue placeholder="选择任务类型 Select task type" />
              </SelectTrigger>
              <SelectContent>
                {taskTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>重复频率 Frequency *</Label>
            <RadioGroup value={frequency} onValueChange={setFrequency}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {frequencies.map((freq) => (
                  <div key={freq.value}>
                    <RadioGroupItem
                      value={freq.value}
                      id={freq.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={freq.value}
                      className="flex flex-col gap-1 rounded-lg border-2 border-muted bg-card p-4 hover-elevate cursor-pointer peer-data-[state=checked]:border-primary"
                      data-testid={`radio-frequency-${freq.value}`}
                    >
                      <span className="font-medium">{freq.label}</span>
                      <span className="text-xs text-muted-foreground">{freq.description}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {frequency === "daily" && (
            <div className="space-y-3">
              <Label>应完成时间 Target Completion Time</Label>
              <p className="text-sm text-muted-foreground">
                当天应在此时间完成任务 Task should be completed by this time today
              </p>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="completion-hours" className="text-xs text-muted-foreground">小时 Hour</Label>
                  <Select value={completionHours} onValueChange={setCompletionHours}>
                    <SelectTrigger id="completion-hours" data-testid="select-completion-hours">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={String(i).padStart(2, "0")}>
                          {String(i).padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end pb-2">:</div>
                <div className="flex-1">
                  <Label htmlFor="completion-minutes" className="text-xs text-muted-foreground">分钟 Minute</Label>
                  <Select value={completionMinutes} onValueChange={setCompletionMinutes}>
                    <SelectTrigger id="completion-minutes" data-testid="select-completion-minutes">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((min) => (
                        <SelectItem key={min} value={String(min).padStart(2, "0")}>
                          {String(min).padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label>提醒方式 Reminder Type</Label>
            <RadioGroup value={reminderType} onValueChange={setReminderType}>
              <div className="space-y-3">
                {reminderTypes.map((type) => (
                  <div key={type.value}>
                    <RadioGroupItem
                      value={type.value}
                      id={type.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={type.value}
                      className="flex flex-col gap-1 rounded-lg border-2 border-muted bg-card p-4 hover-elevate cursor-pointer peer-data-[state=checked]:border-primary"
                      data-testid={`radio-reminder-type-${type.value}`}
                    >
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">{type.description}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {reminderType === "fixed" && (
            <div className="space-y-3">
              <Label>固定提醒时间 Fixed Reminder Time</Label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="reminder-hours" className="text-xs text-muted-foreground">小时 Hour</Label>
                  <Select value={reminderHours} onValueChange={setReminderHours}>
                    <SelectTrigger id="reminder-hours" data-testid="select-reminder-hours">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={String(i).padStart(2, "0")}>
                          {String(i).padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end pb-2">:</div>
                <div className="flex-1">
                  <Label htmlFor="reminder-minutes" className="text-xs text-muted-foreground">分钟 Minute</Label>
                  <Select value={reminderMinutes} onValueChange={setReminderMinutes}>
                    <SelectTrigger id="reminder-minutes" data-testid="select-reminder-minutes">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((min) => (
                        <SelectItem key={min} value={String(min).padStart(2, "0")}>
                          {String(min).padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {reminderType === "overdue" && (
            <div className="space-y-2">
              <Label htmlFor="overdue-minutes">错过后提醒延迟 Overdue Reminder Delay (分钟 minutes)</Label>
              <Input
                id="overdue-minutes"
                type="number"
                min="1"
                max="1440"
                value={overdueMinutes}
                onChange={(e) => setOverdueMinutes(e.target.value)}
                placeholder="输入延迟分钟数"
                data-testid="input-overdue-minutes"
              />
              <p className="text-xs text-muted-foreground">
                错过完成时间后 {overdueMinutes} 分钟提醒 · Remind {overdueMinutes} minutes after missing the deadline
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTitle("");
                setDescription("");
                setTaskType("");
                setFrequency("daily");
                setReminderType("fixed");
                console.log("Form reset");
              }}
              data-testid="button-reset"
            >
              重置 Reset
            </Button>
            <Button type="submit" data-testid="button-submit">
              创建任务 Create Task
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
