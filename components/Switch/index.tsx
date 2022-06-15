import React, { MouseEventHandler } from "react";
import styles from "./style.module.css";

interface Props {
  onClick: MouseEventHandler<any>;
}

function Switch({ onClick }: Props) {
  return (
    <div className={styles.toggleSwitch}>
      <label className={styles.label}>
        <input className={styles.input} type="checkbox" id="darkmode-switch" />
        <span onClick={onClick} className={styles.slider} />
      </label>
    </div>
  );
}

export default Switch;
