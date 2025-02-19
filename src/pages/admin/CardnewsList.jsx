import { useEffect, useState } from 'react';
import bg1 from '@/assets/imgs/bg1.png';
import bg2 from '@/assets/imgs/bg2.png';
import bg3 from '@/assets/imgs/bg3.png';
import bg4 from '@/assets/imgs/bg4.png';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const CardnewsList = () => {
  const navigate = useNavigate();
  const [cardnewsList, setCardnewsList] = useState([]);

  useEffect(() => {
    setCardnewsList([
      {
        id: 0,
        title: '한국에서 비자 쉽게 갱신하는 꿀팁 어쩌고',
        date: '2025.02.15',
        thumbnail: bg1,
      },
      {
        id: 1,
        title: 'Cardnews3',
        date: '2025.02.14',
        thumbnail: bg2,
      },
      {
        id: 2,
        title: 'Cardnews2',
        date: '2025.02.13',
        thumbnail: bg3,
      },
      {
        id: 3,
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
        <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))] gap-7">
          {cardnewsList.map((cardnews) => (
            <div
              key={cardnews.id}
              className="relative h-60 w-60 overflow-hidden rounded-2xl lg:h-[18.75rem] lg:w-[18.75rem]"
            >
              <h2 className="absolute max-w-36 left-2 top-2 lg:max-w-[17.75rem] rounded-xl bg-white p-2 text-base lg:text-subTitle">
                {cardnews.title}
              </h2>
              <img
                src={cardnews.thumbnail}
                className="object-contain w-full h-full"
              />
              <span className="absolute px-1 bg-white rounded-lg opacity-70 bottom-2 right-2 text-small text-neutral-base">
                {cardnews.date}
              </span>
            </div>
          ))}
          <button
            className="w-60 h-60 lg:h-[18.75rem] lg:w-[18.75rem] rounded-2xl border border-primary-base text-[5rem] lg:text-[10rem] flex justify-center items-center text-neutral-border-50"
            onClick={() => navigate(path.admin.cardnews.create)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
