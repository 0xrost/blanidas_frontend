import { useState } from "react";

export const useNumericInput = (initial: number = 0) => {
    const [raw, setRaw] = useState(String(initial));

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRaw(value);
    };

    const onBlur = () => {
        const normalized = value === 0 && raw === '' ? '0' : String(Math.max(0, +raw));
        setRaw(isNaN(+raw) || raw === '' ? '0' : normalized);
    };

    const reset = (val: number = initial) => setRaw(String(val));

    const value = raw === '' || isNaN(+raw) ? 0 : Math.max(0, +raw);

    return { inputProps: { value: raw, onChange, onBlur }, value, reset };
};

export interface NumericInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

export interface NumericInputResult {
    inputProps: NumericInputProps;
    value: number;
    reset: (val?: number) => void;
}