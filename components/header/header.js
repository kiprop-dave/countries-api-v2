import Image from "next/image";
import { useContext, useEffect } from "react";
import styles from "./header.module.css";
import { Context } from "../../context/themeProvider";

function HeaderComponent() {
  const { flipTheme, isLightMode } = useContext(Context);

  const darkOrLight = isLightMode ? "lightMode" : "darkMode";

  const className = isLightMode ? "lightMode" : "darkelements";

  useEffect(() => {
    document.body.classList.add(darkOrLight);

    return () => document.body.classList.remove(darkOrLight);
  }, [darkOrLight]);

  const imageSrc = isLightMode ? "/dark-mode.svg" : "/light-mode.svg";
  return (
    <div className={`${styles.container} ${className}`}>
      <h1 className={styles.header}>Where in the World</h1>
      <div className={styles.toggleContainer} onClick={() => flipTheme()}>
        <Image src={imageSrc} alt="dark or light mode" width={30} height={30} />
        <h2>{isLightMode ? "Light Mode" : "Dark Mode"}</h2>
      </div>
    </div>
  );
}

export default HeaderComponent;
