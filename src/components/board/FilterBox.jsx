import { useState } from "react"
import { DropBox } from "../common/DropBox"
import { Categories } from "@/constants/categories"
export const FilterBox = () => {
    const [category, setCategory] = useState("All")  // 선택된 카테고리 값
    const [sortOrder, setSortOrder] = useState("All")  // 선택된 정렬 기준 값
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)
    const categoriesWithAll = ["All", ...Categories];
    const sortOptions = ["All", "Newest", "Registered", "Popularity"];
    const toggleCategory_Sort = (type) => { // 카테고리랑 정렬 토글
        if (type === "category") {
            setIsCategoryOpen(!isCategoryOpen);
            setIsSortOpen(false);
        } else {
            setIsSortOpen(!isSortOpen);
            setIsCategoryOpen(false);
        }
    };
    // 선택된 값 업데이트
    const handleCategorySelect = (selected) => {
        setCategory(selected);
        setIsCategoryOpen(false);
    };

    const handleSortSelect = (selected) => {
        setSortOrder(selected);
        setIsSortOpen(false);
    };
    return (
        <div className="flex gap-[0.875rem]">
            <DropBox dropList={categoriesWithAll} state={isCategoryOpen} content={'Category'} toggle={() => toggleCategory_Sort("category")} select={handleCategorySelect} selected={category} />
            <DropBox dropList={sortOptions} state={isSortOpen} content={'Sort by'} toggle={() => toggleCategory_Sort("sortOrder")} select={handleSortSelect} selected={sortOrder} />
        </div>
    )
}