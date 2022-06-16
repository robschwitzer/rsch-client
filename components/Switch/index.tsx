import React, { MouseEventHandler, RefObject, forwardRef } from "react";
import styles from "./style.module.css";

interface Props {
  onClick: MouseEventHandler<any>;
  switchRef: RefObject<HTMLInputElement>;
}

/** @me - using css modules because of tailwind limitations with pseudo elements/selectors. Perhaps take a look if there is a solution for this in TW */

function Switch({ onClick, switchRef }: Props) {
  return (
    <div className={styles.toggleSwitch}>
      <label className={styles.label}>
        <input className={styles.input} type="checkbox" ref={switchRef} />
        <span onClick={onClick} className={styles.slider} />
      </label>
    </div>
  );
}

export default Switch;
