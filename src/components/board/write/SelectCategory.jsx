import { InputWarningText } from '@/components/common/InputWarningText';
import { cn } from '@/utils/cn';

export const SelectCategory = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  categoryRef,
  invalid = false,
  setInvalid = null,
  max = 9999,
}) => {
  const handleOnChange = (e) => {
    if (e.target.checked) {
      if (selectedCategory.length < max) {
        setSelectedCategory((prev) => [...prev, e.target.id]);
        setInvalid(false);
      }
    } else {
      setSelectedCategory([
        ...selectedCategory.filter((category) => category !== e.target.id),
      ]);
    }
  };
  return (
    <div
      className={cn('flex flex-col gap-4', {
        'gap-2': invalid,
      })}
    >
      <div className="text-title-bold-16 text-black">Category</div>
      {invalid && (
        <InputWarningText>
          Please select at least one category.
        </InputWarningText>
      )}
      <div className="flex w-full flex-wrap gap-3" ref={categoryRef}>
        {categories.map((category) => (
          <div className="box-border flex" key={category}>
            <input
              type="checkbox"
              name="category"
              id={category}
              className="peer hidden"
              onChange={handleOnChange}
              checked={selectedCategory.includes(category)}
            />
            <label
              htmlFor={category}
              className="border-box flex cursor-pointer items-center rounded-full border border-neutral-border-30 px-3 py-[.375rem] text-neutral-border-50 peer-checked:border-primary-30 peer-checked:bg-primary-30 peer-checked:text-title-bold-16 peer-checked:text-white"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
