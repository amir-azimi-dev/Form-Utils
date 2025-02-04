import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import Input from "@/components/modules/forms/input/Input";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function RequiredSkills() {
    const [skillTitle, setSkillTitle] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);

    const changeInputValue: ChangeEventHandler<HTMLInputElement> = event => setSkillTitle(event.target.value);

    const addSkill: MouseEventHandler<HTMLButtonElement> = () => {
        if (!skillTitle) {
            return;
        }

        setSkills(prevState => [...prevState, skillTitle]);
        setSkillTitle("");
    };

    const removeSkill = (skillIndex: number) => {
        const filteredSkills = skills.filter(skill => skill !== skills[skillIndex]);
        setSkills(filteredSkills);
    };

    return (
        <section className="my-4">
            <h3 className="mb-3 font-kalame-semibold">مهارت‌های مورد نیاز</h3>
            <div className="max-w-96 flex items-center gap-x-1">
                <Input type="text" id="skill" label="عنوان مهارت" value={skillTitle} onChange={changeInputValue} />
                <button
                    type="button"
                    onClick={addSkill}
                    className="h-9 flex-center bg-blue-500 rounded text-stone-50 transition-colors hover:bg-blue-600 aspect-square shrink-0"
                >
                    <FaPlus />
                </button>
            </div>

            <div className="flex gap-x-2 mt-3">
                {skills.map((skillTitle, index) => (
                    <div key={index} className="flex items-center gap-x-2 px-3 py-1.5 bg-sky-200 rounded text-sm">
                        <span>{skillTitle}</span>
                        <FaX onClick={() => removeSkill(index)} className="transition-colors cursor-pointer hover:text-red-500" />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RequiredSkills