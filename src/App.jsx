import Sidebar from "./components/Sidebar";
import WorkspaceList from "./components/WorkspaceList";
import { addWorkspace } from "./modules/store";

function App() {
  return (
    <>
      <div className="bg-slate-500 h-dvh w-dvw flex flex-col overflow-hidden">
        <div className="flex grow">
          <Sidebar className={"p-2 shrink-0"}>
            <img src="/logo.webp" alt="Tasker Logo" className="w-40 md:w-64" />
            <p>Sidebar Stuff</p>
            <WorkspaceList />
          </Sidebar>
          Content
          <button
            onClick={() => {
              addWorkspace("Test Workspace #2");
            }}
          >
            Default
          </button>
        </div>
        <footer>Copyright © 2026 Lane Robey</footer>
      </div>
    </>
  );
}

export default App;
