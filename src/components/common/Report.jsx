import { InputRadio } from '@/components/common/inputRadio';
import { MainButton } from '@/components/common/MainButton';
import { Popup } from '@/components/common/popup';
import { TitleHeader } from '@/components/common/titleHeader';
import { path } from '@/routes/path';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

export const Report = ({
    headerTitle,
    pageTitle,
    contentTitle,
    reasons,
    radioPlaceHolder,
    handleSubmit,
    popupTitle,
    popupText,
    popupLeftText,
    popupRightText,
    ButtonText
}) => {

    const [selected, setSelected] = useState('');
    const [additionalText, setAdditionalText] = useState('');
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex h-full w-full flex-col text-neutral-title">
            <TitleHeader text={headerTitle} />
            <div className="flex h-full w-full flex-col px-4 py-[1.875rem]">
                <div className="text-subTitle whitespace-pre-line">
                    {pageTitle}
                </div>
                <div className="mt-[1.875rem] text-neutral-base whitespace-pre-line">
                    {contentTitle}
                </div>
                <div className={cn("mb-[1.875rem] flex flex-col",
                    {
                        "text- base": headerTitle === 'Report',
                        "text-subTitle": headerTitle !== 'Report'
                    })}>
                    {reasons.map((item) => (
                        <InputRadio
                            item={item}
                            name="reasonLeaving"
                            selected={selected}
                            setSelected={setSelected}
                            placeholder={radioPlaceHolder}
                            key={item.id}
                            setAdditionalText={setAdditionalText}
                        />
                    ))}
                </div>
                <MainButton
                    disabled={
                        !selected ||
                        !(
                            (selected === 'Other' && additionalText !== '') ||
                            selected !== 'Other'
                        )
                    }
                    onClick={() => setShowModal(true)}
                >
                    {ButtonText}
                </MainButton>
                {showModal &&
                    createPortal(
                        <Popup
                            title={popupTitle}
                            text={popupText}
                            onClickLeft={headerTitle !== 'Report' ? handleSubmit : () => setShowModal(false)}
                            leftButton={popupLeftText}
                            onClickRight={headerTitle !== 'Report' ? () => setShowModal(false) : handleSubmit}
                            rightButton={popupRightText}
                        />,
                        document.getElementById('modal-root'),
                    )}
            </div>
        </div >
    );
};
