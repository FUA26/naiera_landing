"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  IconCircle,
  IconLoader,
  IconCircleCheck,
  IconCircleX,
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCalendar,
  IconClock,
  IconCopy,
  IconTag,
  IconFlag,
  IconFileText,
  IconChartBar,
  IconId,
  IconBriefcase,
  IconUser,
} from "@tabler/icons-react";
import { TaskWithRelations } from "../columns";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ViewTaskSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskWithRelations;
}

// Status configuration
const statusConfig: Record<
  TaskWithRelations["status"],
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    bgColor: string;
    textColor: string;
    iconColor: string;
  }
> = {
  todo: {
    label: "Todo",
    icon: IconCircle,
    bgColor: "bg-slate-100 dark:bg-slate-800",
    textColor: "text-slate-700 dark:text-slate-300",
    iconColor: "text-slate-500",
  },
  "in-progress": {
    label: "In Progress",
    icon: IconLoader,
    bgColor: "bg-blue-50 dark:bg-blue-950",
    textColor: "text-blue-700 dark:text-blue-300",
    iconColor: "text-blue-500",
  },
  done: {
    label: "Done",
    icon: IconCircleCheck,
    bgColor: "bg-primary-lighter dark:bg-emerald-950",
    textColor: "text-primary-hover dark:text-emerald-300",
    iconColor: "text-primary",
  },
  canceled: {
    label: "Canceled",
    icon: IconCircleX,
    bgColor: "bg-red-50 dark:bg-red-950",
    textColor: "text-red-700 dark:text-red-300",
    iconColor: "text-red-500",
  },
};

// Priority configuration
const priorityConfig: Record<
  TaskWithRelations["priority"],
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    bgColor: string;
    textColor: string;
    iconColor: string;
  }
> = {
  low: {
    label: "Low",
    icon: IconArrowDown,
    bgColor: "bg-slate-100 dark:bg-slate-800",
    textColor: "text-slate-700 dark:text-slate-300",
    iconColor: "text-slate-500",
  },
  medium: {
    label: "Medium",
    icon: IconArrowRight,
    bgColor: "bg-amber-50 dark:bg-amber-950",
    textColor: "text-amber-700 dark:text-amber-300",
    iconColor: "text-amber-500",
  },
  high: {
    label: "High",
    icon: IconArrowUp,
    bgColor: "bg-rose-50 dark:bg-rose-950",
    textColor: "text-rose-700 dark:text-rose-300",
    iconColor: "text-rose-500",
  },
};

// Label configuration
const labelConfig: Record<
  TaskWithRelations["label"],
  {
    bgColor: string;
    textColor: string;
    dotColor: string;
  }
> = {
  feature: {
    bgColor: "bg-violet-100 dark:bg-violet-900/30",
    textColor: "text-violet-700 dark:text-violet-300",
    dotColor: "bg-violet-500",
  },
  bug: {
    bgColor: "bg-red-100 dark:bg-red-900/30",
    textColor: "text-red-700 dark:text-red-300",
    dotColor: "bg-red-500",
  },
  enhancement: {
    bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    textColor: "text-cyan-700 dark:text-cyan-300",
    dotColor: "bg-cyan-500",
  },
  documentation: {
    bgColor: "bg-slate-100 dark:bg-slate-800",
    textColor: "text-slate-700 dark:text-slate-300",
    dotColor: "bg-slate-500",
  },
};

