import { FC, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface SearchbarProps {
  category?: string;
}

const Searchbar: FC<SearchbarProps> = ({ category }) => {
  const router = useNavigate();
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router(`/board?category=${category ?? "all"}&search=${input}`);
        }}
      >
        <input
          className="w-full text-xs bg-secondary px-2 py-1 md:px-4 md:py-2"
          placeholder="What are you looking for?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="absolute right-1 top-1 text-lg md:text-xl md:right-2 md:top-1.5 ">
          <FiSearch />
        </button>
        {isSearching && <div className="w-full"></div>}
      </form>
    </div>
  );
};

export default Searchbar;
