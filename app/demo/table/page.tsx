"use client";

import {
  DataTable,
  DataTableActionBar,
  DensityState,
} from "@/components/data-table";
import { columns } from "./columns";
import { tasks } from "./data/tasks";
import { TasksToolbar } from "./tasks-toolbar";
import { TasksActionBarContent } from "./tasks-action-bar";
import { Task } from "./data/schema";
import { Table } from "@tanstack/react-table";

export default function TasksPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground mt-2">
          Manage your tasks with advanced filtering, sorting, and bulk actions.
        </p>
      </div>
      <DataTable
        columns={columns}
        data={tasks}
        toolbar={(table, density, onDensityChange) => (
          <TasksToolbar
            table={table as Table<Task>}
            density={density}
            onDensityChange={onDensityChange}
          />
        )}
        actionBar={(table) => (
          <DataTableActionBar table={table}>
            {(selectedRows, resetSelection) => (
              <TasksActionBarContent
                selectedRows={selectedRows as Task[]}
                resetSelection={resetSelection}
              />
            )}
          </DataTableActionBar>
        )}
      />
    </div>
  );
}
