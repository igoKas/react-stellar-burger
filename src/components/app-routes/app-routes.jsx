import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/Ingredient-details";
import OrderDetails from "../order-details/order-details";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "../../pages/home/home";
import NotFound from "../../pages/404/404";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import History from "../../pages/history/history";
import FeedOrderDetails from "../feed-order-details/feed-order-details";
import Feed from "../../pages/feed/feed";

function AppRoutes() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path='/' element={<Home />} />
                <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
                <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
                <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
                <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
                <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
                    <Route path="orders" element={<OnlyAuth component={<History />} />} />
                </Route>
                <Route path="/profile/orders/:orderNumber" element={<OnlyAuth component={<FeedOrderDetails />} />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/feed/:orderNumber' element={<FeedOrderDetails />} />
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
                            <OnlyAuth
                                component={
                                    <Modal>
                                        <OrderDetails />
                                    </Modal>
                                }
                            />
                        }
                    />
                    <Route
                        path='/feed/:orderNumber'
                        element={
                            <Modal>
                                <FeedOrderDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path='/profile/orders/:orderNumber'
                        element={
                            <OnlyAuth
                                component={
                                    <Modal>
                                        <FeedOrderDetails />
                                    </Modal>
                                }
                            />
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default AppRoutes;