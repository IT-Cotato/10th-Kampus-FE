// @ts-nocheck

import { Dropdown } from '@/components/admin/Dropdown';
import menubar from '@/assets/imgs/menubar.svg';
import { MenuBar } from '@/components/admin/MenuBar';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BoardManagement = () => {
  const navigate = useNavigate();
  const BoardOptions = ['전체', '활성화', '보관', '삭제 대기'];
  const [selectedDropdown, setSelectedDropdown] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [selectedBoardMenu, setSelectedBoardMenu] = useState(null);

  const handleClickEdit = (boardId) => {
    navigate(`./${boardId}/${path.admin.boardManagement.edit}`);
  };

  const handleClickKeep = () => {
    // 보관
    setSelectedBoardMenu(null);
    alert('게시판이 보관되었습니다.');
  };

  const handleClickDelete = () => {
    // 삭제
    setSelectedBoardMenu(null);
    alert('게시판이 삭제되었습니다.');
  };

  const menuOptions = (boardId) => [
    { menu: '수정', onClick: () => handleClickEdit(boardId) },
    { menu: '보관', onClick: handleClickKeep },
    { menu: '삭제', onClick: handleClickDelete },
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

  useEffect(() => {
    // 백 연동
    setBoardList([
      {
        id: 0,
        title: 'Housing',
        boardId: 12345,
        postNum: 30,
        description:
          'Share the information about dorms, rental rooms, and shared housing near campus!',
        dday: 1,
      },
      {
        id: 1,
        title: 'Part Time/Job',
        boardId: 12346,
        postNum: 30,
        description:
          'Find part-time job and employment opportunities in Korea.',
        dday: 0,
      },
      {
        id: 2,
        title: 'Language Exchange',
        boardId: 12347,
        postNum: 30,
        description:
          'Connect with others for language exchange and cultural learning.',
        dday: 10,
      },
      {
        id: 3,
        title: 'Festival/Events',
        boardId: 12348,
        postNum: 30,
        description: 'Discover upcoming festivals and events in Korea.',
        dday: 10,
      },
      {
        id: 4,
        title: 'Information',
        boardId: 12349,
        postNum: 30,
        description:
          'Find essential updates and helpful resources for living, studying, and working in Korea.',
        dday: 27,
      },
      {
        id: 5,
        title: 'Question',
        boardId: 12350,
        postNum: 30,
        description:
          'Got questions? Get answers from fellow international students and expats in Korea.',
        dday: 15,
      },
      {
        id: 6,
        title: 'Free Talk',
        boardId: 12351,
        postNum: 30,
        description:
          'Chat about anything and everything! Share your experiences, thoughts, and daily life with the community.',
        dday: 10,
      },
      {
        id: 7,
        title: 'Trending',
        boardId: 12352,
        postNum: 30,
        description:
          'Stay updated with the hottest topics and discussions happening right now in the community.',
        dday: 10,
      },
    ]);
  }, [selectedDropdown]);

  return (
    <div className="flex flex-col flex-1 gap-5 px-5">
      <div className="flex flex-col w-full gap-5 p-8 bg-white h-fit rounded-2xl">
        <h1 className="text-pageTitle">게시판 상태</h1>
        <Dropdown
          selectedDropdown={selectedDropdown}
          dropdownOptions={BoardOptions}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          handleDropdownClick={(state) => handleDropdownClick(state)}
        />
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] place-items-center gap-7 lg:grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))]">
        {boardList.map((board, index) => (
          <div
            key={board.id}
            className="relative flex h-40 min-h-fit w-60 min-w-fit flex-col gap-5 rounded-2xl bg-white p-8 lg:h-[12.5rem] lg:w-[18.75rem]"
          >
            <div className="relative flex flex-row items-center gap-3 text-center align-middle">
              <button onClick={() => handleMenuBarClick(board.boardId)}>
                <img
                  src={menubar}
                  alt="menu"
                  className="absolute top-0 right-0 px-2 py-1"
                />
              </button>
              {selectedBoardMenu === board.boardId && (
                <MenuBar menuOptions={menuOptions(board.boardId)} onClose={() => setSelectedBoardMenu(null)}/>
              )}
              <span className="px-2 rounded-lg h-fit w-fit whitespace-nowrap bg-primary-10 text-subTitle text-primary-base">
                {selectedDropdown === '삭제 대기'
                  ? 'D-' + (board.dday === 0 ? 'day' : board.dday)
                  : index}
              </span>
              <h2 className="whitespace-nowrap">
                {board.title} | {board.postNum}개
              </h2>
            </div>
            {board.description}
          </div>
        ))}
        <button
          type="button"
          className="relative flex h-40 w-60 flex-col items-center justify-center gap-5 rounded-2xl bg-white p-8 text-[5rem] text-neutral-border-50 lg:h-[12.5rem] lg:w-[18.75rem] lg:text-[10rem]"
          onClick={() => navigate(path.admin.boardManagement.create)}
        >
          +
        </button>
      </div>
    </div>
  );
};
