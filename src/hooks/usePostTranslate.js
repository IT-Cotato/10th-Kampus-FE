import { translatePost } from "@/apis/translate/translatePost.api";
import { QUERY_KEYS } from "@/constants/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const usePostTranslate = (postId) => {
    const queryClient = useQueryClient();
    const [translateState, setTranslateState] = useState(false);
    const [translatedPost, setTranslatedPost] = useState(null);
    const handleTranslate = () => {
        if (translatedPost) {
            setTranslateState(true);
        }
        else {
            postTranslate(postId);
        }
    }
    const { mutate: postTranslate, isPending: translatePending } = useMutation({
        mutationFn: async () => {
            return await translatePost({ postId: postId })
        },
        onSuccess: (translatedPost) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TRANSLATE_POST, postId] });
            setTranslateState(true);
            setTranslatedPost(translatedPost)
        }
    })
    return {
        translateState,
        setTranslateState,
        translatedPost,
        setTranslatedPost,
        translatePending,
        handleTranslate
    }
}