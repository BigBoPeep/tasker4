import Sidebar from "./components/Sidebar";
import WorkspaceList from "./components/WorkspaceList";
import ModalRouter from "./components/ModalRouter";
import ToastList from "./components/ToastList";
import { addWorkspace, sidebarOpen } from "./modules/store";
import { Cog } from "lucide-react";

function App() {
  return (
    <>
      <ModalRouter />
      <ToastList />
      <div className="bg-(--color-pri) h-dvh w-dvw flex flex-col overflow-hidden">
        <div className="flex grow overflow-hidden">
          <Sidebar
            className={"p-2 pt-4 shrink-0 h-full gap-4"}
            open={sidebarOpen}
          >
            <button>
              <Cog />
              Settings
            </button>
            <WorkspaceList />
          </Sidebar>
          Content
        </div>
        <footer>Copyright © 2026 Lane Robey</footer>
      </div>
    </>
  );
}

export default App;
