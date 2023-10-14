import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';
import { NavLink, useMatch } from "react-router-dom";
import { FC } from "react";

const AppHeader: FC = () => {
	const isHome = useMatch("/");
	const isFeed = useMatch("/feed/*");
	const isProfile = useMatch("/profile/*");

	return (
		<header>
			<nav>
				<ul className={`${styles.nav} pb-4 pt-4`}>
					<li>
						<NavLink to={`/`} className={({isActive}) => isActive ? styles.link : styles.link_inactive}>
							<BurgerIcon type={isHome ? "primary" : "secondary"} />
							<span className="text text_type_main-small mr-15">Конструктор</span>
						</NavLink>
					</li>
					<li>
						<NavLink to={`/feed`} className={({isActive}) => isActive ? styles.link : styles.link_inactive}>
							<ListIcon type={isFeed ? "primary" : "secondary"} />
							<span className="text text_type_main-small">Лента заказов</span>
						</NavLink>
					</li>
					<li className={`${styles.logo}`}>
						<Logo />
					</li>
					<li>
						<NavLink to={`/profile`} className={({isActive}) => isActive ? styles.link : styles.link_inactive}>
							<ProfileIcon type={isProfile ? "primary" : "secondary"} />
							<span className="text text_type_main-small">Личный кабинет</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default AppHeader;