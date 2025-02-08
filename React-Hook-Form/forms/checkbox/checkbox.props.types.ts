type CheckboxPropType = {
    id: string;
    label: string;
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isValid?: boolean;
    error?: string;
};

export default CheckboxPropType;