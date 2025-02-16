import { path } from '@/routes/path';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BoardManagement = () => {
  const navigate = useNavigate();
  const BoardState = ['전체', '활성화', '보관'];
  const [boardState, setBoardState] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [boardList, setBoardList] = useState([]);

  const handleDropdownClick = (state) => {
    setBoardState(state);
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    // 백 연동
    setBoardList([
      {
        id: 0,
        title: 'Housing',
        postNum: 30,
        description:
          'Share the information about dorms, rental rooms, and shared housing near campus!',
      },
      {
        id: 1,
        title: 'Part Time/Job',
        postNum: 30,
        description:
          'Find part-time job and employment opportunities in Korea.',
      },
      {
        id: 2,
        title: 'Language Exchange',
        postNum: 30,
        description:
          'Connect with others for language exchange and cultural learning.',
      },
      {
        id: 3,
        title: 'Festival/Events',
        postNum: 30,
        description: 'Discover upcoming festivals and events in Korea.',
      },
      {
        id: 4,
        title: 'Information',
        postNum: 30,
        description:
          'Find essential updates and helpful resources for living, studying, and working in Korea.',
      },
      {
        id: 5,
        title: 'Question',
        postNum: 30,
        description:
          'Got questions? Get answers from fellow international students and expats in Korea.',
      },
      {
        id: 6,
        title: 'Free Talk',
        postNum: 30,
        description:
          'Chat about anything and everything! Share your experiences, thoughts, and daily life with the community.',
      },
      {
        id: 7,
        title: 'Trending',
        postNum: 30,
        description:
          'Stay updated with the hottest topics and discussions happening right now in the community.',
      },
    ]);
  }, [boardState]);

  return (
    <div className="flex flex-col flex-1 gap-5 px-5">
      <div className="flex flex-col w-full gap-5 p-8 bg-white h-fit rounded-2xl">
        게시판 상태
        <br />
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="inline-flex w-fit items-center rounded-lg border border-primary-base px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-20"
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {boardState}{' '}
          <svg
            className="ms-3 h-2.5 w-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
              className={cn('', {
                'translate-x-full translate-y-full rotate-180': isDropdownOpen,
              })}
            />
          </svg>
        </button>
        <div
          id="dropdown"
          className={cn(
            'z-10 hidden w-fit min-w-28 divide-y divide-gray-300 rounded-lg border border-primary-base bg-white',
            {
              block: isDropdownOpen,
            },
          )}
        >
          <ul
            className="py-2 text-neutral-80"
            aria-labelledby="dropdownDefaultButton"
          >
            {BoardState.map((state, index) => (
              <li key={index} onClick={() => handleDropdownClick(state)}>
                <a href="#" className="block px-4 py-2 hover:bg-primary-10">
                  {state}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] place-items-center gap-7 lg:grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))]">
        {boardList.map((board, index) => (
          <div
            key={board.id}
            className="relative flex h-40 min-h-fit w-60 min-w-fit flex-col gap-5 rounded-2xl bg-white p-8 lg:h-[12.5rem] lg:w-[18.75rem]"
          >
            <div className="flex flex-row items-center gap-3 text-center align-middle">
              <span className="px-2 rounded-lg h-fit w-fit bg-primary-10 text-subTitle text-primary-base">
                {index}
              </span>
              <h2>
                {board.title} | {board.postNum}개
              </h2>
            </div>
            {board.description}
          </div>
        ))}
        <button
          className="relative flex h-40 w-60 flex-col items-center justify-center gap-5 rounded-2xl bg-white p-8 text-[5rem] text-neutral-border-50 lg:h-[12.5rem] lg:w-[18.75rem] lg:text-[10rem]"
          onClick={() => navigate(path.admin.boardManagement.create)}
        >
          +
        </button>
      </div>
    </div>
  );
};
