"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconCircle,
  IconLoader,
  IconCircleCheck,
  IconCircleX,
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconLoader2,
  IconDeviceFloppy,
  IconEdit,
} from "@tabler/icons-react";
import { Task, TaskStatus, TaskPriority, TaskLabel } from "@/db/schema";
import { updateTask } from "../actions";
import { toast } from "sonner";

interface EditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onUpdated?: () => void;
}

const statusOptions = [
  { value: "todo", label: "Todo", icon: IconCircle, color: "text-slate-500" },
  {
    value: "in-progress",
    label: "In Progress",
    icon: IconLoader,
    color: "text-blue-500",
  },
  {
    value: "done",
    label: "Done",
    icon: IconCircleCheck,
    color: "text-primary",
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: IconCircleX,
    color: "text-red-500",
  },
];

const priorityOptions = [
  { value: "low", label: "Low", icon: IconArrowDown, color: "text-slate-500" },
  {
    value: "medium",
    label: "Medium",
    icon: IconArrowRight,
    color: "text-amber-500",
  },
  { value: "high", label: "High", icon: IconArrowUp, color: "text-rose-500" },
];

const labelOptions = [
  { value: "feature", label: "Feature", color: "bg-violet-500" },
  { value: "bug", label: "Bug", color: "bg-red-500" },
  { value: "enhancement", label: "Enhancement", color: "bg-cyan-500" },
  { value: "documentation", label: "Documentation", color: "bg-slate-500" },
];

export function EditTaskDialog({
  open,
  onOpenChange,
  task,
  onUpdated,
}: EditTaskDialogProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const hasCompletedRef = React.useRef(false);
  const [formData, setFormData] = React.useState({
    title: task.title,
    status: task.status,
    priority: task.priority,
    label: task.label,
    estimatedHours: task.estimatedHours,
  });

  // Reset form and ref when dialog opens with new task
  React.useEffect(() => {
    if (open) {
      hasCompletedRef.current = false;
      setIsSubmitting(false);
      setFormData({
        title: task.title,
        status: task.status,
        priority: task.priority,
        label: task.label,
        estimatedHours: task.estimatedHours,
      });
    }
  }, [open, task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasCompletedRef.current) return;

    if (!formData.title.trim()) {
      toast.error("Validasi gagal", {
        description: "Judul task tidak boleh kosong.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await updateTask({
        id: task.id,
        ...formData,
      });

      // Mark as completed to prevent any re-render issues
      hasCompletedRef.current = true;

      // Show success toast immediately
      toast.success("Task berhasil diperbarui!", {
        description: `Task "${formData.title}" telah diperbarui.`,
      });

      // Close dialog immediately
      onOpenChange(false);

      // Delay refresh to ensure dialog is fully closed
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Refresh in background
      router.refresh();

      onUpdated?.();
    } catch (error) {
      hasCompletedRef.current = false;
      toast.error("Gagal memperbarui task", {
        description:
          "Terjadi kesalahan saat memperbarui task. Silakan coba lagi.",
      });
      setIsSubmitting(false);
    }
  };

  // Prevent dialog from showing if action completed
  if (hasCompletedRef.current && !open) {
    return null;
  }

  return (
    <Dialog
      open={open && !hasCompletedRef.current}
      onOpenChange={(newOpen) => {
        if (!hasCompletedRef.current) {
          onOpenChange(newOpen);
        }
      }}
    >
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-3 pb-4">
            <div className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
              <IconEdit className="text-primary h-6 w-6" />
            </div>
            <div className="space-y-1 text-center">
              <DialogTitle className="text-xl">Edit Task</DialogTitle>
              <DialogDescription>
                Ubah detail task di bawah ini
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Judul Task
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Masukkan judul task..."
                disabled={isSubmitting}
                className="h-10"
              />
            </div>

            {/* Status & Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: value as TaskStatus,
                    }))
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="status" className="h-10">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${option.color}`} />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: value as TaskPriority,
                    }))
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="priority" className="h-10">
                    <SelectValue placeholder="Pilih priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${option.color}`} />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Label & Estimated Hours Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="label" className="text-sm font-medium">
                  Label
                </Label>
                <Select
                  value={formData.label}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      label: value as TaskLabel,
                    }))
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="label" className="h-10">
                    <SelectValue placeholder="Pilih label" />
                  </SelectTrigger>
                  <SelectContent>
                    {labelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${option.color}`}
                          />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedHours" className="text-sm font-medium">
                  Estimasi Jam
                </Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  min={1}
                  value={formData.estimatedHours}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      estimatedHours: parseInt(e.target.value) || 1,
                    }))
                  }
                  disabled={isSubmitting}
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <IconDeviceFloppy className="mr-2 h-4 w-4" />
                  Simpan
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
