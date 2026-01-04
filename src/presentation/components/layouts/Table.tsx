import * as React from "react";
import {Card} from "@/presentation/components/ui/card.tsx";
import Notification from "@/presentation/components/layouts/Notification.tsx";

export interface Column<T> {
    key: string;
    header: React.ReactNode;
    cell: (row: T) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    rowKey: (row: T) => string;
    rowError?: Record<string, string>
}

function Table<T>({ data, columns, rowKey, rowError }: TableProps<T>) {
    return (
        <Card className="bg-white border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b bg-slate-50">
                            {columns.map((col, index) => (
                                <th
                                    key={col.key}
                                    className={`px-6 py-3 text-xs text-slate-600 uppercase tracking-wider 
                                            ${index === columns.length - 1 ? "text-right" : "text-left"}
                                        `}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(row => {
                            const error = rowError ? (rowError[rowKey(row)] || "") : "";
                            return (
                                <>
                                    <tr
                                        key={rowKey(row)}
                                        className="hover:bg-slate-50 transition-colors border-slate-100 border-b"
                                    >
                                        {columns.map(col => (
                                            <td
                                                key={col.key}
                                                className={col.className ?? "whitespace-nowrap"}
                                            >
                                                {col.cell(row)}
                                            </td>
                                        ))}
                                    </tr>
                                    {error &&
                                        <tr className="bg-slate-50">
                                            <td colSpan={columns.length} className="px-4 py-2">
                                                <Notification type="error" message={error} />
                                            </td>
                                        </tr>
                                    }
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export default Table;