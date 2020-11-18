import React from "react";

import styles from "./FormGroup.module.css";

type FormGroupProps = {
    title: string;
};

export const FormGroup: React.FC<FormGroupProps> = ({ title, children }) => {
    return (
        <section className={styles.group}>
            <div className={styles.title}>{title}</div>
            <div>{children}</div>
        </section>
    );
};
