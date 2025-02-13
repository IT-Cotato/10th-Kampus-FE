import { Categories } from '@/constants/categories';

export const SelectCategory = ({ selectedCategory, setSelectedCategory }) => {
  const CategoryList = [...Categories];
  const handleOnChange = (e) => {
    setSelectedCategory(e.target.id);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-subTitle">Category</div>
      <div className="flex w-full gap-3">
        {CategoryList.map((category) => (
          <div className="box-border flex" key={category}>
            <input
              type="radio"
              name="category"
              id={category}
              className="peer hidden"
              onChange={handleOnChange}
              checked={selectedCategory === category}
            />
            <label
              htmlFor={category}
              className="border-box flex cursor-pointer items-center rounded-full border border-neutral-border-30 px-3 py-[.375rem] text-neutral-border-50 peer-checked:border-primary-30 peer-checked:bg-primary-30 peer-checked:text-white"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
