import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderKanban, 
  Plus, 
  Users, 
  Edit, 
  Trash2,
  CheckCircle,
  Circle,
  Calendar as CalendarIcon,
  ClipboardList
} from 'lucide-react';
import { format } from 'date-fns';
import { cn, formatDateIndonesian } from '@/lib/utils';

// Import Komponen Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { Project } from '../types';
import { initialMockProjects, getProjectStats } from '../data';

// Map initialMockProjects to include derived task stats
const initialProjects: Project[] = initialMockProjects.map(p => {
  const stats = getProjectStats(p.id);
  const progress = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;
  return {
    ...p,
    taskCount: stats.totalTasks,
    completedTaskCount: stats.completedTasks,
    progress,
  };
});

export function ProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('tracking_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  useEffect(() => {
    localStorage.setItem('tracking_projects', JSON.stringify(projects));
  }, [projects]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // State form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
    memberCount: 0,
    startDate: '',
    taskCount: 0,
    completedTaskCount: 0,
  });

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      status: 'active',
      memberCount: 0,
      startDate: '',
      taskCount: 0,
      completedTaskCount: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      memberCount: project.memberCount,
      startDate: project.startDate || '',
      taskCount: project.taskCount || 0,
      completedTaskCount: project.completedTaskCount || 0,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'status' || name === 'startDate' || name === 'title' || name === 'description' 
        ? value 
        : (name === 'memberCount' || name === 'taskCount' || name === 'completedTaskCount' ? Number(value) || 0 : value),
    }));
  };

  const calculateProgress = (taskCount: number, completedTaskCount: number): number => {
    if (taskCount === 0) return 0;
    return Math.round((completedTaskCount / taskCount) * 100);
  };

  const saveProject = () => {
    const newProgress = calculateProgress(formData.taskCount, formData.completedTaskCount);
    
    if (editingProject) {
      setProjects(prev =>
        prev.map(p =>
          p.id === editingProject.id
            ? { ...p, ...formData, progress: newProgress }
            : p
        )
      );
    } else {
      const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
      const newProject: Project = {
        id: newId,
        ...formData,
        progress: newProgress,
      };
      setProjects(prev => [...prev, newProject]);
    }
    setIsModalOpen(false);
  };

  const deleteProject = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus project ini?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6 px-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6 mb-6">
        <div className="flex items-center gap-3">          <div> 
            <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground">Manage and track your organization's projects</p>
          </div>
        </div>
        <Button onClick={openAddModal} className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>

      {/* Main Content */}
      {projects.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <CardHeader className="items-center pb-2">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-2" />
            <CardTitle>No projects yet</CardTitle>
            <CardDescription>Get started by creating your first project alignment.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={openAddModal} className="mt-2 gap-2 cursor-pointer">
              <Plus className="h-4 w-4" /> Add Project
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="flex flex-col justify-between hover:shadow-md hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => navigate(`/admin/projects/${project.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[40px]">{project.description}</CardDescription>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openEditModal(project); }} className="h-8 w-8 text-muted-foreground hover:text-primary cursor-pointer">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Status Badge */}
                <div>
                  <Badge variant={project.status === 'active' ? 'default' : 'secondary'} className="gap-1">
                    {project.status === 'active' ? <CheckCircle className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                    {project.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{project.memberCount} Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    <span>{project.completedTaskCount} Tasks</span>
                  </div>
                  {project.startDate && (
                    <div className="flex items-center gap-2 col-span-2 text-xs border-t border-border/50 pt-2 mt-1">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>Start Date: {formatDateIndonesian(project.startDate)}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0 pb-5 flex flex-col gap-2.5 items-stretch">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span className="font-medium text-foreground">{project.progress ?? 0}%</span>
                </div>
                <Progress value={project.progress ?? 0} className="h-2" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Add/Edit Project (Shadcn Dialog) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {editingProject ? 'Make changes to your project here. Click update when you are done.' : 'Fill in the details to create a new project.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={(e) => handleInputChange('title', e.target.value)} 
                placeholder="Enter project title" 
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => handleInputChange('description', e.target.value)} 
                placeholder="Enter project description" 
                rows={3}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange('status', value || '')}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="memberCount">Members</Label>
                <Input 
                  id="memberCount" 
                  type="number" 
                  min="0"
                  value={formData.memberCount || ''} 
                  onChange={(e) => handleInputChange('memberCount', e.target.value)} 
                />
              </div>
              <div className="space-y-1 flex flex-col">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger
                    id="startDate"
                    className={cn(
                      "h-7 w-full min-w-0 rounded-md border border-input bg-input/20 px-2 py-0.5 text-sm md:text-xs/relaxed transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-start text-left font-normal cursor-pointer dark:bg-input/30",
                      !formData.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    {formData.startDate ? (
                      format(new Date(formData.startDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate ? new Date(formData.startDate) : undefined}
                      onSelect={(date) => {
                        const formatted = date ? format(date, 'yyyy-MM-dd') : '';
                        handleInputChange('startDate', formatted);
                      }}
                      disabled={{ before: today }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className={"cursor-pointer"}>Cancel</Button>
            <Button onClick={saveProject} className={"cursor-pointer"}>{editingProject ? 'Update' : 'Create'} Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}