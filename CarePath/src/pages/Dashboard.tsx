import { useState } from "react";
import { AppLayout } from "@/layout/AppLayout";
import { TodayTimeline } from "@/components/timeline/TodayTimeline";
import { VitalsOverview } from "@/components/vitals/VitalsOverview";
import { VitalsInputForm } from "@/components/vitals/VitalsInputForm";
import { SymptomLogForm } from "@/components/vitals/SymptomLogForm";
import { MealLogForm } from "@/components/routines/MealLogForm";
import { MedicalReportsPanel } from "@/components/reports/MedicalReportsPanel";
import { ReportCard } from "@/components/reports/ReportCard";
import { ReportAssistant } from "@/components/reports/ReportAssistant";
import { TrendsPanel } from "@/components/vitals/TrendsPanel";
import { todayTasks, recentVitals, medicalReports, vitalTrends, userProfile } from "@/data/mockData";
import type { DailyTask, TaskStatus } from "@/types";
import { Calendar, Sun } from "lucide-react";
import { toast } from "sonner";

type TabKey = 'today' | 'log' | 'reports' | 'trends';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('today');
  const [tasks, setTasks] = useState<DailyTask[]>(todayTasks);

  const handleTaskStatusChange = (taskId: string, status: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
    toast.success(status === 'done' ? 'Great job! Task completed.' : 'Task marked as missed.');
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab} userName={userProfile.name.split(' ')[0]}>
      {/* Today View */}
      {activeTab === 'today' && (
        <div className="space-y-6 animate-fade-in">
          {/* Greeting */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate()}</span>
            </div>
            <h2 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
              {getGreeting()}, {userProfile.name.split(' ')[0]}
              <Sun className="w-6 h-6 text-warning" />
            </h2>
            <p className="text-muted-foreground mt-1">
              {pendingTasks.length > 0 
                ? `You have ${pendingTasks.length} task${pendingTasks.length > 1 ? 's' : ''} remaining today`
                : "All tasks completed! Great job!"
              }
            </p>
          </div>

          {/* Recent Vitals */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">Your Vitals</h3>
            <VitalsOverview vitals={recentVitals} />
          </section>

          {/* Today's Schedule */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">Today's Care Tasks</h3>
            <TodayTimeline tasks={tasks} onTaskStatusChange={handleTaskStatusChange} />
          </section>
        </div>
      )}

      {/* Log View */}
      {activeTab === 'log' && (
        <div className="space-y-6 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-semibold text-foreground">Log Data</h2>
            <p className="text-muted-foreground mt-1">Record your vitals, symptoms, and meals</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <VitalsInputForm onSubmit={() => toast.success('Vitals recorded successfully!')} />
            <SymptomLogForm onSubmit={() => toast.success('Symptom logged successfully!')} />
            <MealLogForm onSubmit={() => toast.success('Meal logged successfully!')} />
          </div>
        </div>
      )}

      {/* Reports View */}
      {activeTab === 'reports' && (
        <div className="space-y-6 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-semibold text-foreground">Medical Reports</h2>
            <p className="text-muted-foreground mt-1">Upload and understand your test results</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <MedicalReportsPanel onUpload={() => toast.success('Report uploaded! Processing...')} />
              
              {/* Recent Reports */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
                {medicalReports.map(report => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </div>

            <div>
              <ReportAssistant className="lg:sticky lg:top-24" />
            </div>
          </div>
        </div>
      )}

      {/* Trends View */}
      {activeTab === 'trends' && (
        <div className="space-y-6 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-semibold text-foreground">Health Trends</h2>
            <p className="text-muted-foreground mt-1">See how your health metrics change over time</p>
          </div>

          <TrendsPanel trends={vitalTrends} />
        </div>
      )}
    </AppLayout>
  );
}


