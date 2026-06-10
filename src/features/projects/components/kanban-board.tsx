import { Calendar as CalendarIcon, User, Plus, Edit, Trash2, MoreVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, formatDateIndonesian } from "@/lib/utils";
import type { Sprint, Task, KanbanColumn } from '../types';

interface KanbanBoardProps {
  selectedSprintId: number | null;
  projectSprints: Sprint[];
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setSelectedSprintId: (id: number | null) => void;
  openAddTaskModal: (status: string) => void;
  openEditTaskModal: (task: Task) => void;
  handleDeleteTask: (taskId: number) => void;
  onDragEnd: (result: DropResult) => void;
  columns: KanbanColumn[];
  onAddColumn: () => void;
  onDeleteColumn: (columnId: string) => void;
}

export function KanbanBoard({
  selectedSprintId,
  projectSprints,
  tasks,
  setTasks,
  setSelectedSprintId,
  openAddTaskModal,
  openEditTaskModal,
  handleDeleteTask,
  onDragEnd,
  columns,
  onAddColumn,
  onDeleteColumn
}: KanbanBoardProps) {
  
  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="capitalize text-[10px] px-1.5 py-0">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-white capitalize text-[10px] px-1.5 py-0 border-0">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" className="capitalize text-[10px] px-1.5 py-0">Low</Badge>;
      default:
        return null;
    }
  };

  const colorMap: Record<KanbanColumn['color'], { bg: string; border: string; text: string }> = {
    gray: { bg: 'bg-muted/30', border: 'border-border/50', text: 'text-muted-foreground' },
    amber: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-600 dark:text-amber-500' },
    blue: { bg: 'bg-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-600 dark:text-blue-500' },
    green: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-500' },
    purple: { bg: 'bg-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-600 dark:text-purple-500' },
    rose: { bg: 'bg-rose-500/5', border: 'border-rose-500/20', text: 'text-rose-600 dark:text-rose-500' }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/40 p-4 rounded-lg border border-border/60">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground">Pilih Sprint:</span>
          <Select 
            value={selectedSprintId ? String(selectedSprintId) : ""} 
            onValueChange={(val) => setSelectedSprintId(Number(val))}
          >
            <SelectTrigger className="w-[240px] bg-background">
              <SelectValue placeholder="Pilih Sprint" />
            </SelectTrigger>
            <SelectContent>
              {projectSprints.map(s => (
                <SelectItem key={s.id} value={String(s.id)}>{s.name} ({s.status})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedSprintId && (
          <div className="flex items-center gap-2">
            <Button onClick={onAddColumn} variant="outline" className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" /> Tambah Status
            </Button>
            <Button onClick={() => openAddTaskModal(columns[0]?.id || 'todo')} className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" /> Tambah Task
            </Button>
          </div>
        )}
      </div>

      {!selectedSprintId ? (
        <div className="text-center py-12 text-muted-foreground border border-dashed border-border/80 rounded-xl bg-card">
          Belum ada sprint di project ini. Silakan buat sprint terlebih dahulu.
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-4 overflow-x-auto pb-4 items-start scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent w-full"
              >
                {columns.map((status, index) => {
                  const colors = colorMap.gray;
                  const columnTasks = tasks.filter(t => t.sprintId === selectedSprintId && t.status === status.id);

                  return (
                    <Draggable key={status.id} draggableId={status.id} index={index}>
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          className={cn(
                            "flex flex-col rounded-xl p-4 min-h-[500px] w-[290px] shrink-0 border relative",
                            colors.bg,
                            colors.border,
                            dragSnapshot.isDragging && "shadow-xl border-primary/40 bg-muted/50"
                          )}
                        >
                          {/* Column Header */}
                          <div 
                            {...dragProvided.dragHandleProps}
                            className="flex justify-between items-center mb-3 cursor-grab active:cursor-grabbing select-none"
                          >
                            <div className="flex items-center gap-2">
                              <span className={cn("text-xs font-bold uppercase tracking-wider", colors.text)}>
                                {status.label}
                              </span>
                              <Badge variant="secondary" className="px-1.5 py-0 text-[10px] rounded-full">
                                {columnTasks.length}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openAddTaskModal(status.id)}
                                className="h-6 w-6 text-muted-foreground hover:text-foreground cursor-pointer"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                              <Popover>
                                <PopoverTrigger
                                  className="h-6 w-6 text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center rounded-md hover:bg-muted"
                                >
                                  <MoreVertical className="h-3.5 w-3.5" />
                                </PopoverTrigger>
                                <PopoverContent className="w-40 p-1" align="end">
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start text-xs text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer h-8"
                                    onClick={() => {
                                      if (columnTasks.length > 0) {
                                        alert(`Status "${status.label}" tidak dapat dihapus karena masih memiliki ${columnTasks.length} task.`);
                                      } else {
                                        onDeleteColumn(status.id);
                                      }
                                    }}
                                  >
                                    Hapus Status
                                  </Button>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>

                          <div className="text-[10px] text-muted-foreground/80 mb-4 pb-2 border-b border-border/30">
                            {status.id === 'todo' ? 'Belum Dikerjakan' : status.id === 'in_progress' ? 'Sedang Dikerjakan' : status.id === 'review' ? 'Mentesting' : status.id === 'completed' ? 'Selesai' : status.label}
                          </div>

                          {/* Column Content */}
                          <Droppable droppableId={status.id} type="task">
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex-1 flex flex-col gap-3"
                              >
                                {columnTasks.length === 0 ? (
                                  <div className="flex flex-col items-center justify-center py-8 text-center text-xs text-muted-foreground/60 border border-dashed border-border/30 rounded-lg h-24">
                                    Tarik task ke sini
                                  </div>
                                ) : (
                                  columnTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={cn(
                                            "bg-card border border-border/80 rounded-lg p-3 shadow-sm hover:shadow hover:border-primary/30 transition-all space-y-2.5 relative group",
                                            snapshot.isDragging && "shadow-lg border-primary/50 rotate-1 scale-102"
                                          )}
                                        >
                                          <div className="flex justify-between items-start gap-2">
                                            {getPriorityBadge(task.priority)}
                                            <Popover>
                                              <PopoverTrigger
                                                className="h-6 w-6 text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center rounded-md hover:bg-muted outline-none"
                                                onClick={(e) => e.stopPropagation()}
                                              >
                                                <MoreVertical className="h-3.5 w-3.5" />
                                              </PopoverTrigger>
                                              <PopoverContent className="w-48 p-2" align="end" onClick={(e) => e.stopPropagation()}>
                                                <div className="space-y-2 text-xs">
                                                  {/* Change status sub-section */}
                                                  <div className="space-y-1">
                                                    <span className="font-semibold text-muted-foreground block px-1 text-[10px] uppercase tracking-wider">Ganti Status</span>
                                                    <Select
                                                      value={task.status}
                                                      onValueChange={(val) => {
                                                        const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, status: val || '' } : t);
                                                        setTasks(updatedTasks);
                                                        localStorage.setItem('tracking_tasks', JSON.stringify(updatedTasks));
                                                      }}
                                                    >
                                                      <SelectTrigger className="h-8 text-xs w-full bg-background/50 cursor-pointer">
                                                        <SelectValue placeholder="Pilih status" />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                        {columns.map(col => (
                                                          <SelectItem key={col.id} value={col.id} className="text-xs">{col.label}</SelectItem>
                                                        ))}
                                                      </SelectContent>
                                                    </Select>
                                                  </div>
                                                  
                                                  <hr className="border-border/60 my-1" />
                                                  
                                                  {/* Edit Action */}
                                                  <Button
                                                    variant="ghost"
                                                    className="w-full justify-start text-xs h-8 gap-2 cursor-pointer"
                                                    onClick={() => openEditTaskModal(task)}
                                                  >
                                                    <Edit className="h-3.5 w-3.5" />
                                                    Edit Task
                                                  </Button>
                                                  
                                                  {/* Delete Action */}
                                                  <Button
                                                    variant="ghost"
                                                    className="w-full justify-start text-xs h-8 gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                  >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Hapus Task
                                                  </Button>
                                                </div>
                                              </PopoverContent>
                                            </Popover>
                                          </div>
                                          <h4 className="font-semibold text-sm line-clamp-2 text-foreground pr-4">{task.title}</h4>
                                          {task.description && (
                                            <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                                          )}
                                          <div className="pt-2 border-t border-border/30">
                                            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                                              <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                <span className="truncate max-w-[120px]">{task.assignee}</span>
                                              </div>
                                              {task.dueDate && (
                                                <div className="flex items-center gap-0.5">
                                                  <CalendarIcon className="h-3 w-3" />
                                                  <span>{formatDateIndonesian(task.dueDate)}</span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  ))
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}

                {/* Tambah Status Column Card */}
                <Draggable key="add-column" draggableId="add-column" index={columns.length} isDragDisabled={true}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className="flex flex-col items-center justify-center rounded-xl p-4 min-h-[500px] w-[290px] shrink-0 border border-dashed border-border/80 hover:border-primary/50 hover:bg-muted/10 transition-all cursor-pointer group text-muted-foreground hover:text-foreground bg-card/20 outline-none"
                      onClick={onAddColumn}
                    >
                      <Plus className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Tambah Status</span>
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
