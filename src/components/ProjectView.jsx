import { useSignals } from "@preact/signals-react/runtime";
import { format, formatDistanceToNow } from "date-fns";
import {
  activeProjectID,
  projects,
  tasksByProject,
  settings,
} from "../modules/store";
import { BadgeInfo, BadgeCheck, BadgeAlert } from "lucide-react";
import Tooltip from "./Tooltip";
import TaskList from "./TaskList";

export default function ProjectView() {
  useSignals();
  const project = projects.value[activeProjectID.value];
  const badge = project?.overdue ? (
    <Tooltip content={`Overdue by ${formatDistanceToNow(project.deadline)}`}>
      <div className="flex justify-center items-center p-0.5 rounded-full bg-(--color-overdue)/60">
        <BadgeAlert />
      </div>
    </Tooltip>
  ) : project?.completed === false ? (
    <Tooltip content={"In Progress..."}>
      <BadgeInfo />
    </Tooltip>
  ) : (
    <Tooltip
      content={`Completed on ${format(
        project?.completed || new Date(),
        settings.value.dateFormatCompleted,
      )}`}
    >
      <BadgeCheck />
    </Tooltip>
  );

  return (
    <div className="w-full h-full p-1">
      <div className="w-full">
        <div className="flex justify-between items-center">
          {project?.title}
          {badge}
        </div>
        <div>
          {"Due: "}
          <span>
            {format(
              project?.deadline || new Date(),
              settings.value.dateFormatDue,
            )}
          </span>
        </div>
        <div className="leading-tight h-15">{project?.desc}</div>
        <div>
          {"Created: "}
          <span>
            {format(
              project?.created || new Date(),
              settings.value.dateFormatCreated,
            )}
          </span>
        </div>
      </div>
      <TaskList />
    </div>
  );
}
