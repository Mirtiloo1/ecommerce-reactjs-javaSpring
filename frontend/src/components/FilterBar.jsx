import { ChevronDown } from "lucide-react";

function FilterBar({ currentSort, onSortChange }) {
  const sortOptions = [
    { key: "alpha", label: "Ordem Alfabética" },
    { key: "price-asc", label: "Menor Preço" },
    { key: "price-desc", label: "Maior Preço" },
  ];

  return (
    <div className="relative flex items-center gap-2">
      <label
        htmlFor="sort-select"
        className="text-[#B0B0B8] font-semibold text-sm"
      >
        Ordenar por:
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none bg-[#2A2A30] border-2 border-[#4A4A52] rounded-md py-2 pl-3 pr-8 text-white font-Roboto text-sm focus:ring-[#5A5AFA] focus:border-[#5A5AFA] transition cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <ChevronDown size={16} />
      </div>
    </div>
  );
}

export default FilterBar;