export function ViewTaskSheet({
  open,
  onOpenChange,
  task,
}: ViewTaskSheetProps) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const label = labelConfig[task.label];
  const StatusIcon = status.icon;
  const PriorityIcon = priority.icon;

  const daysSinceCreated = Math.max(
    1,
    Math.ceil(
      (new Date().getTime() - new Date(task.createdAt).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const handleCopyId = () => {
    navigator.clipboard.writeText(task.id);
    toast.success("ID berhasil disalin!");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full p-0 sm:max-w-lg">
        <ScrollArea className="h-full">
          {/* Header with gradient background */}
          <div className="from-primary/10 via-primary/5 relative overflow-hidden bg-gradient-to-br to-transparent px-6 pt-6 pb-8">
            <div className="from-primary/10 absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] via-transparent to-transparent" />

            <SheetHeader className="relative space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${status.bgColor} ring-2 ring-white/50 dark:ring-white/10`}
                  >
                    <StatusIcon className={`h-5 w-5 ${status.iconColor}`} />
                  </div>
                  <Badge
                    className={`${status.bgColor} ${status.textColor} border-0 px-3 py-1 font-medium`}
                  >
                    {status.label}
                  </Badge>
                </div>
                <Badge
                  className={`${priority.bgColor} ${priority.textColor} gap-1.5 border-0 px-3 py-1 font-medium`}
                >
                  <PriorityIcon className="h-3.5 w-3.5" />
                  {priority.label}
                </Badge>
              </div>

              <div className="space-y-2">
                <SheetTitle className="text-xl leading-tight font-semibold tracking-tight">
                  {task.title}
                </SheetTitle>
                <div className="flex items-center gap-2">
                  <code className="bg-muted/80 text-muted-foreground rounded-md px-2 py-1 font-mono text-xs">
                    {task.id}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-muted h-7 w-7 p-0"
                    onClick={handleCopyId}
                  >
                    <IconCopy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </SheetHeader>
          </div>

          {/* Content */}
          <div className="space-y-6 px-6 py-6">
            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Label Card */}
              <div className="group bg-card hover:border-primary/20 relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md">
                <div className="text-muted-foreground mb-2 flex items-center gap-2">
                  <IconTag className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wider uppercase">
                    Label
                  </span>
                </div>
                <div
                  className={`inline-flex items-center gap-2 rounded-lg ${label.bgColor} px-3 py-1.5`}
                >
                  <span className={`h-2 w-2 rounded-full ${label.dotColor}`} />
                  <span
                    className={`text-sm font-medium capitalize ${label.textColor}`}
                  >
                    {task.label}
                  </span>
                </div>
              </div>

              {/* Estimated Hours Card */}
              <div className="group bg-card hover:border-primary/20 relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md">
                <div className="text-muted-foreground mb-2 flex items-center gap-2">
                  <IconClock className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wider uppercase">
                    Estimasi
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-foreground text-2xl font-bold">
                    {task.estimatedHours}
                  </span>
                  <span className="text-muted-foreground text-sm">jam</span>
                </div>
              </div>
            </div>

            {/* Relations Section (New) */}
            <div className="bg-card overflow-hidden rounded-xl border">
              <div className="bg-muted/30 border-b px-4 py-3">
                <div className="flex items-center gap-2">
                  <IconBriefcase className="text-muted-foreground h-4 w-4" />
                  <h3 className="text-sm font-semibold">Terkait</h3>
                </div>
              </div>
              <div className="divide-y">
                {/* Project */}
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
                      <IconBriefcase className="text-muted-foreground h-4 w-4" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Project
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.project ? (
                      <span className="text-sm font-medium">
                        {task.project.name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </div>
                </div>

                {/* Assignee */}
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
                      <IconUser className="text-muted-foreground h-4 w-4" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Assignee
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.assignee.name}`}
                            alt={task.assignee.name}
                          />
                          <AvatarFallback>
                            {task.assignee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {task.assignee.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </div>
                </div>

                {/* Reporter */}
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
                      <IconFlag className="text-muted-foreground h-4 w-4" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Reporter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.reporter ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.reporter.name}`}
                            alt={task.reporter.name}
                          />
                          <AvatarFallback>
                            {task.reporter.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {task.reporter.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-card overflow-hidden rounded-xl border">
              <div className="bg-muted/30 border-b px-4 py-3">
                <div className="flex items-center gap-2">
                  <IconFileText className="text-muted-foreground h-4 w-4" />
                  <h3 className="text-sm font-semibold">Detail Informasi</h3>
                </div>
              </div>
              <div className="divide-y">
                {/* Task ID */}
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
                      <IconId className="text-muted-foreground h-4 w-4" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Task ID
                    </span>
                  </div>
                  <code className="bg-muted rounded-md px-2.5 py-1 font-mono text-xs">
                    {task.id}
                  </code>
                </div>

                {/* Created Date */}
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
                      <IconCalendar className="text-muted-foreground h-4 w-4" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      Dibuat Pada
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {new Date(task.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Created Time */}
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
                      <IconClock className="text-muted-foreground h-4 w-4" />
                    </div>
                    <span className="text-muted-foreground text-sm">Waktu</span>
                  </div>
                  <span className="text-sm font-medium">
                    {new Date(task.createdAt).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-card overflow-hidden rounded-xl border">
              <div className="bg-muted/30 border-b px-4 py-3">
                <div className="flex items-center gap-2">
                  <IconChartBar className="text-muted-foreground h-4 w-4" />
                  <h3 className="text-sm font-semibold">Statistik</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Days Since Created */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-4 ring-1 ring-blue-500/10">
                    <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-blue-500/10 blur-2xl" />
                    <div className="relative">
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {daysSinceCreated}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs font-medium">
                        Hari Berlalu
                      </p>
                    </div>
                  </div>

                  {/* Estimated Progress */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-emerald-600/5 p-4 ring-1 ring-emerald-500/10">
                    <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
                    <div className="relative">
                      <p className="text-3xl font-bold text-primary dark:text-primary">
                        {task.estimatedHours}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs font-medium">
                        Jam Diestimasi
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progres Waktu</span>
                    <span className="font-medium">
                      {Math.min(
                        100,
                        Math.round(
                          (daysSinceCreated / (task.estimatedHours / 8)) * 100
                        )
                      )}
                      %
                    </span>
                  </div>
                  <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                    <div
                      className="from-primary to-primary/70 h-full rounded-full bg-gradient-to-r transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (daysSinceCreated / (task.estimatedHours / 8)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
