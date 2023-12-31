import { FC } from "react";
import styles from "./404.module.css";

const NotFound: FC = () => {
    return (
        <section className={styles.container}>
            <h1 className={`${styles.header} text text_type_digits-large`}>404</h1>
            <p className={`text text_type_main-large`}>NotFound</p>
        </section>
    )
}

export default NotFound;