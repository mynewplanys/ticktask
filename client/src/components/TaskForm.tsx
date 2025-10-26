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

const taskTypes = [
  { value: "work", label: "工作 Work" },
  { value: "personal", label: "个人 Personal" },
  { value: "health", label: "健康 Health" },
  { value: "learning", label: "学习 Learning" },
  { value: "other", label: "其他 Other" },
];

const frequencies = [
  { value: "daily", label: "每日 Daily", description: "每天重复" },
  { value: "weekly", label: "每周 Weekly", description: "每周重复" },
  { value: "monthly", label: "每月 Monthly", description: "每月重复" },
  { value: "yearly", label: "每年 Yearly", description: "每年重复" },
];

export function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [reminderHours, setReminderHours] = useState("9");
  const [reminderMinutes, setReminderMinutes] = useState("0");
  const [advanceMinutes, setAdvanceMinutes] = useState("30");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Task submitted:", {
      title,
      description,
      taskType,
      frequency,
      reminderTime: `${reminderHours}:${reminderMinutes}`,
      advanceMinutes,
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
            <Label htmlFor="taskType">任务类型 Task Type *</Label>
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

          <div className="space-y-3">
            <Label>提醒时间 Reminder Time</Label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="hours" className="text-xs text-muted-foreground">小时 Hour</Label>
                <Select value={reminderHours} onValueChange={setReminderHours}>
                  <SelectTrigger id="hours" data-testid="select-reminder-hours">
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
                <Label htmlFor="minutes" className="text-xs text-muted-foreground">分钟 Minute</Label>
                <Select value={reminderMinutes} onValueChange={setReminderMinutes}>
                  <SelectTrigger id="minutes" data-testid="select-reminder-minutes">
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

          <div className="space-y-2">
            <Label htmlFor="advance">提前通知 Advance Notice (minutes)</Label>
            <Input
              id="advance"
              type="number"
              min="0"
              value={advanceMinutes}
              onChange={(e) => setAdvanceMinutes(e.target.value)}
              data-testid="input-advance-minutes"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTitle("");
                setDescription("");
                setTaskType("");
                setFrequency("daily");
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
