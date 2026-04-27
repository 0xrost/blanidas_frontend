import * as React from "react";
import {Card} from "@/presentation/components/ui/card.tsx";
import Notification from "@/presentation/components/layouts/Notification.tsx";

interface Column<T> {
    key: string;
    header: React.ReactNode;
    cell: (row: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

type RowErrors = Record<string, string>;

interface TableProps<T> {
    data: T[];
    empty: React.ReactNode;
    columns: Column<T>[];
    rowKey: (row: T) => string;
    rowError?: RowErrors;
}

function Table<T>({ data, columns, empty, rowKey, rowError }: TableProps<T>) {
    return (
        <Card className="bg-white border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b bg-slate-50">
                            {columns.map((col, index) => (
                                <th
                                    key={col.key}
                                    className={[
                                        "px-6 py-3 text-xs text-slate-600 uppercase text-nowrap tracking-wider",
                                        index === columns.length - 1 ? "text-right" : "text-left",
                                        col.headerClassName ?? "",
                                    ].join(" ")}
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
                                <React.Fragment key={rowKey(row)}>
                                    <tr className="hover:bg-slate-50 transition-colors border-slate-100 border-b">
                                        {columns.map(col => (
                                            <td
                                                key={col.key}
                                                className={["whitespace-nowrap", col.className ?? ""].join(" ")}
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
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
                {data.length === 0 && (<>{ empty }</>)}
            </div>
        </Card>
    );
}

export default Table;
export type { Column, RowErrors };