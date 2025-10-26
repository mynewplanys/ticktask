import { StatisticsTable } from '../StatisticsTable'

const mockRecords = [
  {
    id: "1",
    date: new Date("2025-10-26"),
    taskTitle: "晨间锻炼 Morning Exercise",
    taskType: "health",
    status: "completed" as const,
  },
  {
    id: "2",
    date: new Date("2025-10-26"),
    taskTitle: "团队会议 Team Meeting",
    taskType: "work",
    status: "completed" as const,
  },
  {
    id: "3",
    date: new Date("2025-10-25"),
    taskTitle: "学习新技术 Learn New Tech",
    taskType: "learning",
    status: "missed" as const,
  },
  {
    id: "4",
    date: new Date("2025-10-25"),
    taskTitle: "读书 Reading",
    taskType: "personal",
    status: "completed" as const,
  },
  {
    id: "5",
    date: new Date("2025-10-24"),
    taskTitle: "项目复盘 Project Review",
    taskType: "work",
    status: "missed" as const,
  },
];

export default function StatisticsTableExample() {
  return <StatisticsTable records={mockRecords} />
}
