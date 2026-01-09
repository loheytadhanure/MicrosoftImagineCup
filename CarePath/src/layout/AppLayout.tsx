import { cn } from "@/lib/utils";
import { Home, FileText, TrendingUp, PlusCircle } from "lucide-react";
import { Header } from "./Header";

type TabKey = 'today' | 'log' | 'reports' | 'trends';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  userName?: string;
}

export function AppLayout({ children, activeTab, onTabChange }: AppLayoutProps) {
  const tabs = [
    { key: 'today' as TabKey, label: 'Today', icon: Home },
    { key: 'log' as TabKey, label: 'Log', icon: PlusCircle },
    { key: 'reports' as TabKey, label: 'Reports', icon: FileText },
    { key: 'trends' as TabKey, label: 'Trends', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Auth */}
      <Header />

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


