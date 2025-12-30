"use client";

import { Table } from "@tanstack/react-table";
import {
  IconSearch,
  IconArrowsSort,
  IconLayoutRows,
  IconDownload,
  IconX,
  IconCircle,
  IconLoader,
  IconCircleCheck,
  IconCircleX,
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconTrash,
  IconGripVertical,
} from "@tabler/icons-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import {
  DataTableFacetedFilter,
  DataTableDateFilter,
  DataTableViewOptions,
  DensityState,
  FacetedFilterOption,
} from "@/components/data-table";
import { Task } from "./data/schema";

// Status options
const statusOptions: FacetedFilterOption[] = [
  { value: "todo", label: "Todo", icon: IconCircle },
  { value: "in-progress", label: "In Progress", icon: IconLoader },
  { value: "done", label: "Done", icon: IconCircleCheck },
  { value: "canceled", label: "Canceled", icon: IconCircleX },
];

// Priority options
const priorityOptions: FacetedFilterOption[] = [
  { value: "low", label: "Low", icon: IconArrowDown },
  { value: "medium", label: "Medium", icon: IconArrowRight },
  { value: "high", label: "High", icon: IconArrowUp },
];

// Available columns for sorting
const sortableColumns = [
  { value: "title", label: "Title" },
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
  { value: "estimatedHours", label: "Est. Hours" },
  { value: "createdAt", label: "Created At" },
];

interface SortItem {
  id: string;
  column: string;
  desc: boolean;
}

interface TasksToolbarProps {
  table: Table<Task>;
  density: DensityState;
  onDensityChange: (density: DensityState) => void;
}

export function TasksToolbar({
  table,
  density,
  onDensityChange,
}: TasksToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const sortingState = table.getState().sorting;
  const sortCount = sortingState.length;

  // Local state for multi-sort management
  const [sortItems, setSortItems] = React.useState<SortItem[]>(() =>
    sortingState.map((s, i) => ({
      id: `sort-${i}`,
      column: s.id,
      desc: s.desc,
    }))
  );

  // Sync local state with table state
  React.useEffect(() => {
    const newItems = sortingState.map((s, i) => ({
      id: `sort-${i}`,
      column: s.id,
      desc: s.desc,
    }));
    setSortItems(newItems);
  }, [sortingState]);

  const addSort = () => {
    const usedColumns = sortItems.map((s) => s.column);
    const availableColumn = sortableColumns.find(
      (c) => !usedColumns.includes(c.value)
    );
    if (availableColumn) {
      const newItem: SortItem = {
        id: `sort-${Date.now()}`,
        column: availableColumn.value,
        desc: false,
      };
      const newItems = [...sortItems, newItem];
      setSortItems(newItems);
      table.setSorting(newItems.map((s) => ({ id: s.column, desc: s.desc })));
    }
  };

  const removeSort = (id: string) => {
    const newItems = sortItems.filter((s) => s.id !== id);
    setSortItems(newItems);
    table.setSorting(newItems.map((s) => ({ id: s.column, desc: s.desc })));
  };

  const updateSortColumn = (id: string, column: string) => {
    const newItems = sortItems.map((s) => (s.id === id ? { ...s, column } : s));
    setSortItems(newItems);
    table.setSorting(newItems.map((s) => ({ id: s.column, desc: s.desc })));
  };

  const updateSortDirection = (id: string, desc: boolean) => {
    const newItems = sortItems.map((s) => (s.id === id ? { ...s, desc } : s));
    setSortItems(newItems);
    table.setSorting(newItems.map((s) => ({ id: s.column, desc: s.desc })));
  };

  const resetSorting = () => {
    setSortItems([]);
    table.resetSorting();
  };

  const handleExport = () => {
    const data = table.getFilteredRowModel().rows.map((row) => row.original);
    console.log("Exporting data:", data);
    alert(`Exporting ${data.length} rows to CSV...`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top row: Search and action buttons */}
      <div className="flex items-center justify-between">
        {/* Left side: Search + Filters */}
        <div className="flex flex-1 items-center space-x-2">
          {/* Search */}
          <div className="relative w-full max-w-[250px]">
            <IconSearch className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="Search titles..."
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="h-9 pl-8"
            />
          </div>

          {/* Faceted Filters */}
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statusOptions}
            />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorityOptions}
            />
          )}

          {/* Date Filter */}
          {table.getColumn("createdAt") && (
            <DataTableDateFilter
              column={table.getColumn("createdAt")}
              title="Created At"
            />
          )}

          {/* Reset Filters */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <IconX className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Right side: Action buttons group */}
        <ButtonGroup>
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <IconArrowsSort className="mr-2 h-4 w-4" />
                Sort
                {sortCount > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                    {sortCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px]">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 p-2">
                {sortItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Select
                      value={item.column}
                      onValueChange={(value) =>
                        updateSortColumn(item.id, value)
                      }
                    >
                      <SelectTrigger className="h-8 flex-1">
                        <SelectValue placeholder="Column" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortableColumns.map((col) => (
                          <SelectItem
                            key={col.value}
                            value={col.value}
                            disabled={sortItems.some(
                              (s) => s.column === col.value && s.id !== item.id
                            )}
                          >
                            {col.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={item.desc ? "desc" : "asc"}
                      onValueChange={(value) =>
                        updateSortDirection(item.id, value === "desc")
                      }
                    >
                      <SelectTrigger className="h-8 w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Asc</SelectItem>
                        <SelectItem value="desc">Desc</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeSort(item.id)}
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                    <IconGripVertical className="text-muted-foreground h-4 w-4 cursor-grab" />
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={addSort}
                    disabled={sortItems.length >= sortableColumns.length}
                  >
                    Add sort
                  </Button>
                  {sortItems.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={resetSorting}>
                      Reset sorting
                    </Button>
                  )}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Density Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <IconLayoutRows className="mr-2 h-4 w-4" />
                Density
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Row density</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={density}
                onValueChange={(v) => onDensityChange(v as DensityState)}
              >
                <DropdownMenuRadioItem value="short">
                  Short
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">
                  Medium
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="tall">Tall</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="extra-tall">
                  Extra Tall
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Options */}
          <DataTableViewOptions table={table} />

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={handleExport}
          >
            <IconDownload className="mr-2 h-4 w-4" />
            Export
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
