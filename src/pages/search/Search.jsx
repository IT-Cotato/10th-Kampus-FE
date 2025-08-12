import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SearchBar } from '@/components/search/SearchBar';
import { RecentSearch } from '@/components/search/RecentSearch';
import { PostList } from '@/components/board/PostList';
import { Loading } from '@/components/common/Loading';
import {
  StateChangeAnimate,
  startAnimation,
} from '@/components/common/StateChangeAnimate';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/routes/path';
import { getSearcTotalResult } from '@/apis/search/searchTotal.api';
import { getSearchKeywords } from '@/apis/search/searchKeywords.api';
import {
  deleteAllSearchKeyword,
  deleteSearchKeyword,
} from '@/apis/search/searchDeleteKeyword.api';
import { getSearcBoardResult } from '@/apis/search/searchBoard.api';

const MIN_SEARCH_LENGTH = 2;

export const Search = () => {
  const { boardId } = useParams();
  const [showRecentSearches, setShowRecentSearches] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /** 검색 결과 요청 */
  const {
    data: searchResult,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: boardId
      ? [QUERY_KEYS.GET_POST_LIST, boardId, searchValue]
      : [QUERY_KEYS.GET_POST_LIST, searchValue],
    queryFn: () => {
      return boardId
        ? getSearcBoardResult({ keyword: searchValue, page: 1, boardId })
        : getSearcTotalResult({ keyword: searchValue, page: 1 });
    },
    enabled: searchValue.length >= MIN_SEARCH_LENGTH,
  });

  /** 최근 검색어 목록 요청 */
  const { data: searchKeywords, error: keywordError } = useQuery({
    queryKey: [QUERY_KEYS.GET_SEARCH_KEYWORD],
    queryFn: getSearchKeywords,
  });

  /** 검색어 삭제 */
  const { mutate: deleteKeyword } = useMutation({
    mutationFn: async (keywordId) =>
      keywordId === null
        ? deleteAllSearchKeyword()
        : deleteSearchKeyword(keywordId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.GET_SEARCH_KEYWORD] });
    },
  });

  /** 검색 시작 */
  const handleStartSearch = (text) => {
    if (text.length >= MIN_SEARCH_LENGTH) {
      setShowRecentSearches(false);
      setSearchValue(text);
    } else {
      startAnimation(setIsAnimate);
    }
  };

  /** 게시글 상세로 이동 */
  const handleNavigate = (data) => {
    navigate(`${PATH.BOARD.BASE}/${data.boardId}/${data.id}`);
  };

  let mainContent;
  if (showRecentSearches) {
    mainContent = (
      <RecentSearch
        setInputValue={setInputValue}
        startSearch={handleStartSearch}
        data={searchKeywords}
        deleteKeyword={deleteKeyword}
        error={keywordError}
      />
    );
  } else if (searchLoading) {
    mainContent = <Loading />;
  } else if (searchError) {
    mainContent = (
      <p className="pt-4 text-base text-neutral-border-50">
        ❌ Search failed. Please try again later. ❌
      </p>
    );
  } else if (searchResult?.items.length > 0) {
    mainContent = (
      <div className="divide-y">
        {searchResult.items.map((data, index) => (
          <PostList
            key={index}
            hasBoardName
            data={data}
            isActive
            onClick={handleNavigate}
          />
        ))}
      </div>
    );
  } else {
    mainContent = (
      <div className="flex w-full justify-center py-[.875rem] text-neutral-border-50">
        Search results not found!
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-[0.875rem] px-4 pt-[0.625rem]">
      {isAnimate && (
        <StateChangeAnimate
          state
          changeToTrueText="Keywords must be at least 2 characters long."
          changeToFalseText="Keywords must be at least 2 characters long."
        />
      )}
      <SearchBar
        value={inputValue}
        setValue={setInputValue}
        showRecentSearches={showRecentSearches}
        setShowRecentSearches={setShowRecentSearches}
        startSearch={handleStartSearch}
      />
      {mainContent}
    </div>
  );
};
