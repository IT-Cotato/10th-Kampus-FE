import { Dropdown } from '@/components/admin/Dropdown';
import menubar from '@/assets/imgs/menubar.svg';
import { MenuBar } from '@/components/admin/MenuBar';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plus from '@/assets/imgs/admin/Plus.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getAdminBoardList } from '@/apis/admin/getAdminBoardList.api';
import { deleteAdminBoard } from '@/apis/admin/deleteAdminBoard.api';
import { postActivateBoard } from '@/apis/admin/postActivateBoard.api';
import { postInactivateBoard } from '@/apis/admin/postInactivateBoard.api';

export const BoardManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const BoardOptions = ['전체', '활성화', '보관', '삭제 대기'];
  const [selectedDropdown, setSelectedDropdown] = useState('전체');
  const [state, setState] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [selectedBoardMenu, setSelectedBoardMenu] = useState(null);

  const handleClickEdit = (boardId) => {
    navigate(`./${boardId}/${path.admin.boardManagement.edit}`);
  };

  const { mutate: inactivateBoard } = useMutation({
    mutationFn: (boardId) => postInactivateBoard({ boardId: boardId }),
    onSuccess: () => {
      alert('게시판이 보관되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_BOARD_LIST] }); // 삭제 후 리스트 다시 불러오기
    },
    onError: (error) => {
      alert('게시판 보관 실패');
    },
    onSettled: () => {
      setSelectedBoardMenu(null);
    },
  });

  const handleClickKeep = (boardId) => {
    // 보관
    inactivateBoard(boardId);
  };

  const { mutate: deleteBoard } = useMutation({
    mutationFn: (boardId) => deleteAdminBoard({ boardId: boardId }),
    onSuccess: () => {
      alert('게시판이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_BOARD_LIST] }); // 삭제 후 리스트 다시 불러오기
    },
    onError: (error) => {
      alert('게시판 삭제 실패');
    },
    onSettled: () => {
      setSelectedBoardMenu(null);
    },
  });

  const handleClickDelete = (boardId) => {
    // 삭제
    deleteBoard(boardId);
  };

  const handleClickDeleteCompletely = () => {
    // 완전 삭제
    setSelectedBoardMenu(null);
    alert('게시판이 완전히 삭제되었습니다.');
  };

  const { mutate: activateBoard } = useMutation({
    mutationFn: (boardId) => postActivateBoard({ boardId: boardId }),
    onSuccess: () => {
      alert('게시판이 활성화되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_BOARD_LIST] }); // 삭제 후 리스트 다시 불러오기
    },
    onError: (error) => {
      alert('게시판 활성화 실패');
    },
    onSettled: () => {
      setSelectedBoardMenu(null);
    },
  });

  const handleClickRestore = (boardId) => {
    // 복구
    activateBoard(boardId);
  };

  const menuOptions = (boardId) => [
    { menu: '수정', onClick: () => handleClickEdit(boardId) },
    { menu: '보관', onClick: () => handleClickKeep(boardId) },
    { menu: '삭제', onClick: () => handleClickDelete(boardId) },
  ];

  const keptMenuOptions = (boardId) => [
    { menu: '수정', onClick: () => handleClickEdit(boardId) },
    { menu: '보관 해제', onClick: () => handleClickRestore(boardId) },
    { menu: '삭제', onClick: () => handleClickDelete(boardId) },
  ];

  const deletedMenuOptions = (boardId) => [
    { menu: '보관으로 이동', onClick: () => handleClickKeep(boardId) },
    { menu: '완전 삭제', onClick: () => handleClickDeleteCompletely(boardId) },
    { menu: '복구', onClick: () => handleClickRestore(boardId) },
  ];

  const handleDropdownClick = (state) => {
    setSelectedDropdown(state);
    setIsDropdownOpen(false);
  };

  const handleMenuBarClick = (boardId) => {
    if (selectedBoardMenu !== boardId) {
      setSelectedBoardMenu(boardId);
    } else {
      // 이미 해당 메뉴바가 열려 있을 경우 끔
      setSelectedBoardMenu(null);
    }
  };

  const getStateFromDropdown = (dropdown) => {
    switch (dropdown) {
      case '활성화':
        return 'ACTIVE';
      case '보관':
        return 'INACTIVE';
      case '삭제 대기':
        return 'PENDING_DELETION';
      default:
        return null;
    }
  };

  const { data: boardData } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_LIST, state],
    queryFn: () => getAdminBoardList({ status: state }),
  });

  useEffect(() => {
    setState(getStateFromDropdown(selectedDropdown));
  }, [selectedDropdown]);

  useEffect(() => {
    setBoardList(boardData?.adminBoardDetails);
  }, [boardData]);

  return (
    <div className="flex flex-col flex-1 gap-5">
      <div className="flex flex-col w-full gap-5 p-8 bg-white h-fit rounded-2xl">
        <h1 className="text-pageTitle">게시판 관리</h1>
        <Dropdown
          selectedDropdown={selectedDropdown}
          dropdownOptions={BoardOptions}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          handleDropdownClick={(state) => handleDropdownClick(state)}
        />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] place-items-center gap-7 lg:grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))]">
        {boardList &&
          boardList.map((board, index) => (
            <div
              key={board.boardId}
              className="relative flex h-40 min-h-fit w-full min-w-fit flex-col gap-5 rounded-2xl bg-white p-8 lg:h-[12.5rem] lg:w-full"
            >
              <div className="relative flex flex-row items-center gap-3 text-center align-middle">
                {selectedBoardMenu === board.boardId && (
                  <MenuBar
                    menuOptions={
                      board.boardStatus === 'PENDING_DELETION'
                        ? deletedMenuOptions(board.boardId)
                        : board.boardStatus === 'INACTIVE'
                          ? keptMenuOptions(board.boardId)
                          : menuOptions(board.boardId)
                    }
                    onClose={() => setSelectedBoardMenu(null)}
                  />
                )}
                <span className="px-2 rounded-lg h-fit w-fit whitespace-nowrap bg-primary-10 text-subTitle text-primary-base">
                  {selectedDropdown === '삭제 대기'
                    ? 'D-' +
                      (board.deletionCountdown === 0
                        ? 'day'
                        : board.deletionCountdown)
                    : index + 1}
                </span>
                <h2 className="whitespace-nowrap">
                  {board.boardName} | {board.postCount}개
                </h2>
                <button onClick={() => handleMenuBarClick(board.boardId)}>
                  <img
                    src={menubar}
                    alt="menu"
                    className="absolute px-2 -right-4 -top-2 lg:right-0 lg:top-0"
                  />
                </button>
              </div>
              {board.description}
              {board.boardStatus === 'PENDING_DELETION' && selectedDropdown !== '삭제 대기' && (
                  <span className="absolute bottom-3 right-5 text-primary-red">
                    삭제 D-{board.deletionCountdown}
                  </span>
                )}
              {board.boardStatus === 'INACTIVE' && selectedDropdown !== '보관' && (
                <span className="absolute bottom-3 right-5 text-primary-red">
                  비활성화
                </span>
              )}
            </div>
          ))}
        <button
          type="button"
          className="relative flex h-full w-full flex-col items-center justify-center gap-5 rounded-2xl bg-white p-8 text-[5rem] text-neutral-border-50 lg:h-[12.5rem] lg:w-full lg:text-[10rem]"
          onClick={() => navigate(path.admin.boardManagement.create)}
        >
          <img src={Plus} />
        </button>
      </div>
    </div>
  );
};
