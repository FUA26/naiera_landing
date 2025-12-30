"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconCircle,
  IconLoader,
  IconCircleCheck,
  IconCircleX,
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconDotsVertical,
} from "@tabler/icons-react";
import { Task } from "./data/schema";
import { DataTableColumnHeader } from "@/components/data-table";

// Status icon mapping
const statusIcons: Record<Task["status"], React.ReactNode> = {
  todo: <IconCircle className="text-muted-foreground h-4 w-4" />,
  "in-progress": <IconLoader className="h-4 w-4 animate-spin text-blue-500" />,
  done: <IconCircleCheck className="h-4 w-4 text-green-500" />,
  canceled: <IconCircleX className="h-4 w-4 text-red-500" />,
};

const statusLabels: Record<Task["status"], string> = {
  todo: "Todo",
  "in-progress": "In Progress",
  done: "Done",
  canceled: "Canceled",
};

// Priority icon mapping
const priorityIcons: Record<Task["priority"], React.ReactNode> = {
  low: <IconArrowDown className="text-muted-foreground h-4 w-4" />,
  medium: <IconArrowRight className="h-4 w-4 text-yellow-500" />,
  high: <IconArrowUp className="h-4 w-4 text-red-500" />,
};

const priorityLabels: Record<Task["priority"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

// Label badge variant mapping
const labelVariants: Record<
  Task["label"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  feature: "default",
  bug: "destructive",
  enhancement: "secondary",
  documentation: "outline",
};

export const columns: ColumnDef<Task>[] = [
  // Select column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Task ID column
  {
    accessorKey: "id",
    header: "Task",
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium">
        {row.getValue("id")}
      </div>
    ),
    enableHiding: false,
  },
  // Title column with label badge
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = row.original.label;
      return (
        <div className="flex max-w-[500px] items-center gap-2">
          <Badge variant={labelVariants[label]} className="shrink-0">
            {label}
          </Badge>
          <span className="truncate">{row.getValue("title")}</span>
        </div>
      );
    },
  },
  // Status column
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"];
      return (
        <div className="flex items-center gap-2">
          {statusIcons[status]}
          <span>{statusLabels[status]}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Priority column
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority") as Task["priority"];
      return (
        <div className="flex items-center gap-2">
          {priorityIcons[priority]}
          <span>{priorityLabels[priority]}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Estimated Hours column
  {
    accessorKey: "estimatedHours",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Est. Hours" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("estimatedHours")}</div>
    ),
  },
  // Created At column
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (!value) return true;
      const rowDate = row.getValue(id) as Date;
      const filterDate = new Date(value);
      return (
        rowDate.getFullYear() === filterDate.getFullYear() &&
        rowDate.getMonth() === filterDate.getMonth() &&
        rowDate.getDate() === filterDate.getDate()
      );
    },
  },
  // Actions column
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.id)}
            >
              Copy Task ID
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Edit Task
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              View Details
              <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Delete Task
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
