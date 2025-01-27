import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Prev from '../../assets/imgs/previous.svg?react';
import Search from '../../assets/imgs/search.svg?react';
import Menubar from '../../assets/imgs/menubar.svg?react';
import Scrap from '../../assets/imgs/scrap.svg?react';
import { PostList } from "@/components/board/PostList";
import { DropBox } from "@/components/common/DropBox";
export const Board = () => {
    const navigate = useNavigate();
    const { boardTitle } = useParams(); // 서버와 통신 시, 파라미터에 따라 데이터 가져오기
    const [boardData, setBoardData] = useState({
        board_title: "Tips for living in Korea",
        post: [
            {
                title: 'Title',
                content: 'content',
                like: 10,
                comment: 10,
                time: '1 day ago',
                image: null
            },
            {
                title: 'Title',
                content: 'content',
                like: 10,
                comment: 10,
                time: '1 day ago',
                image: null
            }
        ]
    })
    const [category, setCategory] = useState("All"); // 선택된 카테고리 값
    const [sortOrder, setSortOrder] = useState("All"); // 선택된 정렬 기준 값
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const categories = ["All", "Hospital", "University", "Restaurant"];
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
        <div className="w-full h-full flex flex-col">
            <div className="w-full py-4 bg-white px-4 flex justify-between items-center"
                style={{ borderBottom: "0.5px solid #D8D8D8" }}>
                <Prev className="w-5 h-5 cursor-pointer" onClick={() => navigate('../')} />
                <p className="text-subTitle text-neutral-title font-medium">{boardData.board_title}</p>
                <div className="flex gap-6 items-center">
                    <Search className="text-neutral-title w-6 h-6 cursor-pointer" />
                    <Menubar className="text-neutral-title w-1 h-5 cursor-pointer" />
                </div>
            </div>
            <div className="flex flex-col px-4 py-3 w-full bg-white gap-[0.875rem]">
                <div className="flex w-full justify-center items-center bg-neutral-bg-10 rounded-[0.625rem]
                text-subTitle font-normal py-3 text-[#6A6A6A] cursor-pointer">
                    Notice
                </div>
                <div className="flex gap-[0.875rem]">
                    <DropBox dropList={categories} state={isCategoryOpen} content={'Category'} toggle={() => toggleCategory_Sort("category")} select={handleCategorySelect} selected={category} />
                    <DropBox dropList={sortOptions} state={isSortOpen} content={'Sort by'} toggle={() => toggleCategory_Sort("sortOrder")} select={handleSortSelect} selected={sortOrder} />
                </div>
            </div>
            <div className="flex flex-col flex-1 w-full bg-white px-4 divide-y">
                <PostList data={boardData.post[0]} />
                <PostList data={boardData.post[1]} />
            </div>
        </div>
    )
}