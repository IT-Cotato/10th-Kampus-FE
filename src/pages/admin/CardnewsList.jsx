import { useEffect, useState } from 'react';
import bg1 from '@/assets/imgs/bg1.png';
import bg2 from '@/assets/imgs/bg2.png';
import bg3 from '@/assets/imgs/bg3.png';
import bg4 from '@/assets/imgs/bg4.png';
import menubar from '@/assets/imgs/menubar.svg';
import { MenuBar } from '@/components/admin/MenuBar';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const CardnewsList = () => {
  const navigate = useNavigate();
  const [cardnewsList, setCardnewsList] = useState([]);
  const [selectedCardNewsMenu, setSelectedCardNewsMenu] = useState(null);

  const handleClickEdit = (cardId) => {
    // 수정
    setSelectedCardNewsMenu(null);
    alert('게시판이 수정되었습니다.');
  };

  const handleClickDelete = (cardId) => {
    // 삭제
    setSelectedCardNewsMenu(null);
    alert('카드뉴스가 삭제되었습니다.');
  };

  const menuOptions = (cardId) => [
    { menu: '수정', onClick: () => handleClickEdit(cardId) },
    { menu: '삭제', onClick: () => handleClickDelete(cardId) },
  ];

  const handleMenuBarClick = (cardId) => {
    if (selectedCardNewsMenu !== cardId) {
      setSelectedCardNewsMenu(cardId);
    } else {
      // 이미 해당 메뉴바가 열려 있을 경우 끔
      setSelectedCardNewsMenu(null);
    }
  };

  useEffect(() => {
    setCardnewsList([
      {
        cardId: 0,
        title: '한국에서 비자 쉽게 갱신하는 꿀팁 어쩌고',
        date: '2025.02.15',
        thumbnail: bg1,
      },
      {
        cardId: 1,
        title: 'Cardnews3',
        date: '2025.02.14',
        thumbnail: bg2,
      },
      {
        cardId: 2,
        title: 'Cardnews2',
        date: '2025.02.13',
        thumbnail: bg3,
      },
      {
        cardId: 3,
        title: 'Cardnews1',
        date: '2025.02.12',
        thumbnail: bg4,
      },
    ]);
  }, []);
  return (
    <div className="flex flex-col flex-1 gap-5 px-5">
      <div className="flex flex-col w-full h-full gap-5 p-8 bg-white rounded-2xl">
        <h1 className="text-pageTitle">카드뉴스</h1>
        <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-7 lg:grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))]">
          {cardnewsList.map((cardnews) => (
            <div
              key={cardnews.id}
              className="relative h-60 w-60 overflow-hidden rounded-2xl lg:h-[18.75rem] lg:w-[18.75rem]"
            >
              <h2 className="absolute p-2 text-base bg-white left-2 top-2 max-w-36 rounded-xl lg:max-w-64 lg:text-subTitle">
                {cardnews.title}
              </h2>
              <img
                src={cardnews.thumbnail}
                className="object-contain w-full h-full"
              />
              <button onClick={() => handleMenuBarClick(cardnews.cardId)}>
                <img
                  src={menubar}
                  alt="menu"
                  className="absolute px-2 right-1 top-3"
                />
                {selectedCardNewsMenu === cardnews.cardId && (
                  <MenuBar
                    menuOptions={menuOptions(cardnews.cardId)}
                    onClose={() => setSelectedCardNewsMenu(null)}
                  />
                )}
              </button>
              <span className="absolute px-1 bg-white rounded-lg bottom-2 right-2 text-small text-neutral-base opacity-70">
                {cardnews.date}
              </span>
            </div>
          ))}
          <button
            className="flex h-60 w-60 items-center justify-center rounded-2xl border border-primary-base text-[5rem] text-neutral-border-50 lg:h-[18.75rem] lg:w-[18.75rem] lg:text-[10rem]"
            onClick={() => navigate(path.admin.cardnews.create)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
