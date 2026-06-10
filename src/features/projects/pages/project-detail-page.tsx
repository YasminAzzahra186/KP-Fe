import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn, formatDateIndonesian } from "@/lib/utils";

import { useProjectDetail } from '../hooks/useProjectDetail';
import { SprintModal } from '../components/sprint-modal';
import { TaskModal } from '../components/task-modal';
import { KanbanBoard } from '../components/kanban-board';
import { ProjectStatsGrid } from '../components/project-stats-grid';
import { SprintsList } from '../components/sprints-list';
import { ColumnModal } from '../components/column-modal';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = Number(id);

  const {
    project, projectSprints, tasks, setTasks,
    activeTab, setActiveTab,
    selectedSprintId, setSelectedSprintId,
    onDragEnd,
    isTaskModalOpen, setIsTaskModalOpen, editingTask, taskFormData,
    handleTaskInputChange, openAddTaskModal, openEditTaskModal, handleSaveTask, handleDeleteTask,
    isModalOpen, setIsModalOpen, formData, handleInputChange, handleAddSprint,
    columns, isColumnModalOpen, setIsColumnModalOpen, handleAddColumn, handleDeleteColumn,
    totalTasks, completedTasks, inProgressTasks, activeSprint, projectProgress,
    today,
  } = useProjectDetail(projectId);

  // If project not found, show error and back button
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-xl font-semibold">Project not found</h2>
        <Button onClick={() => navigate('/admin/projects')} className="gap-2 cursor-pointer">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-3">
      {/* Header & Back Button */}
      <div className="flex flex-col gap-4 border-b pb-6 mb-6">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/projects')} 
            className="gap-2 -ml-2 mb-2 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{project.title}</h1>
              <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                {project.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm max-w-2xl">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground sm:self-start bg-muted/40 p-3 rounded-lg border border-border/50">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              <span><strong>{project.memberCount}</strong> Members</span>
            </div>
            {project.startDate && (
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <span>Start Date: <strong>{formatDateIndonesian(project.startDate)}</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <ProjectStatsGrid
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        activeSprint={activeSprint}
      />

      {/* Progress Section */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-sm">Overall Completion Progress</h3>
              <p className="text-xs text-muted-foreground">Calculated across all tasks and sprints</p>
            </div>
            <span className="text-lg font-bold text-primary">{projectProgress}%</span>
          </div>
          <Progress value={projectProgress} className="h-2.5" />
        </CardContent>
      </Card>

      {/* Tab Switcher */}
      <div className="flex border-b border-border/80 pb-px gap-6 mb-6">
        {(['sprints', 'kanban'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-3 text-sm font-semibold border-b-2 px-1 transition-all cursor-pointer outline-none",
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab === 'sprints' ? `Daftar Sprint (${projectSprints.length})` : 'Kanban Board'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'sprints' ? (
        <SprintsList
          projectId={projectId}
          projectSprints={projectSprints}
          tasks={tasks}
          onAddSprint={() => setIsModalOpen(true)}
        />
      ) : (
        <KanbanBoard
          selectedSprintId={selectedSprintId}
          projectSprints={projectSprints}
          tasks={tasks}
          setTasks={setTasks}
          setSelectedSprintId={setSelectedSprintId}
          openAddTaskModal={openAddTaskModal}
          openEditTaskModal={openEditTaskModal}
          handleDeleteTask={handleDeleteTask}
          onDragEnd={onDragEnd}
          columns={columns}
          onAddColumn={() => setIsColumnModalOpen(true)}
          onDeleteColumn={handleDeleteColumn}
        />
      )}

      {/* Modals */}
      <SprintModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleAddSprint}
        today={today}
      />
      <TaskModal
        isOpen={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
        editingTask={editingTask}
        taskFormData={taskFormData}
        onInputChange={handleTaskInputChange}
        onSave={handleSaveTask}
        today={today}
        columns={columns}
      />
      <ColumnModal
        isOpen={isColumnModalOpen}
        onOpenChange={setIsColumnModalOpen}
        onSave={handleAddColumn}
      />
    </div>
  );
}
