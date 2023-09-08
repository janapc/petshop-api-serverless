"use client";

import styles from "./toast.module.css";

type Props = { msg: string };

export default function Toast(props: Props) {
  return (
    <div className={styles.toast}>
      <p>{props.msg}</p>
    </div>
  );
}
