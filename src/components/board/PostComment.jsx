import anonymous from "@/assets/imgs/anonymous.svg"
import Like from "@/assets/imgs/like.svg?react"
import FillLike from "@/assets/imgs/fillLike.svg?react"
import Comment from "@/assets/imgs/comment.svg?react"
import Translate from "@/assets/imgs/translate.svg?react"
import { formatTime } from "@/utils/formatTime"
import { useRef, useState } from "react"
import { cn } from "@/utils/cn"
export const PostComment = ({ data, focusedComment, setFocusedComment }) => {
    /*{
    "commentId": 9007199254740991,
    "commentStatus": "NORMAL",
    "author": "string",
    "content": "string",
    "likes": 9007199254740991,
    "createdTime": "2025-02-15T15:19:08.060Z"
  }*/

    const commentRef = useRef(null);
    const handleComment = (ref, commentId) => {
        ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
        setFocusedComment(commentId)
    }

    return (
        <>
            <div ref={commentRef}
                className={cn("flex flex-col gap-2 px-4 py-[0.9375rem] text-base",
                    {
                        "bg-primary-10": focusedComment === data.commentId,
                        "bg-white": focusedComment !== data.commentId
                    })}>
                <div className="flex  justify-between">
                    <div className="flex items-center gap-2">
                        <img src={anonymous} className="w-[1.375rem] h-[1.375rem]" />
                        <p>{data.author}</p>
                        <p className="text-neutral-border-50">{formatTime(data.createdTime)}</p>
                    </div>
                    <div className="flex gap-1 text-neutral-base">
                        <button className="flex gap-[0.125rem] cursor-pointer">
                            {data.isLike ?
                                <FillLike className="w-6 h-6 text-primary-red" />
                                :
                                <Like className="w-6 h-6 text-neutral-base" />
                            }
                            <p className="min-w-[.625rem]">{data.likes}</p>
                        </button>
                        <button className="flex gap-[0.125rem] cursor-pointer">
                            <Comment className="w-6 h-6" />
                            <p className="min-w-[.625rem]">{data.isReply ? data.isReply.length : 0}</p>
                        </button>
                    </div>
                </div>
                <p className="text-neutral-base leading-normal">
                    {data.content}
                </p>
                <div className="flex justify-between">
                    <div className="text-neutral-border-50"
                        onClick={() => {
                            handleComment(commentRef, data.commentId)
                        }}>
                        Reply
                    </div>
                    <Translate className="w-[1.125rem] h-[1.125rem] text-neutral-base" />
                </div>
            </div>
            {data.isReply &&
                data.isReply.map((item, index) => (
                    <ReplyComment data={item} key={index} focusedComment={focusedComment} handleComment={handleComment} />
                ))
            }
        </>
    )
}
const ReplyComment = ({ data, focusedComment, handleComment }) => {
    const commentRef = useRef(null);
    return (
        <div ref={commentRef}
            className={cn("flex flex-col gap-2 pl-[2.8125rem] pr-4 py-[0.9375rem] text-base",
                {
                    "bg-primary-10": focusedComment === data.commentId,
                    "bg-white": focusedComment !== data.commentId
                })}>
            <div className="flex  justify-between" >
                <div className="flex items-center gap-2">
                    <img src={anonymous} className="w-[1.375rem] h-[1.375rem]" />
                    <p>{data.author}</p>
                    <p className="text-neutral-border-50">{formatTime(data.createdTime)}</p>
                </div>
                <button className="flex gap-[0.125rem] cursor-pointer">
                    {data.isLike ?
                        <FillLike className="w-6 h-6 text-primary-red" />
                        :
                        <Like className="w-6 h-6 text-neutral-base" />
                    }
                    <p className="min-w-[.625rem] text-neutral-base">{data.likes}</p>
                </button>
            </div>
            <p className="text-neutral-base leading-normal">
                <span className="text-primary-base">@{data.mentions}&nbsp;</span>
                {data.content}
            </p>
            <div className="flex justify-between">
                <div className="text-neutral-border-50"
                    onClick={() => {
                        handleComment(commentRef, data.commentId)
                    }}>
                    Reply
                </div>
                <Translate className="w-[1.125rem] h-[1.125rem] text-neutral-base" />
            </div>
        </div >
    )
}