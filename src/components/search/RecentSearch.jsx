import Close from '@/assets/imgs/icon/x.svg?react';

const RecordBox = ({ keyword, id, onSearch, onDelete }) => (
  <div className="flex cursor-pointer items-center gap-[0.625rem] rounded-full border border-neutral-border-30 px-3 py-[0.3125rem]">
    <p
      className="max-w-28 overflow-hidden text-ellipsis text-base text-neutral-border-50"
      onClick={() => onSearch(keyword)}
    >
      {keyword}
    </p>
    <button type="button" onClick={() => onDelete(id)}>
      <Close
        aria-label="delete keyword"
        className="h-3 w-3 text-neutral-border-50"
      />
    </button>
  </div>
);

export const RecentSearch = ({
  setInputValue,
  startSearch,
  data,
  deleteKeyword,
  error,
}) => {
  const handleSearchClick = (keyword) => {
    setInputValue(keyword);
    startSearch(keyword);
  };

  const handleDeleteClick = (id) => {
    deleteKeyword(id);
  };

  const handleDeleteAll = () => {
    deleteKeyword(null);
  };

  let content;
  if (error) {
    content = (
      <p className="pt-4 text-base text-primary-red">
        Failed to load keywords. Please try again later.
      </p>
    );
  } else if (data?.keywords?.length) {
    content = (
      <div className="flex max-h-24 flex-wrap gap-3 overflow-hidden">
        {data.keywords.map((item) => (
          <RecordBox
            key={item.id ?? item.keyword}
            keyword={item.keyword}
            id={item.id}
            onSearch={handleSearchClick}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <div className="pt-4 text-base text-neutral-border-50">
        There are no recent searches.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-[0.875rem] pt-4">
      <div className="flex w-full items-end justify-between">
        <h1 className="text-subTitle text-neutral-border-50">
          Recent searches
        </h1>
        <button type="button" onClick={handleDeleteAll}>
          <h2 className="text-base text-neutral-border-40">Delete all</h2>
        </button>
      </div>
      {content}
    </div>
  );
};
