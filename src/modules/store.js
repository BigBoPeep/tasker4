import { signal, computed, effect } from "@preact/signals-react";
import { STORE_KEY, DEFAULT_SETTINGS } from "../config";
import { Task, Project, Workspace } from "./data";

function load(store, classType = null) {
  try {
    const saved =
      JSON.parse(localStorage.getItem(STORE_KEY + ":" + store)) ??
      (store === "settings" ? { ...DEFAULT_SETTINGS } : {});
    if (!classType) return saved;
    const classes = { workspace: Workspace, project: Project, task: Task };
    const Cls = classes[classType];
    return Object.fromEntries(
      Object.values(saved).map((item) => [item.id, new Cls(item)]),
    );
  } catch {
    return store === "settings" ? { ...DEFAULT_SETTINGS } : {};
  }
}

export const workspaces = signal(load("workspaces", "workspace"));
export const projects = signal(load("projects", "project"));
export const tasks = signal(load("tasks", "task"));
export const settings = signal(load("settings"));

export const activeWorkspaceID = signal(null);
export const activeProjectID = signal(null);
export const modalState = signal(null);
export const modalVisible = signal(false);
export const sidebarOpen = signal(false);
export const toasts = signal([]);

effect(() => {
  localStorage.setItem(
    STORE_KEY + ":" + "workspaces",
    JSON.stringify(workspaces.value),
  );
});
effect(() => {
  localStorage.setItem(
    STORE_KEY + ":" + "projects",
    JSON.stringify(projects.value),
  );
});
effect(() => {
  localStorage.setItem(STORE_KEY + ":" + "tasks", JSON.stringify(tasks.value));
});
effect(() => {
  localStorage.setItem(
    STORE_KEY + ":" + "settings",
    JSON.stringify(settings.value),
  );
});

export const activeProjects = computed(() =>
  Object.values(projects.value).filter(
    (p) => p.workspaceID === activeWorkspaceID.value,
  ),
);

export const activeTasks = computed(() =>
  Object.values(tasks.value).filter(
    (t) => t.projectID === activeProjectID.value,
  ),
);

export const projectsByWorkspace = computed(() => {
  const grouped = Object.fromEntries(
    Object.keys(workspaces.value).map((id) => [id, []]),
  );
  for (const proj of Object.values(projects.value)) {
    grouped[proj.workspaceID]?.push(proj);
  }
  return grouped;
});

export const tasksByProject = computed(() => {
  const grouped = Object.fromEntries(
    Object.keys(projects.value).map((id) => [id, []]),
  );
  for (const task of Object.values(tasks.value)) {
    grouped[task.projectID]?.push(task);
  }
  return grouped;
});

export function addTask(title, desc, deadline, completed, projectID) {
  const newTask = new Task({ title, desc, deadline, completed, projectID });
  tasks.value = {
    ...tasks.value,
    [newTask.id]: newTask,
  };
}

export function updateTask(id, patch) {
  tasks.value = {
    ...tasks.value,
    [id]: new Task({ ...tasks.value[id], ...patch }),
  };
}

export function deleteTask(id) {
  const tsks = { ...tasks.value };
  delete tsks[id];
  tasks.value = tsks;
}

export function addProject(title, desc, deadline, completed, workspaceID) {
  const newProj = new Project({
    title,
    desc,
    deadline,
    completed,
    workspaceID,
  });
  projects.value = {
    ...projects.value,
    [newProj.id]: newProj,
  };
}

export function updateProject(id, patch) {
  projects.value = {
    ...projects.value,
    [id]: new Project({ ...projects.value[id], ...patch }),
  };
}

export function deleteProject(id) {
  if (id === activeProjectID.value) activeProjectID.value = null;
  const projs = { ...projects.value };
  delete projs[id];
  tasksByProject.value[id].forEach((taskID) => deleteTask(taskID));
  projects.value = projs;
}

export function addWorkspace(title) {
  const newWS = new Workspace({ title });
  workspaces.value = {
    ...workspaces.value,
    [newWS.id]: newWS,
  };
}

export function updateWorkspace(id, title) {
  workspaces.value = {
    ...workspaces.value,
    [id]: new Workspace({ ...workspaces.value[id], title }),
  };
}

export function deleteWorkspace(id) {
  const wses = { ...workspaces.value };
  delete wses[id];
  projectsByWorkspace.value[id].forEach((projID) => deleteProject(projID));
  workspaces.value = wses;
}

export function updateSettings(patch) {
  settings.value = {
    ...settings.value,
    ...patch,
  };
}

export function openModal(type, data = null) {
  modalState.value = { type, data };
  requestAnimationFrame(() => {
    modalVisible.value = true;
  });
}

export function closeModal() {
  modalVisible.value = false;
  setTimeout(() => {
    modalState.value = null;
  }, 500);
}

export function addToast(message, type = "info", duration = 3000) {
  const id = crypto.randomUUID();
  toasts.value = [...toasts.value, { id, message, type, visible: false }];
  requestAnimationFrame(() => {
    toasts.value = toasts.value.map((t) =>
      t.id === id ? { ...t, visible: true } : t,
    );
  });
  setTimeout(() => removeToast(id), duration);
}

export function removeToast(id) {
  toasts.value = toasts.value.map((t) =>
    t.id === id ? { ...t, visible: false } : t,
  );
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 300);
}
