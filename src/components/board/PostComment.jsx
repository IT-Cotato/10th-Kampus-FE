import anonymous from "@/assets/imgs/anonymous.svg"
import Like from "@/assets/imgs/like.svg?react"
import FillLike from "@/assets/imgs/fillLike.svg?react"
import Comment from "@/assets/imgs/comment.svg?react"
import Translate from "@/assets/imgs/translate.svg?react"
import { formatTime } from "@/utils/formatTime"
import { useRef, useState } from "react"
import { cn } from "@/utils/cn"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { translateText } from "@/apis/translate/translateText.api"
import { QUERY_KEYS } from "@/constants/api"
import { TranslateButton } from "../common/TranslateButton"
import { Translating } from "../common/Translating"
import { useCommentTranslate } from "@/hooks/use-CommentTranslate"
export const PostComment = ({ data, setInputFocus, focusedComment, setFocusedComment, handleCommentLike }) => {
    const commentRef = useRef(null);
    const {
        translateState,
        setTranslateState,
        translatedContent,
        translatePending,
        handleTranslate
    } = useCommentTranslate(data.commentId)
    const handleComment = (ref, commentId, parentId) => {
        ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
        setFocusedComment({
            parentId: parentId,
            targetId: commentId
        })
        setInputFocus(true)
    }
    return (
        <>
            <div ref={commentRef}
                className={cn("flex flex-col gap-2 px-4 py-[0.9375rem] text-base",
                    {
                        "bg-primary-10": focusedComment?.targetId === data.commentId,
                        "bg-white": focusedComment?.targetId !== data.commentId
                    })}>
                <div className="flex  justify-between">
                    <div className="flex items-center gap-2">
                        <img src={anonymous} className="w-[1.375rem] h-[1.375rem]" />
                        <p>{data.author === "Author" ? <span className="text-[#2768FF]">Anonimity(Author)</span> : data.author}</p>
                        <p className="text-neutral-border-50">{formatTime(data.createdTime)}</p>
                    </div>
                    <div className="flex gap-1 text-neutral-base">
                        <button className="flex gap-[0.125rem] cursor-pointer"
                            onClick={() => handleCommentLike({ type: data.isLiked, commentId: data.commentId })}>
                            {data.isLiked ?
                                <FillLike className="w-6 h-6 text-primary-red" />
                                :
                                <Like className="w-6 h-6 text-neutral-base" />
                            }
                            <p className="min-w-[.625rem]">{data.likes}</p>
                        </button>
                        <button className="flex gap-[0.125rem] cursor-pointer">
                            <Comment className="w-6 h-6" />
                            <p className="min-w-[.625rem]">{data.replies ? data.replies.length : 0}</p>
                        </button>
                    </div>
                </div>
                <p className="relative text-neutral-base leading-normal whitespace-pre-line">
                    <span
                        className={cn({
                            'opacity-0': translatePending,
                        })}
                    >
                        {translateState ? translatedContent : data?.content}
                    </span>
                    {translatePending && (
                        <div className="absolute left-0 -translate-y-1/2 top-1/2">
                            <Translating width={'1.75rem'} height={'1.75rem'} />
                        </div>
                    )}
                </p>
                <div className="flex justify-between">
                    <div className="text-neutral-border-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleComment(commentRef, data.commentId, data.commentId)
                        }}>
                        Reply
                    </div>
                    <TranslateButton size="small" color="base" state={translateState} setState={setTranslateState}
                        handleTranslate={() => handleTranslate(data.content)} />
                </div>

            </div>
            {data.replies &&
                data.replies.map((item, index) => (
                    <ReplyComment reply={data.author} data={item} key={index} focusedComment={focusedComment} handleComment={handleComment}
                        handleCommentLike={handleCommentLike} />
                ))
            }
        </>
    )
}
const ReplyComment = ({ reply, data, focusedComment, handleComment, handleCommentLike }) => {
    const commentRef = useRef(null);
    const {
        translateState,
        setTranslateState,
        translatedContent,
        translatePending,
        handleTranslate
    } = useCommentTranslate(data.commentId)
    return (
        <div ref={commentRef}
            className={cn("flex flex-col gap-2 pl-[2.8125rem] pr-4 py-[0.9375rem] text-base",
                {
                    "bg-primary-10": focusedComment?.targetId === data.commentId,
                    "bg-white": focusedComment?.targetId !== data.commentId
                })}>
            <div className="flex  justify-between" >
                <div className="flex items-center gap-2">
                    <img src={anonymous} className="w-[1.375rem] h-[1.375rem]" />
                    <p>{data.author === "Author" ? <span className="text-[#2768FF]">Anonimity(Author)</span> : data.author}</p>
                    <p className="text-neutral-border-50">{formatTime(data.createdTime)}</p>
                </div>
                <button className="flex gap-[0.125rem] cursor-pointer"
                    onClick={() => handleCommentLike({ type: data.isLiked, commentId: data.commentId })}>
                    {data.isLiked ?
                        <FillLike className="w-6 h-6 text-primary-red" />
                        :
                        <Like className="w-6 h-6 text-neutral-base" />
                    }
                    <p className="min-w-[.625rem] text-neutral-base">{data.likes}</p>
                </button>
            </div>
            <p className="relative text-neutral-base leading-normal whitespace-pre-line">
                <span
                    className={cn({
                        'opacity-0': translatePending,
                    })}
                >
                    <span className="text-primary-base">
                        @{reply === "Author" ? "Anontmity(Author)" : reply}&nbsp;
                    </span>
                    {translateState ? translatedContent : data?.content}
                </span>
                {translatePending && (
                    <div className="absolute left-0 -translate-y-1/2 top-1/2">
                        <Translating width={'1.75rem'} height={'1.75rem'} />
                    </div>
                )}
            </p>
            <div className="flex justify-between">
                <div className="text-neutral-border-50"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleComment(commentRef, data.commentId, data.parentId)
                    }}>
                    Reply
                </div>
                <TranslateButton size="small" color="base" state={translateState} setState={setTranslateState}
                    handleTranslate={() => handleTranslate(data.content)} />
            </div>
        </div >
    )
}