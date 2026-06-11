import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 bg-card text-card-foreground border-border shadow-lg">
        <DialogHeader className="pb-4 border-b border-border/50">
          <DialogTitle className="text-xl font-bold text-foreground">Create Event</DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-foreground">Title</Label>
            <Input 
              id="title" 
              placeholder="Event title" 
              className="bg-background border-input focus-visible:ring-primary"
            />
          </div>

          {/* Date & Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold text-foreground">Date</Label>
              <Input 
                id="date" 
                type="date" 
                className="bg-background border-input focus-visible:ring-primary w-full" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-semibold text-foreground">Time</Label>
              <Input 
                id="time" 
                type="time" 
                className="bg-background border-input focus-visible:ring-primary w-full" 
              />
            </div>
          </div>

          {/* Type & Participants Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-semibold text-foreground">Type</Label>
              <Select defaultValue="meeting">
                <SelectTrigger id="type" className="bg-background border-input focus-visible:ring-primary">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="leave">Leave</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants" className="text-sm font-semibold text-foreground">Participants</Label>
              <Input 
                id="participants" 
                placeholder="Comma separated" 
                className="bg-background border-input focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-foreground">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Event description" 
              className="resize-none h-24 bg-background border-input focus-visible:ring-primary" 
            />
          </div>
        </div>

        <DialogFooter className="pt-4 flex sm:justify-end gap-2 sm:gap-0 border-t border-border/50">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-input hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => onOpenChange(false)} 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}