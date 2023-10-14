import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useDispatch } from "../../utils/hooks";
import { useEffect, FC } from "react";
import { checkUserAuth, getIngredients } from "../../services/actions";
import AppRoutes from "../app-routes/app-routes";


const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(getIngredients());
    dispatch(checkUserAuth());
	}, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRoutes />
    </div>
  );
};

export default App;
