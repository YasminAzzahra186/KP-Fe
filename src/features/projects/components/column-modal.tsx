import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColumnModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (label: string, color: 'gray') => void;
}

export function ColumnModal({ isOpen, onOpenChange, onSave }: ColumnModalProps) {
  const [label, setLabel] = useState('');

  const handleSave = () => {
    if (!label.trim()) {
      alert('Mohon masukkan nama status.');
      return;
    }
    onSave(label.trim(), 'gray');
    setLabel('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Tambah Status Kanban Baru</DialogTitle>
          <DialogDescription>
            Tambahkan kolom status baru untuk mengatur alur kerja tugas Anda.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          {/* Label / Status Name */}
          <div className="space-y-1">
            <Label htmlFor="col-label">Nama Status</Label>
            <Input
              id="col-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Contoh: Ready for Testing, Pending, dll."
            />
          </div>
        </div>

        <DialogFooter className="pt-4 border-t gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
            Batal
          </Button>
          <Button onClick={handleSave} className="cursor-pointer">
            Tambah Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
