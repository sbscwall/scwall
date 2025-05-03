import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import "../../css/searchbar.css"; 
import "../../css/global.css";

export function SearchBar({ placeholder = "Search...", className = "", ...props }) {
  return (
    <div className={`search-bar-container ${className}`}>
      <Search className="search-icon" />
      <Input
        {...props}
        type="text"
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
}
