import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDateIndonesian } from "@/lib/utils";
import type { Sprint, Task } from '../types';

interface SprintsListProps {
  projectId: number;
  projectSprints: Sprint[];
  tasks: Task[];
  onAddSprint: () => void;
}

export function SprintsList({ projectId, projectSprints, tasks, onAddSprint }: SprintsListProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg">Sprints List</CardTitle>
          <CardDescription className='hidden md:block'>Sprints breakdown and task completion progression for this project</CardDescription>
        </div>
        <Button onClick={onAddSprint} className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" /> Tambah Sprint
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {projectSprints.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm">
            No sprints planned or active for this project.
          </div>
        ) : (
          <div className="grid gap-3">
            {projectSprints.map((sprint) => {
              const sprintTasks = tasks.filter(t => t.sprintId === sprint.id);
              const totalSprintTasks = sprintTasks.length;
              const completedSprintTasks = sprintTasks.filter(t => t.status === 'completed').length;
              const sprintProgress = totalSprintTasks > 0 ? Math.round((completedSprintTasks / totalSprintTasks) * 100) : 0;

              return (
                <div
                  key={sprint.id}
                  onClick={() => navigate(`/admin/projects/${projectId}/sprints/${sprint.id}`)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-accent/40 transition-all cursor-pointer group"
                >
                  <div className="space-y-1 mb-3 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{sprint.name}</h4>
                      <Badge 
                        variant={
                          sprint.status === 'active' ? 'default' 
                            : sprint.status === 'completed' ? 'secondary' 
                            : 'outline'
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {sprint.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      {formatDateIndonesian(sprint.startDate)} - {formatDateIndonesian(sprint.endDate)}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 sm:w-1/3">
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span className="font-medium text-foreground">{completedSprintTasks}/{totalSprintTasks} Tasks ({sprintProgress}%)</span>
                      </div>
                      <Progress value={sprintProgress} className="h-1.5" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
