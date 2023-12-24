interface SelectPageProps {
  pages: string[];
  page: string;
  onPageChange: (page: string) => void;
}

function SelectPage({ pages, page, onPageChange }: SelectPageProps) {
  return (
    <label className="flex items-center gap-2 text-xl">
      <span className="font-semibold">Page:</span>
      <select
        value={page}
        onChange={({ currentTarget: { value } }) => onPageChange(value)}
      >
        {pages.map((url) => (
          <option key={url} value={url}>
            {url}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectPage;
