"use client";

import * as React from "react";
import {
  IconTrash,
  IconCircle,
  IconLoader,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Task } from "./data/schema";

interface TasksActionBarContentProps {
  selectedRows: Task[];
  resetSelection: () => void;
}

export function TasksActionBarContent({
  selectedRows,
  resetSelection,
}: TasksActionBarContentProps) {
  const handleDelete = () => {
    const ids = selectedRows.map((task) => task.id);
    console.log("Deleting tasks:", ids);
    alert(
      `Deleting ${ids.length} task(s): ${ids.slice(0, 3).join(", ")}${ids.length > 3 ? "..." : ""}`
    );
    resetSelection();
  };

  const handleStatusChange = (status: string) => {
    const ids = selectedRows.map((task) => task.id);
    console.log(`Updating ${ids.length} tasks to status: ${status}`);
    alert(`Updating ${ids.length} task(s) to status: ${status}`);
    resetSelection();
  };

  return (
    <>
      {/* Status update */}
      <Select onValueChange={handleStatusChange}>
        <SelectTrigger className="h-8 w-[140px]">
          <SelectValue placeholder="Update status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">
            <div className="flex items-center gap-2">
              <IconCircle className="h-4 w-4" />
              Todo
            </div>
          </SelectItem>
          <SelectItem value="in-progress">
            <div className="flex items-center gap-2">
              <IconLoader className="h-4 w-4" />
              In Progress
            </div>
          </SelectItem>
          <SelectItem value="done">
            <div className="flex items-center gap-2">
              <IconCircleCheck className="h-4 w-4" />
              Done
            </div>
          </SelectItem>
          <SelectItem value="canceled">
            <div className="flex items-center gap-2">
              <IconCircleX className="h-4 w-4" />
              Canceled
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Delete action */}
      <Button
        variant="destructive"
        size="sm"
        className="h-8"
        onClick={handleDelete}
      >
        <IconTrash className="mr-2 h-4 w-4" />
        Delete
      </Button>

      <Separator orientation="vertical" className="h-6" />
    </>
  );
}
