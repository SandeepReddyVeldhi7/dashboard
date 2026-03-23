import CalendarSidebar from "./ChatSidebar";


const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen overflow-hidden w-full">
            <CalendarSidebar />

            <main className="flex-1 min-w-0 bg-app-bg ">{children}</main>
        </div>
    );
};

export default ChatLayout;
