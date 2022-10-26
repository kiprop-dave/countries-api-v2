import { useContext } from "react";
import { Context } from "../../context/themeProvider";
import styles from "./search.module.css";

function Search() {
  const { isLightMode } = useContext(Context);

  const className = isLightMode ? "lightMode" : "darkelements";

  return (
    <div className={`${styles.container} `}>
      <input
        className={`${styles.searchInput} ${className}`}
        placeholder="Search for country"
      />
      <div className={`${styles.filterCountries}`}>
        <select
          id="filter"
          // value={filterParam}
          // onChange={handleFilter}
          name="filter"
          className={`${styles.select} ${className}`}
        >
          <option value="" className="filter-label">
            Filter By Region
          </option>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Americas">Americas</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Polar</option>
        </select>
      </div>
    </div>
  );
}

export default Search;
