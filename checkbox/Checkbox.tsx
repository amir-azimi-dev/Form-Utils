import CheckboxPropType from "./checkbox.props.types";

function Checkbox({ id, label, checked }: CheckboxPropType) {
    return (
        <div className="flex items-center gap-x-1.5">
            <label htmlFor={id} className="text-nowrap cursor-pointer">{label}</label>
            <input
                id={id}
                type="checkbox"
                className="cursor-pointer accent-green-600 size-4"
                checked={checked}
            />
        </div>
    )
}

export default Checkbox;