import { format } from "date-fns";
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Task, KanbanColumn } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingTask: Task | null;
  taskFormData: {
    title: string;
    description: string;
    assignee: string;
    priority: Task['priority'];
    status: Task['status'];
    labels: string;
    dueDate: string;
    estHours: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
  today: Date;
  columns: KanbanColumn[];
}

export function TaskModal({
  isOpen,
  onOpenChange,
  editingTask,
  taskFormData,
  onInputChange,
  onSave,
  today,
  columns
}: TaskModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editingTask ? 'Edit Task' : 'Tambah Task Baru'}</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk menyimpan detail task ke sprint terpilih.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          {/* Title / Task Name */}
          <div className="space-y-1">
            <Label htmlFor="task-title">Task Name</Label>
            <Input
              id="task-title"
              value={taskFormData.title}
              onChange={(e) => onInputChange('title', e.target.value)}
              placeholder="Masukkan nama task"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="task-description">Deskripsi</Label>
            <Textarea
              id="task-description"
              value={taskFormData.description}
              onChange={(e) => onInputChange('description', e.target.value)}
              placeholder="Masukkan deskripsi task"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Assignee */}
            <div className="space-y-1">
              <Label htmlFor="task-assignee">Assignee</Label>
              <Input
                id="task-assignee"
                value={taskFormData.assignee}
                onChange={(e) => onInputChange('assignee', e.target.value)}
                placeholder="Nama Assignee"
              />
            </div>

            {/* Priority */}
            <div className="space-y-1">
              <Label htmlFor="task-priority">Priority</Label>
              <Select
                value={taskFormData.priority}
                onValueChange={(val) => onInputChange('priority', val || '')}
              >
                <SelectTrigger id="task-priority">
                  <SelectValue placeholder="Pilih prioritas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div className="space-y-1">
              <Label htmlFor="task-status">Status</Label>
              <Select
                value={taskFormData.status}
                onValueChange={(val) => onInputChange('status', val || '')}
              >
                <SelectTrigger id="task-status">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map(col => (
                    <SelectItem key={col.id} value={col.id}>{col.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Est. Hours */}
            <div className="space-y-1">
              <Label htmlFor="task-estHours">Est. Hours</Label>
              <Input
                id="task-estHours"
                type="number"
                min="0"
                value={taskFormData.estHours}
                onChange={(e) => onInputChange('estHours', e.target.value)}
                placeholder="Estimasi jam"
              />
            </div>
          </div>

          {/* Labels */}
          <div className="space-y-1">
            <Label htmlFor="task-labels">Labels</Label>
            <Input
              id="task-labels"
              value={taskFormData.labels}
              onChange={(e) => onInputChange('labels', e.target.value)}
              placeholder="e.g. Frontend, Bug, Easy"
            />
          </div>

          {/* Due Date */}
          <div className="space-y-1 flex flex-col">
            <Label htmlFor="task-dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger
                id="task-dueDate"
                className={cn(
                  "h-9 w-full min-w-0 rounded-md border border-input bg-input/20 px-3 py-1.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-start text-left font-normal cursor-pointer dark:bg-input/30",
                  !taskFormData.dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                {taskFormData.dueDate ? (
                  format(new Date(taskFormData.dueDate), "PPP")
                ) : (
                  <span>Pilih tanggal jatuh tempo</span>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={taskFormData.dueDate ? new Date(taskFormData.dueDate) : undefined}
                  onSelect={(date) => {
                    const formatted = date ? format(date, 'yyyy-MM-dd') : '';
                    onInputChange('dueDate', formatted);
                  }}
                  disabled={{ before: today }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
            Batal
          </Button>
          <Button onClick={onSave} className="cursor-pointer">
            {editingTask ? 'Simpan Perubahan' : 'Simpan Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
