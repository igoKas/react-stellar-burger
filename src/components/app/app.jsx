import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/Ingredient-details";
import OrderDetails from "../order-details/order-details";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../../pages/home/home";
import NotFound from "../../pages/404/404";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import { checkUserAuth, getIngredients } from "../../services/actions";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";


function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(getIngredients());
    dispatch(checkUserAuth());
	}, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login/>} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register/>} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword/>} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword/>} />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile/>} />} />
        <Route path='/feed' element={<p>страница лента заказов</p>} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path="*" element={<h1><NotFound /></h1>} />
      </Routes>


      {background && (
        <Routes>
	        <Route
	          path='/ingredients/:id'
	          element={
	            <Modal>
	              <IngredientDetails />
	            </Modal>
	          }
	        />
          <Route
	          path='/order-info'
	          element={
	            <Modal>
	              <OrderDetails />
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </div>
  );
};

export default App;
