import { useState } from "react";
import { StatisticsFilter, type FilterState } from "@/components/StatisticsFilter";
import { StatisticsTable, type StatisticsRecord } from "@/components/StatisticsTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const mockRecords: StatisticsRecord[] = [
  {
    id: "1",
    date: new Date("2025-10-26"),
    taskTitle: "晨间锻炼 Morning Exercise",
    taskType: "health",
    status: "completed",
    completedAt: "07:15",
  },
  {
    id: "2",
    date: new Date("2025-10-26"),
    taskTitle: "团队会议 Team Meeting",
    taskType: "work",
    status: "completed",
    completedAt: "10:45",
  },
  {
    id: "3",
    date: new Date("2025-10-25"),
    taskTitle: "学习新技术 Learn New Tech",
    taskType: "learning",
    status: "missed",
  },
  {
    id: "4",
    date: new Date("2025-10-25"),
    taskTitle: "读书 Reading",
    taskType: "personal",
    status: "completed",
    completedAt: "20:30",
  },
  {
    id: "5",
    date: new Date("2025-10-24"),
    taskTitle: "项目复盘 Project Review",
    taskType: "work",
    status: "missed",
  },
  {
    id: "6",
    date: new Date("2025-10-24"),
    taskTitle: "晨间锻炼 Morning Exercise",
    taskType: "health",
    status: "completed",
    completedAt: "07:20",
  },
  {
    id: "7",
    date: new Date("2025-10-23"),
    taskTitle: "团队会议 Team Meeting",
    taskType: "work",
    status: "completed",
    completedAt: "10:30",
  },
  {
    id: "8",
    date: new Date("2025-10-23"),
    taskTitle: "学习新技术 Learn New Tech",
    taskType: "learning",
    status: "completed",
    completedAt: "19:00",
  },
];

export default function StatisticsPage() {
  const [records] = useState<StatisticsRecord[]>(mockRecords);
  const [filters, setFilters] = useState<FilterState | null>(null);
  const { t } = useLanguage();

  const filteredRecords = records.filter((record) => {
    if (!filters) return true;

    // Filter by date range
    if (filters.startDate && record.date < filters.startDate) return false;
    if (filters.endDate && record.date > filters.endDate) return false;

    // Filter by task type
    if (filters.taskType !== "all" && record.taskType !== filters.taskType) return false;

    // Filter by status
    if (filters.status !== "all" && record.status !== filters.status) return false;

    return true;
  });

  const completedCount = filteredRecords.filter((r) => r.status === "completed").length;
  const missedCount = filteredRecords.filter((r) => r.status === "missed").length;
  const totalCount = filteredRecords.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col h-full">
      <StatisticsFilter onFilterChange={handleFilterChange} />

      <div className="flex-1 overflow-auto">
        <div className="w-full p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold mb-2">{t("统计分析", "Statistics")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("查看任务完成情况和趋势分析", "View task completion status and trends")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("总任务", "Total")}</CardDescription>
                <CardTitle className="text-3xl" data-testid="text-total-tasks">
                  {totalCount}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("已完成", "Completed")}</CardDescription>
                <CardTitle className="text-3xl text-chart-2" data-testid="text-completed-tasks">
                  {completedCount}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("已错过", "Missed")}</CardDescription>
                <CardTitle className="text-3xl text-destructive" data-testid="text-missed-tasks">
                  {missedCount}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{t("完成率", "Rate")}</CardDescription>
                <CardTitle className="text-3xl" data-testid="text-completion-rate">
                  {completionRate}%
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <StatisticsTable records={filteredRecords} />
        </div>
      </div>
    </div>
  );
}
