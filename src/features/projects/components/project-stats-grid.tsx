import { ClipboardList, CheckCircle2, Play, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface ProjectStatsGridProps {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  activeSprint: string;
}

export function ProjectStatsGrid({ totalTasks, completedTasks, inProgressTasks, activeSprint }: ProjectStatsGridProps) {
  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: ClipboardList, color: 'blue' },
    { label: 'Completed Tasks', value: completedTasks, icon: CheckCircle2, color: 'emerald' },
    { label: 'In Progress', value: inProgressTasks, icon: Play, color: 'amber' },
    { label: 'Active Sprint', value: activeSprint, icon: CalendarIcon, color: 'purple', isText: true },
  ];

  const colorMap: Record<string, { bg: string; text: string; valueText: string }> = {
    blue:    { bg: 'bg-blue-500/10',    text: 'text-blue-500',    valueText: '' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', valueText: 'text-emerald-600 dark:text-emerald-500' },
    amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-500',   valueText: 'text-amber-600 dark:text-amber-500' },
    purple:  { bg: 'bg-purple-500/10',  text: 'text-purple-500',  valueText: '' },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const colors = colorMap[stat.color];
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="hover:shadow-sm transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className={`space-y-1 ${stat.isText ? 'max-w-[70%]' : ''}`}>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  {stat.isText ? (
                    <p className="text-lg font-bold truncate" title={String(stat.value)}>{stat.value}</p>
                  ) : (
                    <p className={`text-2xl font-bold ${colors.valueText}`}>{stat.value}</p>
                  )}
                </div>
                <div className={`p-2 ${colors.bg} ${colors.text} rounded-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
