import { TaskList } from '../TaskList'

const mockTasks = [
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
];

export default function TaskListExample() {
  return <TaskList tasks={mockTasks} />
}
