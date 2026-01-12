"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconDownload,
  IconFileTypeCsv,
  IconFileTypeXls,
  IconFileTypePdf,
  IconLoader2,
} from "@tabler/icons-react";
import { Task } from "@/db/schema";
import { toast } from "sonner";

interface ExportDropdownProps {
  data: Task[];
}

type ExportFormat = "csv" | "excel" | "pdf";

export function ExportDropdown({ data }: ExportDropdownProps) {
  const [isExporting, setIsExporting] = React.useState<ExportFormat | null>(
    null
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const exportToCSV = () => {
    try {
      const headers = [
        "ID",
        "Title",
        "Status",
        "Priority",
        "Label",
        "Estimated Hours",
        "Created At",
      ];
      const rows = data.map((task) => [
        task.id,
        `"${task.title.replace(/"/g, '""')}"`,
        task.status,
        task.priority,
        task.label,
        task.estimatedHours,
        formatDate(task.createdAt),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob(["\ufeff" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `tasks_export_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Export CSV berhasil!", {
        description: `${data.length} task berhasil diekspor ke file CSV.`,
      });
    } catch (error) {
      toast.error("Export CSV gagal", {
        description: "Terjadi kesalahan saat mengekspor data ke CSV.",
      });
    }
  };

  const exportToExcel = () => {
    try {
      // Create Excel-compatible HTML table
      const headers = [
        "ID",
        "Title",
        "Status",
        "Priority",
        "Label",
        "Estimated Hours",
        "Created At",
      ];

      let tableHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8">
          <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                  <x:Name>Tasks</x:Name>
                  <x:WorksheetOptions>
                    <x:DisplayGridlines/>
                  </x:WorksheetOptions>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
            </x:ExcelWorkbook>
          </xml>
          <![endif]-->
          <style>
            table { border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4F46E5; color: white; font-weight: bold; }
            tr:nth-child(even) { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
      `;

      data.forEach((task) => {
        tableHtml += `
          <tr>
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.status}</td>
            <td>${task.priority}</td>
            <td>${task.label}</td>
            <td>${task.estimatedHours}</td>
            <td>${formatDate(task.createdAt)}</td>
          </tr>
        `;
      });

      tableHtml += `
            </tbody>
          </table>
        </body>
        </html>
      `;

      const blob = new Blob([tableHtml], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `tasks_export_${new Date().toISOString().split("T")[0]}.xls`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Export Excel berhasil!", {
        description: `${data.length} task berhasil diekspor ke file Excel.`,
      });
    } catch (error) {
      toast.error("Export Excel gagal", {
        description: "Terjadi kesalahan saat mengekspor data ke Excel.",
      });
    }
  };

  const exportToPDF = () => {
    try {
      // Create printable HTML for PDF export
      const headers = [
        "ID",
        "Title",
        "Status",
        "Priority",
        "Label",
        "Est. Hours",
        "Created At",
      ];

      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Tasks Export</title>
          <style>
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #4F46E5;
            }
            .header h1 {
              color: #4F46E5;
              margin: 0;
              font-size: 28px;
            }
            .header p {
              color: #666;
              margin: 10px 0 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 12px;
            }
            th {
              background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
              color: white;
              padding: 12px 8px;
              text-align: left;
              font-weight: 600;
            }
            td {
              padding: 10px 8px;
              border-bottom: 1px solid #e5e7eb;
            }
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
            tr:hover {
              background-color: #f3f4f6;
            }
            .status-todo { color: #6b7280; }
            .status-in-progress { color: #3b82f6; }
            .status-done { color: #22c55e; }
            .status-canceled { color: #ef4444; }
            .priority-low { color: #6b7280; }
            .priority-medium { color: #eab308; }
            .priority-high { color: #ef4444; }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📋 Tasks Report</h1>
            <p>Generated on ${new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</p>
            <p>Total Tasks: ${data.length}</p>
          </div>
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (task) => `
                <tr>
                  <td style="font-family: monospace; font-size: 11px;">${task.id}</td>
                  <td>${task.title}</td>
                  <td class="status-${task.status}">${task.status}</td>
                  <td class="priority-${task.priority}">${task.priority}</td>
                  <td>${task.label}</td>
                  <td style="text-align: center;">${task.estimatedHours}</td>
                  <td>${formatDate(task.createdAt)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Task Management System</p>
          </div>
        </body>
        </html>
      `;

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();

        // Wait for content to load then trigger print
        printWindow.onload = () => {
          printWindow.print();
        };

        // Fallback for browsers that don't fire onload
        setTimeout(() => {
          printWindow.print();
        }, 500);

        toast.success("Export PDF disiapkan!", {
          description:
            "Dialog print akan terbuka. Pilih 'Save as PDF' untuk menyimpan.",
        });
      } else {
        throw new Error("Popup blocked");
      }
    } catch (error) {
      toast.error("Export PDF gagal", {
        description: "Pastikan popup tidak diblokir oleh browser.",
      });
    }
  };

  const handleExport = async (format: ExportFormat) => {
    if (data.length === 0) {
      toast.warning("Tidak ada data", {
        description: "Tidak ada task untuk diekspor.",
      });
      return;
    }

    setIsExporting(format);

    // Add small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    switch (format) {
      case "csv":
        exportToCSV();
        break;
      case "excel":
        exportToExcel();
        break;
      case "pdf":
        exportToPDF();
        break;
    }

    setIsExporting(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          {isExporting ? (
            <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <IconDownload className="mr-2 h-4 w-4" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Export Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleExport("csv")}
          disabled={!!isExporting}
          className="cursor-pointer"
        >
          <IconFileTypeCsv className="mr-2 h-4 w-4 text-green-600" />
          <span className="flex-1">CSV</span>
          {isExporting === "csv" && (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("excel")}
          disabled={!!isExporting}
          className="cursor-pointer"
        >
          <IconFileTypeXls className="mr-2 h-4 w-4 text-primary" />
          <span className="flex-1">Excel (.xls)</span>
          {isExporting === "excel" && (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("pdf")}
          disabled={!!isExporting}
          className="cursor-pointer"
        >
          <IconFileTypePdf className="mr-2 h-4 w-4 text-red-600" />
          <span className="flex-1">PDF</span>
          {isExporting === "pdf" && (
            <IconLoader2 className="h-4 w-4 animate-spin" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
