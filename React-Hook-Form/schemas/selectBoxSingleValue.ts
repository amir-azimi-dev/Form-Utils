import { mixed, object, string } from "yup";

const selectBoxSingleValueSchema = object({
    id: string().required(),
    label: string().required(),
    value: mixed<string | 0>().required()
});

export default selectBoxSingleValueSchema;