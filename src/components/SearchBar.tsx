import { SearchIcon } from "lucide-react";
import { FC } from "react";
interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  return (
    <>
      <div className="relative rounded-md bg-[#F2F2F2] flex items-center p-2">
        <SearchIcon
          stroke="rgb(156 163 175 / 1)"
          // stroke="#rgb(124,124,124)"
          size={"12px"}
          className="absolute left-3 top-[48%] transform -translate-y-1/2"
        />
        {/* <SearchIcon className="absolute top-1/2 left-1 transform -translate-y-1/2" /> */}
        <input
          type="text"
          placeholder="Search..."
          className="h-4 pl-6 rounded-md text-[12px] bg-[#F2F2F2] outline-none placeholder-gray-400 text-gray-400"
        />
      </div>
    </>
  );
};

export default SearchBar;
