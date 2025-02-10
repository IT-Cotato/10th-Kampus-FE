import Like from '../../assets/imgs/like.svg?react'
import Comment from '../../assets/imgs/comment.svg?react'
import { ScrapComponent } from '../common/ScarpComponent'
import { useNavigate } from 'react-router-dom'

export const TipsPostList = ({ data, setBoardData }) => { // 카드 뉴스 부분 데이터 요청 시, 스크랩 여부도 같이 가져와야 함 
    const navigate = useNavigate();
    return (
        <div className='flex justify-between pt-5 pb-3'
            onClick={() => navigate(`${data.id}`)}>
            <div className='flex flex-col justify-between'>
                <p className='text-subTitle text-neutral-title'>{data.title}</p>
                <div className='flex gap-[0.375rem]'>
                    <div className="flex gap-1 text-primary-red text-small items-center">
                        <Like />
                        <p>{data.likes}</p>
                    </div>
                    <div className="flex gap-1 text-primary-30 text-small items-center">
                        <Comment />
                        <p>{data.comments}</p>
                    </div>
                    <p className="text-neutral-border-50 text-small">{data.createdTime}</p>
                </div>
            </div>
            <div className='flex items-center gap-7'>
                <div className='min-w-[5.75rem] min-h-[5.75rem]'>
                    {data.thumbnailUrl && <img src={data.thumbnailUrl} alt="post image" className="w-[5.75rem] h-[5.75rem] mx-auto my-auto bg-neutral-bg-10 border-none" />}
                </div>
                <ScrapComponent state={data.scrap} setBoardData={setBoardData} id={data.id} width="1.875rem" height="1.875rem" />
            </div>
        </div>
    )
}
