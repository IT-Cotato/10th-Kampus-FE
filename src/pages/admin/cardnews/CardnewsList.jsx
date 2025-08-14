import { useEffect, useState } from 'react';
import menubar from '@/assets/imgs/icon/menubar.svg';
import { MenuBar } from '@/components/admin/MenuBar';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
import Plus from '@/assets/imgs/icon/plus.svg?react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminCardnewsList } from '@/apis/admin/getAdminCardnewsList.api';
import { QUERY_KEYS } from '@/constants/api';
import { deleteCardnews } from '@/apis/admin/deleteCardnews.api';
import { toast } from 'react-toastify';
import { Toast } from '@/components/common/Toast';

export const CardnewsList = () => {
  const navigate = useNavigate();
  const [cardnewsList, setCardnewsList] = useState([]);
  const [selectedCardNewsMenu, setSelectedCardNewsMenu] = useState(null);

  const handleClickEdit = (_cardId) => {
    // 수정
    setSelectedCardNewsMenu(null);
    toast.success('게시판이 수정되었습니다.');
  };

  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation({
    mutationFn: (postId) => deleteCardnews({ postId: postId }),
    onSuccess: () => {
      toast.success('카드뉴스가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST] }); // 삭제 후 리스트 다시 불러오기
    },
    onError: () => {
      toast.error('카드뉴스 삭제를 실패하였습니다.');
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

  const { data: cardnewsListData } = useQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIST],
    queryFn: () => getAdminCardnewsList({ page: 1 }),
  });

  useEffect(() => {
    if (cardnewsListData) {
      setCardnewsList(cardnewsListData?.items);
    }
  }, [cardnewsListData]);

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex h-full w-full flex-col gap-5 rounded-2xl bg-white p-8">
        <h1 className="text-pageTitle">카드뉴스</h1>
        <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-7 lg:grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))]">
          {cardnewsList &&
            cardnewsList.map((cardnews) => (
              <div
                key={cardnews.postId}
                className="relative h-60 w-60 overflow-hidden lg:h-[18.75rem] lg:w-[18.75rem]"
              >
                <h2 className="absolute left-2 top-2 max-w-36 rounded-xl bg-white p-2 text-base lg:max-w-64 lg:text-subTitle">
                  {cardnews.title}
                </h2>
                <img
                  src={cardnews.thumbnailUrl}
                  className="h-full w-full object-contain"
                />
                <button onClick={() => handleMenuBarClick(cardnews.postId)}>
                  <img
                    src={menubar}
                    alt="menu"
                    className="absolute right-1 top-3 px-2"
                  />
                  {selectedCardNewsMenu === cardnews.postId && (
                    <MenuBar
                      menuOptions={menuOptions(cardnews.postId)}
                      onClose={() => setSelectedCardNewsMenu(null)}
                    />
                  )}
                </button>
                <span className="absolute bottom-2 right-2 rounded-lg bg-white px-1 text-small text-neutral-base opacity-70">
                  {cardnews.createdTime}
                </span>
              </div>
            ))}
          <button
            type="button"
            className="flex h-60 w-60 items-center justify-center border border-neutral-border-30 text-[5rem] text-neutral-border-50 lg:h-[18.75rem] lg:w-[18.75rem] lg:text-[10rem]"
            onClick={() => navigate(PATH.ADMIN.CARDNEWS.CREATE)}
            aria-label="카드뉴스 생성"
          >
            <Plus className="aspect-square h-24 text-neutral-border-40" />
          </button>
        </div>
      </div>
      <Toast />
    </div>
  );
};
