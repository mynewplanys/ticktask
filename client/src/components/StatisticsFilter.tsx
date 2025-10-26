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
import { zhCN, enUS } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";
import { taskTypeLabels, statusLabels } from "@/lib/translations";

const taskTypesList = ["all", "work", "personal", "health", "learning", "other"];
const statusList = ["all", "completed", "missed", "pending"];

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
  const { t, language } = useLanguage();

  const dateLocale = language === "zh" ? zhCN : enUS;

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
          <Label>{t("开始日期", "Start Date")}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                data-testid="button-start-date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP", { locale: dateLocale }) : t("选择日期", "Select date")}
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
          <Label>{t("结束日期", "End Date")}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                data-testid="button-end-date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP", { locale: dateLocale }) : t("选择日期", "Select date")}
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
          <Label htmlFor="taskType">{t("任务类型", "Task Type")}</Label>
          <Select value={taskType} onValueChange={setTaskType}>
            <SelectTrigger id="taskType" data-testid="select-filter-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {taskTypesList.map((type) => (
                <SelectItem key={type} value={type}>
                  {taskTypeLabels[language][type as keyof typeof taskTypeLabels.zh]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px] space-y-2">
          <Label htmlFor="status">{t("完成状态", "Status")}</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status" data-testid="select-filter-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusList.map((type) => (
                <SelectItem key={type} value={type}>
                  {statusLabels[language][type as keyof typeof statusLabels.zh]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[150px] space-y-2">
          <Label htmlFor="timeGroup">{t("统计粒度", "Group By")}</Label>
          <Select value={timeGroup} onValueChange={setTimeGroup}>
            <SelectTrigger id="timeGroup" data-testid="select-time-group">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">{t("按日", "Day")}</SelectItem>
              <SelectItem value="month">{t("按月", "Month")}</SelectItem>
              <SelectItem value="year">{t("按年", "Year")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleApply} data-testid="button-apply-filter">
          <Filter className="mr-2 h-4 w-4" />
          {t("查看结果", "Apply")}
        </Button>
      </div>
    </div>
  );
}
