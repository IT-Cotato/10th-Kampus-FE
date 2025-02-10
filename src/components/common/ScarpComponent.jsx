import activeScrap from "@/assets/imgs/activeScrap.svg"
import scrap from "@/assets/imgs/scrap.svg"
import { useState } from "react";
import { StateChangeAnimate, startAnimation } from "./StateChangeAnimate";
import { useParams } from "react-router-dom";
export const ScrapComponent = ({ state, width, height, setBoardData, id = undefined }) => {
    const { postId } = useParams();
    const actualId = postId || id; // 카드뉴스면 전달받은 id, 게시글이면 파라미터에 있는 postId
    const [selectScrapState, setSelectScrapState] = useState(state); // 선택한 스크랩의 상태
    const [scrapAni, setScrapAni] = useState(false); // 스크랩 애니메이션 상태

    const handleScrap = () => {
        setBoardData((prev) => {
            if (postId) {   // 게시글 
                setSelectScrapState(prev.scrap);
                return { ...prev, scrap: !prev.scrap }
            }
            else {
                const updatedPost = prev.post.map((post) => {   // 카드 뉴스
                    if (post.id === actualId) {
                        setSelectScrapState(post.scrap);
                        return { ...post, scrap: !post.scrap };
                    }
                    return post;
                });
                return { ...prev, post: updatedPost }; // 업데이트한 데이터 리턴
            }
        })
        startAnimation(setScrapAni); // 스크랩 애니메이션 시작
    };
    return (
        <div>
            {scrapAni && (
                <StateChangeAnimate
                    state={selectScrapState}
                    changeToTrueText={'Add to scrap'}
                    changeToFalseText={'Remove from Scrap'}
                />
            )}
            {state   // currentColor로 색이 안바뀜
                ?
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleScrap()
                    }}>
                    <img src={activeScrap} alt="Bookmarked" className="cursor-pointer"
                        style={{ width: `${width}`, height: `${height}` }} />
                </button>
                :
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleScrap()
                    }}>
                    <img src={scrap} alt="Bookmark" className="cursor-pointer"
                        style={{ width: `${width}`, height: `${height}` }} />
                </button>
            }
        </div>
    )
}