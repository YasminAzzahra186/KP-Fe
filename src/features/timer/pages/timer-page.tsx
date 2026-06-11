import { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Komponen Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- DATA STATIS ---
export const taskOptions = [
  { id: 'office-tracker', name: 'Office Tracker' },
  { id: 'team-meeting', name: 'Team Meeting' },
  { id: 'mobile-app', name: 'Mobile App Dev' },
];

export const initialTimeEntries = [
  { 
    id: '1', 
    task: 'Office Tracker', 
    duration: '2h 31m', 
    start: '09:00', 
    end: '11:31', 
    status: 'Running' 
  },
  { 
    id: '2', 
    task: 'Team Meeting', 
    duration: '1h 00m', 
    start: '10:00', 
    end: '11:00', 
    status: 'Completed' 
  },
  { 
    id: '3', 
    task: 'Mobile App Dev', 
    duration: '3h 14m', 
    start: '08:00', 
    end: '11:14', 
    status: 'Completed' 
  },
];
// -------------------

export function TimerPage() {
  // Angka 9105 detik = 02:31:45 (sesuai gambar)
  const [seconds, setSeconds] = useState<number>(9105);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string>('office-tracker');

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format ke HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="space-y-6 px-3">
      {/* Header (Disamakan dengan gaya ProjectsPage) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Timer</h1>
            <p className="text-sm text-muted-foreground">Track working hours and time entries.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* AREA TIMER */}
        <Card className="flex flex-col items-center justify-center p-8 sm:p-12 text-center shadow-sm">
          <CardContent className="flex flex-col items-center space-y-6 p-0 w-full max-w-md">
            
            {/* Display Waktu */}
            <div className="space-y-2">
              <h2 className="text-6xl sm:text-7xl font-mono font-semibold tracking-wider text-foreground">
                {formatTime(seconds)}
              </h2>
              <p className="text-muted-foreground">Elapsed Time</p>
            </div>

            {/* Select Task */}
            <div className="w-full">
              <Select value={selectedTask} onValueChange={setSelectedTask}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a task..." />
                </SelectTrigger>
                <SelectContent>
                  {taskOptions.map(task => (
                    <SelectItem key={task.id} value={task.id}>
                      Working on {task.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons (Warna disesuaikan dengan gambar) */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button onClick={handleStart} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px] gap-2 cursor-pointer">
                <Play className="h-4 w-4 fill-current" /> Start
              </Button>
              <Button onClick={handlePause} className="bg-orange-500 hover:bg-orange-600 text-white min-w-[100px] gap-2 cursor-pointer">
                <Pause className="h-4 w-4 fill-current" /> Pause
              </Button>
              <Button onClick={handleStop} className="bg-red-500 hover:bg-red-600 text-white min-w-[100px] gap-2 cursor-pointer">
                <Square className="h-4 w-4 fill-current" /> Stop
              </Button>
              <Button onClick={handleReset} className="bg-slate-400 hover:bg-slate-500 text-white min-w-[100px] gap-2 cursor-pointer">
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
            </div>

          </CardContent>
        </Card>

        {/* AREA TABEL */}
        <Card className="overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[300px]">Task</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialTimeEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.task}</TableCell>
                    <TableCell>{entry.duration}</TableCell>
                    <TableCell>{entry.start}</TableCell>
                    <TableCell>{entry.end}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "font-normal",
                          entry.status === 'Running' 
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400" 
                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 dark:bg-emerald-900/30 dark:text-emerald-400"
                        )}
                      >
                        {entry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}