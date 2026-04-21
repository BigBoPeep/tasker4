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
import CompletionBadge from "./CompletionBadge";

export default function ProjectView() {
  useSignals();
  const project = projects.value[activeProjectID.value];

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <div className="w-full border-b p-2 border-(--color-text)/20 bg-(--color-sec)">
        <div className="flex justify-between items-center text-2 font-semibold">
          {project?.title}
          <CompletionBadge item={project} />
        </div>
        <div className="font-semibold">
          <span className="italic font-normal">{"Due: "}</span>
          {format(
            project?.deadline || new Date(),
            settings.value.dateFormatDue,
          )}
        </div>
        <div className="leading-tight h-15">{project?.desc}</div>
        <div className="italic text--1">
          <span className="text--1">{"Created: "}</span>
          {format(
            project?.created || new Date(),
            settings.value.dateFormatCreated,
          )}
        </div>
      </div>

      <TaskList className={"p-2"} projectID={activeProjectID.value} />
    </div>
  );
}
