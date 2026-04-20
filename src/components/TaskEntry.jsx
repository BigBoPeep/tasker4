import { format } from "date-fns";
import { settings } from "../modules/store";

export default function TaskEntry({ task }) {
  return (
    <div>
      <div>{task.title}</div>
      <div>
        {"Due: "}
        {format(task.deadline || new Date(), settings.value.dateFormatDue)}
      </div>
      <div>{task.desc}</div>
      <div>
        {"Created: "}
        {format(task.created || new Date(), settings.value.dateFormatCreated)}
      </div>
    </div>
  );
}
