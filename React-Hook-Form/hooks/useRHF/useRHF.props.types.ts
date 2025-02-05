import { ObjectSchema } from "yup";

type UseRHFPropType<T extends Record<string, any>> = {
    schema: ObjectSchema<T>;
    initialValues?: any;
};

export default UseRHFPropType;