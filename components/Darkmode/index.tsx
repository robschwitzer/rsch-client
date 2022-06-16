import React, { useRef } from "react";
import styles from "./style.module.css";

import useToggleDarkmode from "lib/useToggleDarkmode";

/** @me - using css modules because of tailwind limitations with pseudo elements/selectors. Perhaps take a look if there is a solution for this in TW */

function Darkmode() {
  const ref = useRef<HTMLInputElement>(null); 
  const { toggle, isDarkmode } = useToggleDarkmode(ref);

  return (
    <div className="flex flex-row place-content-end items-start mr-2 mb-4 md:mb-0">
      <p className="mr-4 text-xl text-center">{isDarkmode ? "🌙" : "☀️"}</p>
      <div className={styles.toggleSwitch}>
        <label className={styles.label}>
          <input className={styles.input} type="checkbox" ref={ref} />
          <span onClick={toggle} className={styles.slider} />
        </label>
      </div>
    </div>
  );
}

export default Darkmode;
