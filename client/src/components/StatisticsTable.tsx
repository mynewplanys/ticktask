import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { taskTypeLabels, statusLabels } from "@/lib/translations";

export type StatisticsRecord = {
  id: string;
  date: Date;
  taskTitle: string;
  taskType: string;
  status: "completed" | "missed" | "pending";
  completedAt?: string;
};

type StatisticsTableProps = {
  records: StatisticsRecord[];
};

const typeColors: Record<string, string> = {
  work: "bg-primary/10 text-primary border-primary/20",
  personal: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  health: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  learning: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  other: "bg-muted text-muted-foreground border-muted",
};

export function StatisticsTable({ records }: StatisticsTableProps) {
  const { t, language } = useLanguage();
  
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-muted-foreground mb-2">
          <svg
            className="h-24 w-24 mx-auto mb-4 opacity-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-1">{t("暂无数据", "No data")}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          {t("没有可用数据。请尝试调整筛选设置。", "No data available. Try adjusting your filter settings.")}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">{t("日期", "Date")}</TableHead>
            <TableHead className="font-semibold">{t("任务名称", "Task")}</TableHead>
            <TableHead className="font-semibold">{t("类型", "Type")}</TableHead>
            <TableHead className="text-center font-semibold">{t("状态", "Status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id} className="hover-elevate" data-testid={`row-stat-${record.id}`}>
              <TableCell className="font-mono text-sm" data-testid={`text-date-${record.id}`}>
                <div className="flex flex-col">
                  <span>{format(record.date, "yyyy-MM-dd")}</span>
                  {record.completedAt && (
                    <span className="text-xs text-chart-2 mt-1">
                      {t("完成", "Completed")} {record.completedAt}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium" data-testid={`text-task-${record.id}`}>
                {record.taskTitle}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={typeColors[record.taskType]}>
                  {taskTypeLabels[language][record.taskType as keyof typeof taskTypeLabels.zh]}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {record.status === "completed" && (
                  <span
                    className="text-lg font-bold text-chart-2"
                    data-testid={`status-completed-${record.id}`}
                  >
                    Y
                  </span>
                )}
                {record.status === "missed" && (
                  <span
                    className="text-lg font-bold text-destructive"
                    data-testid={`status-missed-${record.id}`}
                  >
                    X
                  </span>
                )}
                {record.status === "pending" && (
                  <span
                    className="text-sm text-muted-foreground"
                    data-testid={`status-pending-${record.id}`}
                  >
                    -
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
