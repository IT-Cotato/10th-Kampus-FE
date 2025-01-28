import Like from '../../assets/imgs/like.svg?react'
import Comment from '../../assets/imgs/comment.svg?react'
import Scrap from '../../assets/imgs/scrap.svg?react'
import ActiveScrap from '../../assets/imgs/activeScrap.svg?react'
import { useState } from 'react'
import { cn } from '@/utils/cn'
export const TipsPostList = ({ data }) => { // 카드 뉴스 부분 데이터 요청 시, 스크랩 여부도 같이 가져와야 함 
    const [isScrap, setIsScrap] = useState(false);
    const handleScrap = () => {
        setIsScrap(!isScrap);
        // 이 부분에서 스크랩 시 서버와 통신해서 최신화 해야함  
    }
    return (
        <div className='flex justify-between pt-5 pb-3'>
            <div className='flex flex-col justify-between'>
                <p className='text-subTitle text-neutral-title'>{data.title}</p>
                <div className='flex gap-[0.375rem]'>
                    <div className="flex gap-1 text-primary-red text-small items-center">
                        <Like />
                        <p>{data.like}</p>
                    </div>
                    <div className="flex gap-1 text-primary-30 text-small items-center">
                        <Comment />
                        <p>{data.like}</p>
                    </div>
                    <p className="text-neutral-border-50 text-small">{data.time}</p>
                </div>
            </div>
            <div className='flex items-center gap-7'>
                <div className='min-w-[5.75rem] min-h-[5.75rem]'>
                    {data.image && <img src={data.image} alt="post image" className="w-[5.75rem] h-[5.75rem] mx-auto my-auto bg-neutral-bg-10 border-none" />}
                </div>
                {isScrap    // currentColor로 색이 안바뀜
                    ? <ActiveScrap className='w-[1.875rem] h-[1.875rem]' onClick={handleScrap} />
                    : <Scrap className='w-[1.875rem] h-[1.875rem]' onClick={handleScrap} />
                }
            </div>
        </div>
    )
}
