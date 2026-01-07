import { cn } from "@/lib/utils";
import { Home, Activity, FileText, TrendingUp, PlusCircle, User } from "lucide-react";

type TabKey = 'today' | 'log' | 'reports' | 'trends';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  userName?: string;
}

export function AppLayout({ children, activeTab, onTabChange, userName = "Loheyta" }: AppLayoutProps) {
  const tabs = [
    { key: 'today' as TabKey, label: 'Today', icon: Home },
    { key: 'log' as TabKey, label: 'Log', icon: PlusCircle },
    { key: 'reports' as TabKey, label: 'Reports', icon: FileText },
    { key: 'trends' as TabKey, label: 'Trends', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-care-divider">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              CarePath
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {userName}</span>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-care-divider z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onTabChange(key)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-200",
                  activeTab === key
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-transform",
                  activeTab === key && "scale-110"
                )} />
                <span className="text-xs font-medium">{label}</span>
                {activeTab === key && (
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse-soft" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}


