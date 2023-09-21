import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth, getIngredients } from "../../services/actions";
import AppRoutes from "../app-routes/app-routes";


function App() {
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
