import { ReactNode } from "react";
import { Header } from "./Header";
import { AssistantPanel } from "./AssistantPanel";

interface WorkspaceLayoutProps {
  children: ReactNode;
  workspace?: string;
}

export function WorkspaceLayout({ children, workspace }: WorkspaceLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <main className="flex-1 overflow-y-auto">{children}</main>
        <aside className="hidden w-[400px] lg:block">
          <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-[400px]">
            <AssistantPanel workspace={workspace} />
          </div>
        </aside>
      </div>
    </div>
  );
}
