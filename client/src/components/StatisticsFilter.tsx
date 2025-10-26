import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

const taskTypes = [
  { value: "all", label: "全部类型 All Types" },
  { value: "work", label: "工作 Work" },
  { value: "personal", label: "个人 Personal" },
  { value: "health", label: "健康 Health" },
  { value: "learning", label: "学习 Learning" },
  { value: "other", label: "其他 Other" },
];

const statusTypes = [
  { value: "all", label: "全部状态 All Status" },
  { value: "completed", label: "已完成 Completed" },
  { value: "missed", label: "已错过 Missed" },
  { value: "pending", label: "待完成 Pending" },
];

export type FilterState = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  taskType: string;
  status: string;
  timeGroup: string;
};

type StatisticsFilterProps = {
  onFilterChange?: (filters: FilterState) => void;
};

export function StatisticsFilter({ onFilterChange }: StatisticsFilterProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [taskType, setTaskType] = useState("all");
  const [status, setStatus] = useState("all");
  const [timeGroup, setTimeGroup] = useState("day");

  const handleApply = () => {
    const filters = { startDate, endDate, taskType, status, timeGroup };
    console.log("Filters applied:", filters);
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px] space-y-2">
          <Label>开始日期 Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                data-testid="button-start-date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP", { locale: zhCN }) : "选择日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1 min-w-[200px] space-y-2">
          <Label>结束日期 End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                data-testid="button-end-date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP", { locale: zhCN }) : "选择日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1 min-w-[200px] space-y-2">
          <Label htmlFor="taskType">任务类型 Task Type</Label>
          <Select value={taskType} onValueChange={setTaskType}>
            <SelectTrigger id="taskType" data-testid="select-filter-type">
              <SelectValue />
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

        <div className="flex-1 min-w-[200px] space-y-2">
          <Label htmlFor="status">完成状态 Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status" data-testid="select-filter-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px] space-y-2">
          <Label htmlFor="timeGroup">统计粒度 Group By</Label>
          <Select value={timeGroup} onValueChange={setTimeGroup}>
            <SelectTrigger id="timeGroup" data-testid="select-time-group">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">按日 Day</SelectItem>
              <SelectItem value="month">按月 Month</SelectItem>
              <SelectItem value="year">按年 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleApply} data-testid="button-apply-filter">
          <Filter className="mr-2 h-4 w-4" />
          应用筛选 Apply
        </Button>
      </div>
    </div>
  );
}
