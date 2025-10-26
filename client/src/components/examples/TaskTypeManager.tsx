import { useState } from 'react';
import { TaskTypeManager } from '../TaskTypeManager';

const initialTypes = [
  { value: "work", label: "工作 Work", labelEn: "Work" },
  { value: "personal", label: "个人 Personal", labelEn: "Personal" },
  { value: "health", label: "健康 Health", labelEn: "Health" },
];

export default function TaskTypeManagerExample() {
  const [taskTypes, setTaskTypes] = useState(initialTypes);

  return (
    <TaskTypeManager 
      taskTypes={taskTypes} 
      onTaskTypesChange={setTaskTypes} 
    />
  );
}
