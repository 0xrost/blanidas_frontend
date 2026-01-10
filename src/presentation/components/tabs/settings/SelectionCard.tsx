import {Card} from "@/presentation/components/ui/card.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {AlertTriangle, Building2, Factory, Layers, type LucideIcon, Monitor, Tag, Truck, User2} from "lucide-react";
import type {Tab} from "@/presentation/components/tabs/settings/SettingsTab.tsx";
import {useEffect, useRef} from "react";

const selectionCardConfig = {
    tabs: [
        { id: 'staff', title: 'Працівники', icon: User2 },
        { id: 'institutions', title: 'Заклади', icon: Building2 },
        { id: 'sparePartCategories', title: 'Категорії запчастин', icon: Tag },
        { id: 'equipmentModels', title: 'Моделі обладнання', icon: Monitor },
        { id: 'failureTypes', title: 'Типи поломок', icon: AlertTriangle },
        { id: 'institutionTypes', title: 'Типи закладів', icon: Building2 },
        { id: 'equipmentCategories', title: 'Категорії обладнання', icon: Layers },
        { id: 'manufacturers', title: 'Виробники', icon: Factory },
        { id: 'suppliers', title: 'Постачальники', icon: Truck },
    ] as TabConfig[]
};

interface TabConfig {
    id: Tab;
    title: string;
    icon: LucideIcon;
}

interface SelectionConfig { tabs: TabConfig[] }

interface Props {
    currentTabId: string;
    setCurrentTabId: (id: Tab) => void;
    selectionConfig: SelectionConfig;
}

const SelectionCard = ({ currentTabId, setCurrentTabId, selectionConfig }: Props) => {
    const targetRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [currentTabId, selectionConfig]);

    if (selectionConfig.tabs.length === 0) return;

    return (
        <Card className="bg-white border-slate-200">
            <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                    {selectionConfig.tabs.map(({ id, title, icon: Icon }) => {
                        const isActive = currentTabId === id;
                        const buttonClass = isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'border-slate-300';

                        return (
                            <Button
                                key={id}
                                ref={isActive ? targetRef : null}
                                variant={isActive ? 'default' : 'outline'}
                                onClick={() => setCurrentTabId(id)}
                                className={`shrink-0 ${buttonClass}`}
                                role="tab"
                                aria-selected={isActive}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {title}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
};

export default SelectionCard;
export { selectionCardConfig };