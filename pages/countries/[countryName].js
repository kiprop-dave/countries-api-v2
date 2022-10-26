import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import HeaderComponent from "../../components/header/header";
import { Context } from "../../context/themeProvider";
import styles from "../../styles/Country.module.css";

export async function getStaticPaths() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  const paths = countries?.map((country) => ({
    params: { countryName: country.name.common },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${params.countryName}`,
  );
  const country = await res.json();

  return {
    props: {
      country,
    },
  };
}

function Country({ country }) {
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setAllCountries(data));
  }, []);

  const { isLightMode } = useContext(Context);

  const className = isLightMode ? "lightMode" : "darkelements";

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    borders,
    currencies,
    languages,
    tld,
  } = country[0];

  const topDomain = () => {
    if (tld !== undefined) {
      return tld[0];
    } else {
      return "";
    }
  };

  const capitalCity = () => {
    if (capital !== undefined && capital.length > 0) {
      return capital[0];
    } else {
      return "";
    }
  };

  function getNativeName(obj) {
    const firstProp = obj[Object.keys(obj)[0]];
    return firstProp?.common;
  }

  const nativeName = () => {
    if (name.nativeName !== undefined) {
      return getNativeName(name.nativeName);
    } else {
      return "";
    }
  };

  function getCurrency(obj) {
    const firstProp = obj[Object.keys(obj)[0]];
    return firstProp?.name;
  }

  const currency = () => {
    if (currencies !== undefined) {
      return getCurrency(currencies);
    } else {
      return "";
    }
  };

  function getLanguages(obj) {
    const languageProps = Object.keys(obj);
    return languageProps?.map((key) => {
      return obj[key];
    });
  }

  const languageElements = () => {
    if (languages !== undefined) {
      return getLanguages(languages)?.map((thisLanguage, index) => {
        return (
          <span key={index} className={styles.span}>
            {thisLanguage},
          </span>
        );
      });
    } else {
      return "";
    }
  };

  const getBorders = () => {
    if (borders !== undefined) {
      const borderCountries = borders?.map((bord) => {
        const borderCountry = allCountries?.find(
          (item) =>
            item.cioc === bord || item.fifa == bord || item.cca3 == bord,
        );
        return borderCountry;
      });
      return borderCountries;
    } else {
      return undefined;
    }
  };

  const borderElements = () => {
    if (getBorders() !== undefined) {
      return getBorders().map((thisCountry, index) => (
        <Link href={`/countries/${thisCountry?.name.common}`} key={index}>
          <a className={`${styles.span} ${styles.borders} ${className}`}>
            {thisCountry?.name.common}
          </a>
        </Link>
      ));
    } else {
      return <span className={styles.span}> No borders</span>;
    }
  };

  return (
    <>
      <Head>
        <title>{name.common}</title>
      </Head>
      <header>
        <HeaderComponent />
      </header>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href={"/"}>
            <a className={`${styles.back} ${className}`}>
              <h1>Back</h1>
            </a>
          </Link>
        </nav>
        <main className={`${styles.main}`}>
          <Image
            src={flags.png}
            alt="country flag"
            width={490}
            height={350}
            className={styles.flag}
          />
          <div className={styles.details}>
            <div className={styles.section1}>
              <h1>{name?.common}</h1>
              <h4>
                Native Name:
                <span className={styles.span}> {nativeName()}</span> <br />
                Population:
                <span className={styles.span}> {population}</span> <br />
                Region:
                <span className={styles.span}> {region}</span> <br />
                Subregion:
                <span className={styles.span}> {subregion}</span> <br />
                Capital:
                <span className={styles.span}> {capitalCity()}</span> <br />
              </h4>
            </div>
            <div className={styles.section2}>
              <h4>
                Top Level Domain:
                <span className={styles.span}> {topDomain()}</span> <br />
                Currency:
                <span className={styles.span}> {currency()}</span> <br />
                Languages: {languageElements()}
              </h4>
            </div>
            <div className={styles.section3}>
              <h4>Border Countries: </h4>
              <div className={styles.bordersContainer}>{borderElements()}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Country;
