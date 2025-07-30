import { useEffect, useState } from 'react';
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
import { getBoardCategories } from '@/apis/board/getBoardCategories.api';
import { BOARD_TYPE } from '@/constants/boardConstant';
import { useGetCategory } from '@/state/query/admin/useGetCategory';
import { cn } from '@/utils/cn';
import { toast } from 'react-toastify';
import { Toast } from '@/components/common/toast';

export const CreateBoard = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const [boardType, setBoardType] = useState('GENERAL');

  const UniversityList = University;
  const [university, setUniversity] = useState('');
  const [isUniversitySelected, setIsUniversitySelected] = useState(false);

  const [isCategoryChecked, setIsCategoryChecked] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { data: publicCategory } = useGetCategory();

  // 카테고리 제외한 게시판 정보 가져오기
  const { data: boardDetailsData } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_BOARD_DETAIL, boardId],
    queryFn: () => getAdminBoardDetail({ boardId: boardId }),
    enabled: !!boardId,
  });

  // 게시판에 적용되는 카테고리 조회
  const { data: boardCategories } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_CATEGORIES, boardId],
    queryFn: () => getBoardCategories({ boardId: boardId }),
    enabled: !!boardId,
  });

  // 수정하는 페이지일 경우 백 연동
  useEffect(() => {
    if (boardDetailsData) {
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

      // 카테고리 선택되어있을 경우
      if (boardDetailsData.usesCategories) {
        setIsCategoryChecked(true);
        setCategoryList((prev) => [
          ...prev,
          ...(boardCategories?.categories || []),
        ]);
      }
    }
  }, [boardDetailsData]);

  const { mutate: createBoard } = useMutation({
    mutationFn: postCreateBoard,
  });

  const handleToggleCategory = (categoryName) => {
    // 카테고리 토글 함수
    setCategoryList(
      (prev) =>
        prev.includes(categoryName)
          ? prev.filter((item) => item !== categoryName) // 이미 있으면 제거
          : [...prev, categoryName], // 없으면 추가
    );
  };

  const handleCreateBoard = () => {
    const universityCode = boardType === BOARD_TYPE.UNIV ? university : null;
    const formData = new FormData();
    formData.append('boardName', title);
    formData.append('description', description);
    if (universityCode) {
      formData.append('universityCode', universityCode);
    }
    formData.append('boardType', boardType);

    if (isCategoryChecked) {
      categoryList.forEach((category) =>
        formData.append('categories', category),
      );
    }

    createBoard(
      { data: formData },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (err) => {
          toast.error(err.message);
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
          toast.error(err.message);
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
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex h-full flex-col gap-5 rounded-2xl bg-white p-8">
        <h1 className="text-pageTitle">게시판 타입</h1>
        <div className="flex h-10 gap-5">
          {Object.values(BOARD_TYPE).map((type) => (
            <div key={type} className="flex items-center gap-2 text-subTitle">
              <input
                id={type}
                type="radio"
                value={type}
                name="boardType"
                className="h-5 w-5 cursor-pointer"
                onChange={(e) => setBoardType(e.target.value)}
                checked={boardType === type}
                disabled={isEditMode}
              />
              <label htmlFor={type} className="cursor-pointer">
                {type}
              </label>
            </div>
          ))}
        </div>

        {boardType === BOARD_TYPE.UNIV && (
          <div className="flex">
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
          </div>
        )}

        <div className="flex flex-col gap-2 text-subTitle">
          {/* 카테고리 추가 여부 체크 */}
          <div className="flex items-center gap-2">
            <input
              id="addCategory"
              type="checkbox"
              className="h-5 w-5 cursor-pointer"
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
              {publicCategory.map((category) => (
                <div
                  onClick={() => handleToggleCategory(category.categoryName)}
                  key={`category-${category.id}`}
                  className={cn(
                    'box-border flex flex-shrink-0 cursor-pointer items-center justify-center gap-2 rounded-3xl border pl-4 pr-3',
                    categoryList.includes(category.categoryName)
                      ? 'border-primary-base bg-primary-base text-white'
                      : 'border-neutral-border-50 bg-primary-5',
                  )}
                >
                  {category.categoryName}
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
            onClick={
              isEditMode ? () => handleEditBoard(boardId) : handleCreateBoard
            }
          >
            {isEditMode ? '게시판 수정' : '게시판 생성'}
          </MainButton>
        </div>
      </div>
      <Toast />
    </div>
  );
};
