import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';

function AppHeader() {
	return (
		<header>
			<nav>
				<ul className={`${styles.nav} pb-4 pt-4`}>
					<li className={`${styles.nav__item} p-5 mr-2`}>
						<BurgerIcon type="primary" />
						<span className="text text_type_main-small ml-2">Конструктор</span>
					</li>
					<li className={`${styles.nav__item} p-5`}>
						<ListIcon type="secondary" />
						<span className="text text_type_main-small text_color_inactive ml-2">Лента заказов</span>
					</li>
					<li className={`${styles.logo} ${styles.nav__item}`}>
						<Logo />
					</li>
					<li className={`${styles.nav__item} p-5`}>
						<ProfileIcon type="secondary" />
						<span className="text text_type_main-small text_color_inactive ml-2">Личный кабинет</span>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default AppHeader;