import React from "react";

export default function ProjectEntry({ project, onClick }) {
  return (
    <div onClick={onClick}>
      {project.title}
      <></>
    </div>
  );
}
