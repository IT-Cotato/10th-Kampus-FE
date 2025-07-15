// @ts-ignore
import { useGetCategory } from '@/state/query/admin/useGetCategory';
import { usePostCategory } from '@/state/mutation/admin/usePostCategory';
import { useState } from 'react';
import { Toast } from '@/components/common/toast';

export const ManageCategory = () => {
  const [categoryValue, setCategoryValue] = useState('');

  const { data: categoryList, isError: categoryError } = useGetCategory();
  const { mutate: createCategory } = usePostCategory();

  const handleAddCategory = () => {
    setCategoryValue('');
    createCategory(categoryValue);
  };

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <div className="flex h-fit w-full flex-col gap-5 rounded-2xl bg-white p-8">
        <h1 className="text-pageTitle">카테고리 목록</h1>
        <div className="flex flex-wrap gap-2">
          {categoryError && (
            <p className="mt-4 text-base text-primary-red">
              카테고리를 불러오는데 실패하였습니다.
            </p>
          )}
          {!categoryError &&
            categoryList?.map((category) => (
              <div
                key={`category-${category.id}`}
                className="box-border flex flex-shrink-0 items-center justify-center gap-2 rounded-3xl border border-primary-30 bg-primary-5 pl-4 pr-3"
              >
                {category.categoryName}
              </div>
            ))}
        </div>
      </div>
      <div className="flex h-fit w-full flex-col gap-5 rounded-2xl bg-white p-8">
        <h1 className="text-pageTitle">카테고리 추가</h1>
        <input
          type="text"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
          placeholder="카테고리 입력"
          className="box-border w-32 rounded-md border border-neutral-border-50 px-4 py-1 placeholder:text-center placeholder:text-base placeholder:text-neutral-border-50"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          disabled={categoryValue.trim() === ''}
          className="box-border w-32 rounded-md bg-primary-base py-1 font-semibold text-white"
        >
          추가하기
        </button>
      </div>
      <Toast />
    </div>
  );
};
