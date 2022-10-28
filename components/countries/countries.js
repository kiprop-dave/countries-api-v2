import Link from "next/link";
import Image from "next/image";
import styles from "./countries.module.css";

function Country({ country }) {
  const { flags, name, population, continents, capital } = country;
  return (
    <>
      <div className={styles.country}>
        <Link href={`/countries/${name.common}`}>
          <a>
            <Image
              src={flags?.png}
              alt="flag"
              className={styles.countryflag}
              layout={"responsive"}
              width={270}
              height={180}
            />
            <div className={styles.countrydetails}>
              <h3>{name?.common}</h3>
              <p>
                Population:
                <span className="country-stats"> {population}</span>
              </p>
              <p>
                Region:
                <span className="country-stats">
                  {continents?.length ? continents[0] : ""}
                </span>
              </p>
              <p>
                Capital:
                <span className="country-stats">
                  {" "}
                  {capital?.length ? capital[0] : ""}
                </span>
              </p>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}

function Countries({ data }) {
  const countryElements = data.map((country, index) => {
    return <Country key={index} country={country} />;
  });
  return (
    <>
      <div className={styles.container}>{countryElements}</div>
    </>
  );
}

export default Countries;
