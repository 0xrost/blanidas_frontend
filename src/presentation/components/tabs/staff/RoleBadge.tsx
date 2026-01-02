import type { Role } from "@/domain/auth/roles.ts";
import { Badge } from "@/presentation/components/ui/badge.tsx";
import { type LucideIcon, Shield, Wrench } from "lucide-react";

interface BadgeSchema {
    text: string;
    icon: LucideIcon;
    styles: string;
}

const schemes: Record<Role, BadgeSchema> = {
    engineer: {
        text: "Інженер",
        icon: Wrench,
        styles: "bg-blue-100 text-blue-700 border-blue-200",
    },
    manager: {
        text: "Менеджер",
        icon: Shield,
        styles: "bg-purple-100 text-purple-700 border-purple-200",
    },
};

interface RoleBadgeProps {
    role: Role;
}

const RoleBadge = ({ role }: RoleBadgeProps) => {
    const scheme = schemes[role];

    if (!scheme) return null; 

    const { icon: Icon, text, styles } = scheme;

    return (
        <Badge className={styles}>
            <Icon className="w-3 h-3 mr-1" />
            {text}
        </Badge>
    );
};

export default RoleBadge;
