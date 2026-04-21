import { deleteProject, openModal } from "../modules/store";
import CompletionBadge from "./CompletionBadge";
import { Trash2 } from "lucide-react";

export default function ProjectEntry({ project, onClick }) {
  return (
    <div
      className="cursor-pointer hover:bg-(--color-overlay-1) w-full p-2
        rounded-md text-center group/pe relative"
      onClick={onClick}
    >
      {project.title}
      <div
        className="absolute origin-bottom scale-y-0 group-hover/pe:scale-y-100 
          flex w-full px-2 justify-between inset-0 h-fit my-auto 
          transition-transform duration-300 ease-bounce"
      >
        {project.overdue && <CompletionBadge item={project} />}
        <button
          className="opacity-50 hover:opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            openModal("confirm", {
              title: "Delete Project",
              action: () => deleteProject(project.id),
            });
          }}
        >
          <Trash2 className="size-5" />
        </button>
      </div>
    </div>
  );
}
