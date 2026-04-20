import { tasksByProject, tasks } from "../modules/store";
import TaskControls from "./TaskControls";

export default function TaskList() {
  return (
    <div>
      <TaskControls />
    </div>
  );
}
