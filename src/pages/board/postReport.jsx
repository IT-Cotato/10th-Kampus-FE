import { Report } from "@/components/common/Report";
export const PostReport = () => {
    const headerTitle = "Report"
    const pageTitle = "Why are you reporting this post?"
    const contentTitle = "Help us understand the problem.\nYour report is anonymous. "
    const reasons = [
        { id: 0, text: 'Bullying or unwanted contact' },
        { id: 1, text: 'Violence, hate or exploitation' },
        { id: 2, text: 'Self-harm or suicide' },
        { id: 3, text: 'Distribution of porn or sexual activities' },
        { id: 4, text: 'Pretending to be me or someone else' },
        { id: 5, text: 'Selling or promoting restricted items' },
        { id: 6, text: 'False information, Scam or spam' },
        { id: 7, text: 'Post that do not match the board' },
        { id: 8, text: 'Others' },
    ];
    const radioPlaceHolder = "Please leave reasons why you are reporting this post."
    const handleSubmit = () => { }
    const popupTitle = "Are you sure you want to report this?"
    const popupText = "The reported content will be reviewed and handled by the Kampus administrators."
    const popupLeftText = "Cancel"
    const popupRightText = "Report"
    const ButtonText = "Report"
    return (
        <Report
            headerTitle={headerTitle}
            pageTitle={pageTitle}
            contentTitle={contentTitle}
            reasons={reasons}
            radioPlaceHolder={radioPlaceHolder}
            handleSubmit={handleSubmit}
            popupTitle={popupTitle}
            popupText={popupText}
            popupLeftText={popupLeftText}
            popupRightText={popupRightText}
            ButtonText={ButtonText} />
    )
};
