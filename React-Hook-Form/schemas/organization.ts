import { date, mixed, object, string } from "yup";
import selectBoxSingleValueSchema from "./selectBoxSingleValue";

import imageSizeValidator from "@/utils/imageSizeValidator/imageSizeValidator";
const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/x-icon"];


const organizationSchema = object({
    title: string()
        .required("پر کردن این فیلد الزامی است.")
        .min(3, "طول عبارت وارد شده باید حداقل 3 کاراکتر باشد.")
        .max(70, "طول عبارت وارد شده حداکثر می‌تواند 70 کاراکتر باشد."),

    province: selectBoxSingleValueSchema.required("پر کردن این فیلد الزامی است."),
    city: selectBoxSingleValueSchema.required("پر کردن این فیلد الزامی است."),
    foundation: date().typeError("لطفا یک تاریخ معتبر را وارد کنید.").required("پر کردن این فیلد الزامی است."),

    organizationSite: string()
        .nullable()
        .transform((value: string | null) => value ? value : null)
        .min(3, "طول عبارت وارد شده باید حداقل 3 کاراکتر باشد.")
        .max(70, "طول عبارت وارد شده حداکثر می‌تواند 70 کاراکتر باشد."),

    staffsCount: string().nullable(),

    organizationLogo: mixed()
        .nullable()
        .test("fileType",
            "فقط مجاز به آپلود تصاویر با پسوندهای png، jpeg، jpg, webp یا ico هستید.",
            value => (!value) || (value instanceof File))
        .test("fileSize",
            "حجم فایل حداکثر می‌تواند 500KB باشد.",
            value => value instanceof File ? value.size <= 1024 * 1024 * 0.5 : true)
        .test("mimeType",
            "فقط مجاز به آپلود تصاویر با پسوندهای png، jpeg، jpg, webp یا ico هستید.",
            value => value instanceof File ? allowedMimeTypes.includes(value.type) : true
        ),

    organizationImage: mixed()
        .nullable()
        .test("fileType",
            "فقط مجاز به آپلود تصاویر با پسوندهای png، jpeg، jpg یا webp هستید.",
            value => (!value) || (value instanceof File))
        .test("fileSize",
            "حجم فایل حداکثر می‌تواند 2MB باشد.",
            value => value instanceof File ? value.size <= 1024 * 1024 * 3 : true)
        .test("mimeType",
            "فقط مجاز به آپلود تصاویر با پسوندهای png، jpeg، jpg یا webp هستید.",
            value => value instanceof File ? allowedMimeTypes.includes(value.type) : true
        )
        .test("fileDemenstions",
            "ابعاد تصویر باید حداقل برابر با 1024x600 پیکسل باشد.",
            value => value instanceof File ? imageSizeValidator(value, 1024, 600) : true
        ),

    description: string()
        .required("پر کردن این فیلد الزامی است.")
        .min(40, "طول عبارت وارد شده کافی نیست. لطفا توضیحات بیشتری اضافه نمایید.")
});

export const initialValues = {
    title: "",
    province: null,
    city: null,
    foundation: "",
    organizationSite: "",
    staffsCount: "",
    organizationLogo: "",
    organizationImage: "",
    description: ""
}

export default organizationSchema;