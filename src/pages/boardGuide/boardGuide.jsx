import { TitleHeader } from "@/components/common/titleHeader"
import { kampusGuide } from "@/constants/kampusGuide"

export const BoardGuide = () => {
    const emojiList = ["📝", "🗣️", "❓", "ℹ️", "🔥", "🇰🇷", "🏠", "💼", "💬", "🎉"];
    let isChatSection = false;
    let firstLineAfterChat = true;
    return (
        <div className="flex flex-col w-full h-full">
            <TitleHeader text="Notice" />
            <div className="w-full h-full px-4 pb-20 text-base text-neutral-80 leading-normal">
                {kampusGuide.split("\n").map((line, index) => {
                    const isEmojiLine = emojiList.some((emoji) => line.startsWith(emoji));
                    if (line.trim() === "") return (<br key={index} />)
                    if (isEmojiLine) {
                        isChatSection = line.startsWith("💬");
                        firstLineAfterChat = true; // 'Chat' 이후 첫 줄은 가운데 점 X
                        return <p key={index} className="mt-2 font-semibold">{line}</p>;
                    }
                    // 'Chat' 이후 첫 번째 줄은 가운데 점 X
                    if (isChatSection && firstLineAfterChat) {
                        firstLineAfterChat = false; // 첫 줄 이후
                        return <p key={index} className="pl-2">{line}</p>;
                    }

                    return <p key={index} className="pl-4 before:content-['•'] before:mr-2">{line}</p>; // 리스트 형식 적용
                })}
            </div>
        </div>
    );
};
