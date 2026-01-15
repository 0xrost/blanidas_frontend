import ChartCard from "@/presentation/components/tabs/statistics/charts/ChartCard.tsx";
import type {CategoricalChartDataItem} from "@/domain/entities/statistics.ts";

interface Props { data: CategoricalChartDataItem[]; }
const UsedSparePartsChart = ({ data }: Props) => {
    return (
        <ChartCard showEmpty={data.length === 0} title="Найчастіше використовувані запчастини" subtitle="Топ за використанням">
           <div className="overflow-x-auto">
               <table className="w-full">
                   <thead className="bg-slate-50 border-b border-slate-200">
                   <tr>
                       <th className="text-left py-3 px-4 text-sm text-slate-600">Модель</th>
                       <th className="text-left py-3 px-4 text-sm text-slate-600">Використано</th>
                   </tr>
                   </thead>
                   <tbody>
                   {data.map((row, index) => {
                       return (
                           <tr
                               key={index}
                               className={`border-b border-slate-100 hover:bg-blue-50 transition-colors ${
                                   index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                               }`}
                           >
                               <td className="py-3 px-4 text-slate-900 font-mono text-nowrap text-sm">{row.label}</td>
                               <td className="py-3 px-4 text-slate-900">{row.value}</td>
                           </tr>
                       );
                   })}
                   </tbody>
               </table>
           </div>
        </ChartCard>
    );
};

export default UsedSparePartsChart;