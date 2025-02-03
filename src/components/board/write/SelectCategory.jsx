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
              className="hidden peer"
              onChange={handleOnChange}
              checked={selectedCategory === category}
            />
            <label
              htmlFor={category}
              className="flex items-center px-3 py-[.375rem] border rounded-full cursor-pointer border-neutral-border-30 text-neutral-border-50 border-box peer-checked:border-none peer-checked:bg-primary-30 peer-checked:text-white"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
