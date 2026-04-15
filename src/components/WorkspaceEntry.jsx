import React from "react";

export default function WorkspaceEntry({ title }) {
  return (
    <details>
      <summary>{title}</summary>
    </details>
  );
}
