import {useState} from "react";

const useValuesByKey = <T extends object>(initial: T) => {
    const [values, setValues] = useState<T>(initial);

    const onValueChange = <Key extends keyof T>(key: Key, value: T[Key]) => {
        setValues(prev => ({...prev, [key]: value}));
    }

    return [values, onValueChange] as const;
}

export { useValuesByKey };