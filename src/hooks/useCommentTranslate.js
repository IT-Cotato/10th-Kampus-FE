import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { translateText } from "@/apis/translate/translateText.api";
import { QUERY_KEYS } from "@/constants/api";

export const useCommentTranslate = (commentId) => {
    const [translateState, setTranslateState] = useState(false);
    const [translatedContent, setTranslatedContent] = useState(null);
    const queryClient = useQueryClient();
    const { mutate: commentTranslate, isPending: translatePending } = useMutation({
        mutationFn: async (content) => {
            return await translateText({ content });
        },
        onSuccess: (translatedContent) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TRANSLATE_TEXT, commentId] });
            setTranslateState(true);
            setTranslatedContent(translatedContent.content);
        },
    });

    const handleTranslate = (content) => {
        if (translatedContent) {
            setTranslateState(true);
        } else {
            commentTranslate(content);
        }
    };

    return {
        translateState,
        setTranslateState,
        translatedContent,
        setTranslatedContent,
        translatePending,
        handleTranslate,
    };
};
