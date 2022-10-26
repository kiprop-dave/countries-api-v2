import Head from "next/head";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/header/header";
import Search from "../components/search/search";
import Countries from "../components/countries/countries";
import { useState } from "react";

export async function getStaticProps() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
}

export default function Home({ countries }) {
  const [allCountries, setAllCountries] = useState(countries);
  return (
    <>
      <Head>
        <title>World Countries</title>
        <meta
          name="description"
          content="All world countries with details details"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <HeaderComponent />
      </header>
      <div className={styles.container}>
        <nav>
          <Search />
        </nav>
        <main>
          <Countries data={allCountries} />
        </main>
      </div>
    </>
  );
}
