import { useEffect, useState } from 'react';
import XIcon from '@/assets/imgs/x.svg?react';
import { SearchDropdown } from '@/components/join/searchDropdown';
import University from '@/constants/university';
import { useNavigate, useParams } from 'react-router-dom';
import { MainButton } from '@/components/common/MainButton';
import { ShortInput } from '@/components/admin/ShortInput';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postCreateBoard } from '@/apis/admin/postCreateBoard.api';
import { QUERY_KEYS } from '@/constants/api';
import { getAdminBoardDetail } from '@/apis/admin/getAdminBoardDetail.api';
import { putAdminBoard } from '@/apis/admin/putAdminBoard.api';

export const CreateBoard = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const [boardType, setBoardType] = useState('GENERAL');

  const UniversityList = University;
  const [university, setUniversity] = useState('');
  const [isUniversitySelected, setIsUniversitySelected] = useState(false);

  const [isCategoryChecked, setIsCategoryChecked] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { data: boardDetailsData } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_BOARD_DETAIL, boardId],
    queryFn: () => getAdminBoardDetail({ boardId: boardId }),
    enabled: !!boardId,
  });

  // 수정하는 페이지일 경우 백 연동
  useEffect(() => {
    if (boardDetailsData) {
      console.log(boardDetailsData);
      setIsEditMode(true);
      // 백 연동
      setBoardType(boardDetailsData.boardType);
      setTitle(boardDetailsData.boardName);
      setDescription(boardDetailsData.description);

      // 학교 보드일 경우
      if (boardDetailsData.boardType === 'UNIVERSITY') {
        setUniversity(boardDetailsData.universityName);
        setIsUniversitySelected(true);
      }
      setIsCategoryChecked(boardDetailsData.isCategoryRequired);
      // 카테고리 선택되어있을 경우
      // if (data.categories && data.categories.length > 0) {
      //   setIsCategoryChecked(true);
      //   setCategoryList(data.categories);
      // }
    }
  }, [boardDetailsData]);

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

  const { mutate: createBoard } = useMutation({
    mutationFn: postCreateBoard,
  });

  const handleCreateBoard = () => {
    const universityName = boardType === 'UNIVERSITY' ? university : null;
    const data = {
      boardName: title,
      description: description,
      universityName: universityName,
      isCategoryRequired: isCategoryChecked,
    };

    if (isCategoryChecked) {
      console.log(categoryList); // 나중에 백 api 수정되면 보내줘야함
    }

    createBoard(
      { data: data },
      {
        onSuccess: (response) => {
          console.log(response);
          navigate(-1);
        },
        onError: (err) => {
          alert(err.message);
        },
      },
    );
  };

  const { mutate: editBoard } = useMutation({
    mutationFn: ({ boardId, boardData }) =>
      putAdminBoard({ boardId, data: boardData }),
  });

  const handleEditBoard = (boardId) => {
    // 백 연동
    const data = {
      boardName: title,
      description: description,
      isCategoryRequired: isCategoryChecked,
    };

    editBoard(
      { boardId: boardId, boardData: data },
      {
        onSuccess: (response) => {
          console.log(response);
          navigate(-1);
        },
        onError: (err) => {
          alert(err.message);
        },
      },
    );
  };

  const disabled =
    !title ||
    !description ||
    (boardType === 'UNIVERSITY' && !isUniversitySelected) ||
    (isCategoryChecked && categoryList.length === 0);

  return (
    <div className="flex flex-col flex-1 gap-5">
      <div className="flex flex-col h-full gap-5 p-8 bg-white rounded-2xl">
        <div className="flex h-10 gap-5">
          <div className="flex items-center gap-2 text-subTitle">
            <input
              id="GENERAL"
              type="radio"
              value="GENERAL"
              name="boardType"
              className="w-5 h-5 cursor-pointer"
              onChange={(e) => setBoardType(e.target.value)}
              checked={boardType === 'GENERAL'}
              disabled={isEditMode}
            />
            <label htmlFor="GENERAL" className="cursor-pointer">
              일반 게시판
            </label>
          </div>
          <div className="flex items-center gap-2 text-subTitle">
            <input
              id="UNIVERSITY"
              type="radio"
              value="UNIVERSITY"
              name="boardType"
              className="w-5 h-5 cursor-pointer"
              onChange={(e) => setBoardType(e.target.value)}
              checked={boardType === 'UNIVERSITY'}
              disabled={isEditMode}
            />
            <label htmlFor="UNIVERSITY" className="cursor-pointer">
              학교 게시판
            </label>
          </div>
          <div className="flex">
            {boardType === 'UNIVERSITY' && (
              <SearchDropdown
                keyword={university}
                name="Language"
                placeholder="학교 이름"
                onChange={(value) => setUniversity(value)}
                setIsSelected={setIsUniversitySelected}
                selected={isUniversitySelected}
                list={UniversityList}
                warn=""
                label={false}
                disabled={isEditMode}
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
        <div className="flex max-w-[31.25rem] flex-col gap-5">
          <ShortInput
            value={title}
            onChange={setTitle}
            placeholder="게시판명을 적어주세요."
          />
          <ShortInput
            value={description}
            onChange={setDescription}
            placeholder="게시판 설명을 간단하게 적어주세요."
          />
          <MainButton
            disabled={disabled}
            onClick={isEditMode ? () => handleEditBoard(boardId) : handleCreateBoard}
          >
            {isEditMode ? '게시판 수정' : '게시판 생성'}
          </MainButton>
        </div>
      </div>
    </div>
  );
};
