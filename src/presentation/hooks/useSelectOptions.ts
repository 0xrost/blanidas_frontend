import {useMemo} from "react";

const useSelectOptions = (entities: { name: string, id:string }[]) => {
    return useMemo(() => {
        return entities.map(x => ({value: x.id, label: x.name}));
    }, [entities])
};

export { useSelectOptions };