import Like from '../../assets/imgs/like.svg?react'
import Comment from '../../assets/imgs/comment.svg?react'
import Translate from '../../assets/imgs/translate.svg?react'
export const PostList = ({ data }) => {
    return (
        <div className="flex flex-col w-full py-4 gap-3">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-neutral-title text-subTitle">{data.title}</h1>
                    <h2 className="text-neutral-base">{data.content}</h2>
                </div>
                <div>
                    <img src={data.image} alt="게시글 이미지" className="w-20 h-20 bg-neutral-bg-10 border-none" />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-[0.375rem]">
                    <div className="flex gap-1 text-[#EB003B] text-small items-center">
                        <Like />
                        <p>{data.like}</p>
                    </div>
                    <div className="flex gap-1 text-primary-30 text-small items-center">
                        <Comment />
                        <p>{data.like}</p>
                    </div>
                    <p className="text-neutral-border-50 text-small">{data.time}</p>
                </div>
                <Translate className="text-neutral-title" />
            </div>
        </div>
    )
}