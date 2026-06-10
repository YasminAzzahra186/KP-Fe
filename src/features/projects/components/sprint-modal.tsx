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

interface SprintModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    name: string;
    goal: string;
    startDate: string;
    endDate: string;
    status: 'planned' | 'active' | 'completed';
    description: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
  today: Date;
}

export function SprintModal({
  isOpen,
  onOpenChange,
  formData,
  onInputChange,
  onSave,
  today
}: SprintModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Sprint Baru</DialogTitle>
          <DialogDescription>
            Isi formulir di bawah ini untuk membuat sprint baru beserta task pertamanya.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          {/* Nama Sprint */}
          <div className="space-y-1">
            <Label htmlFor="sprint-name">Nama Sprint</Label>
            <Input 
              id="sprint-name" 
              value={formData.name} 
              onChange={(e) => onInputChange('name', e.target.value)} 
              placeholder="Masukkan nama sprint (e.g. Sprint 1)" 
            />
          </div>

          {/* Goal */}
          <div className="space-y-1">
            <Label htmlFor="sprint-goal">Goal</Label>
            <Input 
              id="sprint-goal" 
              value={formData.goal} 
              onChange={(e) => onInputChange('goal', e.target.value)} 
              placeholder="Masukkan goal/tujuan sprint" 
            />
          </div>

          {/* Start & End Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 flex flex-col">
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger
                  id="startDate"
                  className={cn(
                    "h-9 w-full min-w-0 rounded-md border border-input bg-input/20 px-3 py-1.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-start text-left font-normal cursor-pointer dark:bg-input/30",
                    !formData.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                  {formData.startDate ? (
                    format(new Date(formData.startDate), "PPP")
                  ) : (
                    <span><span className="hidden md:block">Pilih</span>tanggal mulai</span>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate ? new Date(formData.startDate) : undefined}
                    onSelect={(date) => {
                      const formatted = date ? format(date, 'yyyy-MM-dd') : '';
                      onInputChange('startDate', formatted);
                    }}
                    disabled={{ before: today }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1 flex flex-col">
              <Label htmlFor="endDate">End Date</Label>
              <Popover>
                <PopoverTrigger
                  id="endDate"
                  className={cn(
                    "h-9 w-full min-w-0 rounded-md border border-input bg-input/20 px-3 py-1.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-start text-left font-normal cursor-pointer dark:bg-input/30",
                    !formData.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                  {formData.endDate ? (
                    format(new Date(formData.endDate), "PPP")
                  ) : (
                    <span><span className="hidden md:block">Pilih</span>tanggal selesai</span>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate ? new Date(formData.endDate) : undefined}
                    onSelect={(date) => {
                      const formatted = date ? format(date, 'yyyy-MM-dd') : '';
                      onInputChange('endDate', formatted);
                    }}
                    disabled={{ before: formData.startDate ? new Date(formData.startDate) : today }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <Label htmlFor="sprint-status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(val) => onInputChange('status', val || '')}
            >
              <SelectTrigger id="sprint-status">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="sprint-description">Deskripsi</Label>
            <Textarea 
              id="sprint-description" 
              value={formData.description} 
              onChange={(e) => onInputChange('description', e.target.value)} 
              placeholder="Masukkan deskripsi sprint" 
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="pt-4 border-t gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
            Batal
          </Button>
          <Button onClick={onSave} className="cursor-pointer">
            Simpan Sprint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
