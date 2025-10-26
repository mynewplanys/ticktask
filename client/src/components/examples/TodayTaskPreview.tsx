import { TodayTaskPreview } from '../TodayTaskPreview'

const mockTasks = [
  {
    id: "1",
    title: "晨间锻炼 Morning Exercise",
    type: "health",
    scheduledTime: "07:00",
    completed: true,
    completedAt: "07:15",
  },
  {
    id: "2",
    title: "团队会议 Team Meeting",
    type: "work",
    scheduledTime: "10:00",
    completed: false,
  },
  {
    id: "3",
    title: "学习新技术 Learn New Tech",
    type: "learning",
    scheduledTime: "20:00",
    completed: false,
  },
  {
    id: "4",
    title: "午餐冥想 Lunch Meditation",
    type: "health",
    scheduledTime: "12:30",
    completed: true,
    completedAt: "12:35",
  },
];

export default function TodayTaskPreviewExample() {
  return <TodayTaskPreview tasks={mockTasks} />
}
