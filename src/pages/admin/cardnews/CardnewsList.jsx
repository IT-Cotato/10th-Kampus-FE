import { useEffect, useState } from 'react';
import menubar from '@/assets/imgs/menubar.svg';
import { MenuBar } from '@/components/admin/MenuBar';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
import Plus from '@/assets/imgs/admin/Plus.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminCardnewsList } from '@/apis/admin/getAdminCardnewsList.api';
import { QUERY_KEYS } from '@/constants/api';
import { deleteCardnews } from '@/apis/admin/deleteCardnews.api';

export const CardnewsList = () => {
  const navigate = useNavigate();
  const [cardnewsList, setCardnewsList] = useState([]);
  const [selectedCardNewsMenu, setSelectedCardNewsMenu] = useState(null);

  const handleClickEdit = (cardId) => {
    // 수정
    setSelectedCardNewsMenu(null);
    alert('게시판이 수정되었습니다.');
  };

  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation({
    mutationFn: (postId) => deleteCardnews({ postId : postId }),
    onSuccess: () => {
      alert('카드뉴스가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST] }); // 삭제 후 리스트 다시 불러오기
    },
    onError: (error) => {
      alert('카드뉴스 삭제를 실패하였습니다.');
    },
    onSettled: () => {
      setSelectedCardNewsMenu(null);
    },
  });

  const handleClickDelete = (postId) => {
    deletePost(postId);
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

  const { data: cardnewsListData, isLoading: isPostLoading, error: isPostError } = useQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIST],
    queryFn: () => getAdminCardnewsList({ page: 1 })
  })

  useEffect(() => {
    if(cardnewsListData) {
      setCardnewsList(cardnewsListData?.posts);
    }
  }, [cardnewsListData]);
  
  return (
    <div className="flex flex-col flex-1 gap-5">
      <div className="flex flex-col w-full h-full gap-5 p-8 bg-white rounded-2xl">
        <h1 className="text-pageTitle">카드뉴스</h1>
        <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-7 lg:grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))]">
          {cardnewsList && cardnewsList.map((cardnews) => (
            <div
              key={cardnews.postId}
              className="relative h-60 w-60 overflow-hidden lg:h-[18.75rem] lg:w-[18.75rem]"
            >
              <h2 className="absolute p-2 text-base bg-white left-2 top-2 max-w-36 rounded-xl lg:max-w-64 lg:text-subTitle">
                {cardnews.title}
              </h2>
              <img
                src={cardnews.thumbnailUrl}
                className="object-contain w-full h-full"
              />
              <button onClick={() => handleMenuBarClick(cardnews.postId)}>
                <img
                  src={menubar}
                  alt="menu"
                  className="absolute px-2 right-1 top-3"
                />
                {selectedCardNewsMenu === cardnews.postId && (
                  <MenuBar
                    menuOptions={menuOptions(cardnews.postId)}
                    onClose={() => setSelectedCardNewsMenu(null)}
                  />
                )}
              </button>
              <span className="absolute px-1 bg-white rounded-lg bottom-2 right-2 text-small text-neutral-base opacity-70">
                {cardnews.createdTime}
              </span>
            </div>
          ))}
          <button
            className="flex h-60 w-60 items-center justify-center border border-neutral-border-40 text-[5rem] text-neutral-border-50 lg:h-[18.75rem] lg:w-[18.75rem] lg:text-[10rem]"
            onClick={() => navigate(path.admin.cardnews.create)}
          >
            <img src={Plus} />
          </button>
        </div>
      </div>
    </div>
  );
};
