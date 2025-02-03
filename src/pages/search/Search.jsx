import { SearchBar } from "@/components/search/SearchBar"
import { RecentSearch } from "@/components/search/RecentSearch";
import { useState } from "react"
import { PostList } from "@/components/board/PostList";
import { Loading } from "@/components/common/Loading";
import { StateChangeAnimate } from "@/components/common/StateChangeAnimate";
export const Search = () => {
    const [isSearch, setIsSearch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchPostList, setSearchPostList] = useState([]);
    const [isAnimate, setIsAnimate] = useState(false);
    const dummySetList = () => {
        setSearchPostList([
            {
                title: 'Title',
                content: 'content',
                like: 10,
                comment: 10,
                time: '1 day ago',
                image: null,
                board_type: 'Tips for living in Korea',
                scrap: false
            },
            {
                title: 'Title',
                content: 'content',
                like: 8,
                comment: 4,
                time: '1 day ago',
                image: null,
                board_type: 'Information',
                scrap: false
            }
        ])
    }
    const startSearch = (text) => {
        if (text.length >= 2) {  // 2글자 이상 검색
            // 이때, 검색 기록 서버에 남기기
            setIsSearch(false);
            setIsLoading(true);
            setSearchValue(text);
            setTimeout(() => {  // 서버 통신시 동기로 할 예정
                dummySetList();
                setIsLoading(false);
            }, 500)
        }
        else {
            setIsAnimate(true);
            setTimeout(() => {
                setIsAnimate(false);
            }, 1500);
        }
    }
    return (
        <div className="container flex flex-col gap-[0.875rem] pt-[0.625rem] px-4">
            {isAnimate && <StateChangeAnimate state={true} changeToTrueText={"Please enter at least 2 characters"} changeToFalseText={"Please enter at least 2 characters"} />}
            <SearchBar value={searchValue} setValue={setSearchValue}
                isSearch={isSearch} setIsSearch={setIsSearch} startSearch={startSearch} />
            {isSearch ?
                <RecentSearch startSearch={startSearch} />
                :
                isLoading ?
                    <Loading />
                    :
                    <div className="divide-y">
                        {searchPostList.map((data, index) => (
                            <PostList data={data} isActive={true} />
                        ))}
                    </div>
            }
        </div>
    )
}