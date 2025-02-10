import Like from '../../assets/imgs/like.svg?react'
import Comment from '../../assets/imgs/comment.svg?react'
import Translate from '../../assets/imgs/translate.svg?react'
import { useNavigate } from 'react-router-dom'
export const PostList = ({ data, isActive }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col pt-4 pb-3 gap-3"
            onClick={() => navigate(`${data.id}`)}>
            {isActive &&   /** 인기 게시판 레이아웃 */
                <div className='py-[0.3125rem] w-fit px-[0.625rem] rounded-md bg-primary-10
                text-small text-neutral-base'>
                    {data.board_type}
                </div>}
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-neutral-title text-subTitle">{data.title}</h1>
                    <h2 className="text-neutral-base">{data.content}</h2>
                </div>
                <div className='min-w-20 min-h-20'>
                    {data.thumbnailUrl && <img src={data.thumbnailUrl} alt="post image" className="w-20 h-20 bg-neutral-bg-10 border-none" />}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-[0.375rem]">
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
                <Translate className="text-neutral-title" />
            </div>
        </div>
    )
}