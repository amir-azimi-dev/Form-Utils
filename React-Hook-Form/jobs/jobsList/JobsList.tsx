"use client";

import { MouseEventHandler } from "react";
import Link from "next/link";
import SectionContainer from "@/components/modules/admin-panel/section-container/SectionContainer";
import { swal, removeSwal } from "@/utils/swal/sweetalert";
import sanitize from "@/utils/sanitize/sanitize";

function JobsList() {
    const showOtherInfo: MouseEventHandler<HTMLButtonElement> = () => {
        swal({
            title: `سایر اطلاعات «${"عنوان آگهی"}»:`,
            html: (
                <>
                    <p className="font-kalame-semibold">
                        سابقه کار:
                        <span className="font-kalame"> بدون محدودیت سابقه کار</span>
                    </p>
                    <p className="font-kalame-semibold">
                        حقوق ماهانه:
                        <span className="font-kalame"> حقوق ماهانه</span>
                    </p>
                    <p className="font-kalame-semibold">
                        جنسیت:
                        <span className="font-kalame"> مهم نیست</span>
                    </p>
                    <p className="font-kalame-semibold">
                        مهارت‌های مورد نیاز:
                        <span className="font-kalame"> HTML، CSS، ...</span>
                    </p>

                    <div className="mt-4">
                        <p className="font-kalame-semibold">توضیحات:</p>
                        <div className="p-4 border rounded-lg">
                            {sanitize(`<h2 class="mb-5 font-kalame-bold text-2xl">لیست مشاغل</h2>`)}
                        </div>
                    </div>
                </>
            ),
        });
    };

    const removeJobHandler: MouseEventHandler<HTMLButtonElement> = async () => {
        const { isDismissed } = await removeSwal({
            title: `از حذف آگهی شغلی «${"عنوان آگهی"}» اطمینان دارید؟`
        });

        if (isDismissed) {
            return;
        }
    };

    return (
        <SectionContainer title="لیست مشاغل">
            <div className="w-full overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>عنوان</th>
                            <th>دسته‌بندی</th>
                            <th>سازمان مربوطه</th>
                            <th>نوع قرارداد</th>
                            <th>حقوق ماهیانه</th>
                            <th>سایر اطلاعات</th>
                            <th>تاریخ ایجاد</th>
                            <th>آخرین تغییر</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>2</th>
                            <th>عنوان شغل</th>
                            <th>توسعه‌ی نرم‌افزار و برنامه نویسی</th>
                            <th>نام سازمان مربوطه</th>
                            <th>دورکاری</th>
                            <th>توافقی</th>
                            <th>
                                <button onClick={showOtherInfo} className="px-3 py-1.5 bg-stone-600 rounded text-stone-50 text-xs transition-colors hover:bg-stone-700">مشاهده</button>
                            </th>
                            <th>1403/11/11</th>
                            <th>1403/11/11</th>
                            <th>
                                <div className="flex gap-x-1">
                                    <Link
                                        href="/admin-panel/jobs/id"
                                        className="px-3 py-1.5 bg-blue-600 rounded text-stone-50 text-xs transition-colors hover:bg-blue-700"
                                    >
                                        ویرایش
                                    </Link>
                                    <button onClick={removeJobHandler} className="px-3 py-1.5 bg-red-600 rounded text-stone-50 text-xs transition-colors hover:bg-red-700">حذف</button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </SectionContainer>
    )
}

export default JobsList