import styles from './order-ingredients-icons.module.css';

function OrderIngredientsIcons({ icons }) {

    return (
        <ul className={styles.container}>
            {icons.slice(0, 5).map((icon, index) => 
                <li
                    className={styles.icon_container}
                    key={index}
                    style={{
                        zIndex: 6 - index,
                        transform: `translateX(-${15 * index}px)`,
                    }}
                >
                    <img className={styles.icon} src={icon.image} alt={icon.name} />
                </li>
            )}
            {icons.length > 5 && (
                <li
                    className={styles.icon_container}
                    style={{
                        zIndex: 1,
                        transform: `translateX(-75px)`,
                    }}
                >
                    <img className={styles.icon} src={icons[5].image} alt={icons[5].name} />
                    <span className={`${styles.others_text} text text_type_digits-default`}>
                        {`+${icons.length - 5}`}
                    </span>
                </li>
            )}
        </ul>
    )
};

export default OrderIngredientsIcons;