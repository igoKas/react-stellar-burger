import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/Ingredient-details";
import OrderDetails from "../order-details/order-details";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { modalVisibility, currentModal } = useSelector(store => store.modal);


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app__main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      
      {modalVisibility && (
        <Modal>
          {currentModal === 'ingredient' ?
            <IngredientDetails /> :
            <OrderDetails />
          }
        </Modal>)}
    </div>
  );
};

export default App;
