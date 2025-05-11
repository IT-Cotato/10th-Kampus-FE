import { cn } from '@/utils/cn';
import { formatPrice } from '@/utils/formatPrice';

export const WritePrice = ({ price, setPrice, placeholder }) => {
  const handleOnChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw.length > 9) return;
    setPrice(raw);
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="writePrice" className="text-title-bold-16">
        Price
      </label>
      <div className="relative h-fit w-full text-neutral-title">
        <span
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center px-[1.125rem]',
            {
              'text-neutral-border-50': !price,
            },
          )}
        >
          ₩
        </span>
        <input
          className="box-border flex h-full w-full flex-row gap-2 rounded-lg border border-neutral-border-30 py-[1.125rem] pl-10 pr-[.875rem] leading-none placeholder-neutral-border-50"
          id="writePrice"
          type="text"
          placeholder={placeholder}
          value={formatPrice(price)}
          onChange={handleOnChange}
          autoComplete="off"
          required
        />
      </div>
    </div>
  );
};
