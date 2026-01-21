import ChartCard from "@/presentation/components/tabs/statistics/charts/ChartCard.tsx";
import type {EquipmentBreakdownItem} from "@/domain/entities/statistics.ts";

interface Props { data: EquipmentBreakdownItem[]; }
const EquipmentBreakdownsChart = ({ data }: Props) => {
    return (
        <ChartCard showEmpty={data.length === 0} title="Поломки за серійними номерами" subtitle="Деталізована інформація по обладнанню">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="text-left text-nowrap py-3 px-4 text-sm text-slate-600">Серійний номер</th>
                        <th className="text-left py-3 px-4 text-sm text-slate-600">Модель</th>
                        <th className="text-left py-3 px-4 text-sm text-slate-600">Центр</th>
                        <th className="text-left text-nowrap py-3 px-4 text-sm text-slate-600">Кількість поломок</th>
                        <th className="text-right text-nowrap py-3 px-4 text-sm text-slate-600">Середній час ремонту</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => {
                        const seconds = row.averageRepairSeconds;

                        const days = Math.floor(seconds / 86400);
                        const hours = Math.floor((seconds % 86400) / 3600);
                        const minutes = Math.floor((seconds % 3600) / 60);

                        const formatted = `${days !== 0 ? `${days} д` : ""} ${hours} год ${minutes} хв`;
                        return (
                            <tr
                                key={index}
                                className={`border-b border-slate-100 hover:bg-blue-50 transition-colors ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                                }`}
                            >
                                <td className="py-3 px-4 text-left text-nowrap text-slate-900 font-mono text-sm">{row.serialNumber}</td>
                                <td className="py-3 px-4 text-left text-nowrap text-slate-900">{row.modelName}</td>
                                <td className="py-3 px-4 text-left text-nowrap text-slate-600">{row.institutionName}</td>
                                <td className="py-3 px-4 text-left text-nowrap">{row.breakdownCount}</td>
                                <td className="py-3 px-4 text-right text-nowrap text-slate-900">{formatted}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </ChartCard>
    );
};

export default EquipmentBreakdownsChart;