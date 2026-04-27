import type { Role } from "@/domain/auth/roles.ts";
import { Badge } from "@/presentation/components/ui/badge.tsx";
import { type LucideIcon, Shield, ShieldCheck, Wrench } from "lucide-react";



interface RoleBadgeProps {
    role: Role;
}

const RoleBadge = ({ role }: RoleBadgeProps) => {
    const scheme = schemes[role];

    if (!scheme) return null; 

    const { icon: Icon, styles } = scheme;

    return (
        <Badge className={`p-1 rounded-lg ${styles}`}>
            <Icon size={16} />
        </Badge>
    );
};

export default RoleBadge;
export { schemes as roleBadgeSchemes };
