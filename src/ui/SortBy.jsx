import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const sortBy = searchParam.get("sortBy") || "";

  function handleChange(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchParam(searchParam);
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      type="white"
      value={sortBy}
    />
  );
}

export default SortBy;
