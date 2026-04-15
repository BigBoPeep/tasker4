import React from "react";
import { workspaces } from "../modules/store";
import WorkspaceEntry from "./WorkspaceEntry";

export default function WorkspaceList() {
  return (
    <div>
      {Object.values(workspaces.value).map((ws) => {
        return <WorkspaceEntry title={ws.title} />;
      })}
    </div>
  );
}
