import React from "react";

import styles from "./FormItem.module.css";

type FormItemProps = {
    title: string;
};

export const FormItem: React.FC<FormItemProps> = ({ title, children }) => {
    return (
        <label>
            <div className={styles.title}>{title}</div>
            {children}
        </label>
    );
};
