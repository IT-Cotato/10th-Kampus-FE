import { useState } from 'react';
import XIcon from '@/assets/imgs/x.svg?react';
import { SearchDropdown } from '@/components/join/searchDropdown';
import University from '@/constants/university';
import { useNavigate } from 'react-router-dom';
import { ButtonRound } from '@/components/common/ButtonRound';
import { MainButton } from '@/components/common/MainButton';

export const CreateBoard = () => {
  const [boardType, setBoardType] = useState('generalboard');

  const UniversityList = University;
  const [university, setUniversity] = useState('');
  const [isUniversitySelected, setIsUniversitySelected] = useState(false);
  const navigate = useNavigate();

  const [isCategoryChecked, setIsCategoryChecked] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && categoryValue.trim() !== '') {
      setCategoryList((prev) => [...prev, categoryValue]);
      setCategoryValue('');
    }
  };

  const removeItem = (index) => {
    const updatedList = [...categoryList];
    updatedList.splice(index, 1);
    setCategoryList(updatedList);
  };

  const handleCreateBoard = () => {
    // 백 연동
    console.log(boardType);
    if (boardType === 'schoolboard') {
      console.log(university);
    }
    console.log(title);
    console.log(content);
    if (isCategoryChecked) {
      console.log(categoryList);
    }

    navigate(-1);
  };

  const disabled =
    !title ||
    !content ||
    (boardType === 'schoolboard' && !isUniversitySelected) ||
    (isCategoryChecked && categoryList.length === 0);

  return (
    <div className="flex flex-col flex-1 gap-5 px-5">
      <div className="flex flex-col h-full gap-5 p-8 bg-white rounded-2xl">
        <div className="flex h-10 gap-5">
          <div className="flex items-center gap-2 text-subTitle">
            <input
              id="generalboard"
              type="radio"
              value="generalboard"
              name="boardType"
              className="w-5 h-5 cursor-pointer"
              onChange={(e) => setBoardType(e.target.value)}
              checked={boardType === 'generalboard'}
            />
            <label htmlFor="generalboard" className="cursor-pointer">
              일반 게시판
            </label>
          </div>
          <div className="flex items-center gap-2 text-subTitle">
            <input
              id="schoolboard"
              type="radio"
              value="schoolboard"
              name="boardType"
              className="w-5 h-5 cursor-pointer"
              onChange={(e) => setBoardType(e.target.value)}
              checked={boardType === 'schoolboard'}
            />
            <label htmlFor="schoolboard" className="cursor-pointer">
              학교 게시판
            </label>
          </div>
          <div className="flex">
            {boardType === 'schoolboard' && (
              <SearchDropdown
                keyword={university}
                name="Language"
                placeholder="학교 이름"
                onChange={(value) => setUniversity(value)}
                setIsSelected={setIsUniversitySelected}
                selected={isUniversitySelected}
                list={UniversityList}
                warn="게시판을 추가할 학교를 선택하세요."
                label={false}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-subTitle">
          {/* 카테고리 추가 여부 체크 */}
          <div className="flex items-center gap-2">
            <input
              id="addCategory"
              type="checkbox"
              className="w-5 h-5 cursor-pointer"
              onChange={() => setIsCategoryChecked(!isCategoryChecked)}
              checked={isCategoryChecked}
            />
            <label htmlFor="addCategory" className="flex cursor-pointer">
              카테고리 추가
            </label>
          </div>
          {/* 카테고리 입력칸 */}
          {isCategoryChecked && (
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                placeholder="카테고리 입력"
                className="box-border w-32 px-4 border rounded-3xl border-neutral-border-40 placeholder:text-center placeholder:text-base"
                onKeyDown={handleKeyDown}
              />
              {categoryList.map((category, index) => (
                <div
                  key={index}
                  className="box-border flex items-center justify-center flex-shrink-0 gap-2 pl-4 pr-3 border cursor-pointer rounded-3xl border-primary-30 bg-primary-5"
                  onClick={() => removeItem(index)}
                >
                  {category}
                  <XIcon className="flex flex-shrink-0 w-3 h-3 cursor-pointer text-neutral-border-50" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5 max-w-[31.25rem]">
          <input
            type="text"
            className="px-2 py-1 border rounded-md border-neutral-border-40"
            placeholder="게시판명을 적어주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="px-2 py-1 border rounded-md border-neutral-border-40"
            placeholder="게시판 설명을 간단하게 적어주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <MainButton disabled={disabled} onClick={handleCreateBoard}>
            게시판 생성
          </MainButton>
        </div>
      </div>
    </div>
  );
};
