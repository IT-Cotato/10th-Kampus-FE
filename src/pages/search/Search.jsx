import { SearchBar } from '@/components/search/SearchBar';
import { RecentSearch } from '@/components/search/RecentSearch';
import { useState } from 'react';
import { PostList } from '@/components/board/PostList';
import { Loading } from '@/components/common/Loading';
import {
  StateChangeAnimate,
  startAnimation,
} from '@/components/common/StateChangeAnimate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getSearcTotalResult } from '@/apis/search/searchTotal.api';
import { getSearchKeywords } from '@/apis/search/searchKeywords.api';
import { useNavigate, useParams } from 'react-router-dom';
import { path } from '@/routes/path';
import {
  deleteAllSearchKeyword,
  deleteSearchKeyword,
} from '@/apis/search/searchDeleteKeyword.api';
import { getSearcBoardResult } from '@/apis/search/searchBoard.api';
export const Search = () => {
  const { boardId } = useParams();
  const [isSearch, setIsSearch] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const searchQueryKey = boardId
    ? [QUERY_KEYS.GET_POST_LIST, boardId, searchValue]
    : [QUERY_KEYS.GET_POST_LIST, searchValue];
  const {
    data: searchResult,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: searchQueryKey,
    queryFn: () => {
      if (boardId) {
        return getSearcBoardResult({
          keyword: searchValue,
          page: 1,
          boardId: boardId,
        });
      }
      return getSearcTotalResult({ keyword: searchValue, page: 1 });
    },
    enabled: searchValue.length >= 2 && searchValue.length <= 10,
  });
  const {
    data: searchKeywords,
    isLoading: keywordLoading,
    error: keywordError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_SEARCH_KEYWORD],
    queryFn: getSearchKeywords,
  });
  const { mutate: deleteKeyword } = useMutation({
    mutationFn: async (keywordId) => {
      if (keywordId === null) {
        return await deleteAllSearchKeyword();
      }
      return await deleteSearchKeyword(keywordId);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_SEARCH_KEYWORD],
      });
    },
  });
  const startSearch = async (text) => {
    if (text.length >= 2 && text.length <= 10) {
      setIsSearch(false);
      setSearchValue(text);
    } else {
      startAnimation(setIsAnimate);
    }
  };
  const handleNavigate = (data) => {
    navigate(`${path.board.base}/${data.boardId}/${data.id}`);
  };
  return (
    <div className="container flex flex-col gap-[0.875rem] px-4 pt-[0.625rem]">
      {isAnimate && (
        <StateChangeAnimate
          state={true}
          changeToTrueText={
            'The keyword must be between 2 and 10 characters long.'
          }
          changeToFalseText={
            'The keyword must be between 2 and 10 characters long.'
          }
        />
      )}
      <SearchBar
        value={inputValue}
        setValue={setInputValue}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        startSearch={startSearch}
      />
      {isSearch ? (
        <RecentSearch
          startSearch={startSearch}
          data={searchKeywords}
          deleteKeyword={deleteKeyword}
        />
      ) : searchLoading ? (
        <Loading />
      ) : (
        <div className="divide-y">
          {searchResult?.posts.map((data, index) => (
            <PostList
              data={data}
              isActive={true}
              key={index}
              onClick={handleNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
