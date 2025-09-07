import { SearchBar } from '@/components/search/SearchBar';
import { useState } from 'react';
import { MarketList } from '@/components/market/MarketList';
import { Loading } from '@/components/common/Loading';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getSearcMarketResult } from '@/apis/search/searchMarket.api';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { useSnackbarStore } from '@/stores/useSnackbarStore';

export const MarketSearch = () => {
  const [isSearch, setIsSearch] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const searchQueryKey = [QUERY_KEYS.GET_SEARCH_RESULT_MARKET, searchValue];
  const { showSnackbar } = useSnackbarStore();

  const {
    data: searchResult,
    isLoading: searchLoading,
    error: searchError,
  } = useQuery({
    queryKey: searchQueryKey,
    queryFn: () => getSearcMarketResult({ keyword: searchValue, page: 1 }),
    enabled: searchValue.length >= 2,
  });

  const startSearch = async (text) => {
    if (text.length >= 2) {
      setSearchValue(text);
    } else {
      showSnackbar('Keywords must be at least 2 characters long.');
    }
  };

  const handleNavigate = (data) => {
    navigate(`${PATH.MARKET.BASE}/${data.productId}`);
  };

  return (
    <div className="container flex flex-col gap-[0.875rem] px-4 pt-[0.625rem]">
      <SearchBar
        value={inputValue}
        setValue={setInputValue}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        startSearch={startSearch}
      />
      {searchLoading ? (
        <Loading />
      ) : searchError ? (
        <p className="pt-4 text-base text-neutral-border-50">
          ❌ Search failed. Please try again later. ❌
        </p>
      ) : searchResult?.items?.length > 0 ? (
        <div className="divide-y">
          {searchResult?.items?.map((data, index) => (
            <MarketList data={data} key={index} onClick={handleNavigate} />
          ))}
        </div>
      ) : searchValue.length >= 2 ? (
        <p className="pt-4 text-base text-neutral-border-50">
          No products found for &quot;{searchValue}&quot;.
        </p>
      ) : null}
    </div>
  );
};
