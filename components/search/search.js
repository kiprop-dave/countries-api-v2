import { useContext } from "react";
import { Context } from "../../context/themeProvider";
import styles from "./search.module.css";

function Search({ search, filter }) {
  const { isLightMode } = useContext(Context);

  const className = isLightMode ? "lightMode" : "darkelements";

  return (
    <div className={`${styles.container} `}>
      <input
        className={`${styles.searchInput} ${className}`}
        onChange={(e) => search(e.target.value)}
        placeholder="Search for country"
      />
      <div className={`${styles.filterCountries}`}>
        <select
          id="filter"
          // value={filterParam}
          onChange={(e) => filter(e.target.value)}
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
