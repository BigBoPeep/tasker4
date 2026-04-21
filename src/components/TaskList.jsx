import { tasksByProject, tasks } from "../modules/store";
import TaskControls from "./TaskControls";

export default function TaskList({ className }) {
  return (
    <div className={`${className}`}>
      <TaskControls />
    </div>
  );
}
