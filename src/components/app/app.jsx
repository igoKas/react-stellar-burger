import React from "react";
import { v4 } from 'uuid';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/Ingredient-details";
import OrderDetails from "../order-details/order-details";
import { BurgerContext } from "../../utils/burgerContext";
import { getIngredients, postOrderInfo } from "../../utils/api";

function App() {
  const [ingredients, setIngredients] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  const [orderInfo, setOrderInfo] = React.useState({
    isLoading: false,
    hasError: false,
    data: ''
  });
  const [modalState, setModalState] = React.useState(false);
  const [modalIngredient, setModalIngredient] = React.useState({});
  const [currentModal, setCurrentModal] = React.useState('');

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const openIngredientModal = ingredient => {
    constructorDispatcher({type: 'add', payload: {...ingredient, uuid: v4()}});
    setModalIngredient(ingredient);
    toggleModal();
    setCurrentModal('ingredient');
  };

  const openOrderModal = () => {
    postOrderInfo(setOrderInfo, {
      'ingredients': constructorState.ingredients.map(ingregient => ingregient._id)
    });
    toggleModal();
    setCurrentModal('order');
  };

  React.useEffect(() => {
    getIngredients(setIngredients);
  }, []);

  const initialConstructorState = {ingredients: [], sum: 0};
  function constructorReducer(state, action) {
    switch (action.type) {
      case "add":
        if (action.payload.type !== 'bun') {
          return { ingredients: [...state.ingredients, action.payload], sum: state.sum + action.payload.price };
        }  else {
          const prevBurg = state.ingredients.find(ingredient => ingredient.type === 'bun');
          return {
            ingredients: [...state.ingredients.filter(ingredient => ingredient.type !== 'bun'), action.payload],
            sum: prevBurg ? state.sum + action.payload.price * 2 - prevBurg.price * 2 : state.sum + action.payload.price * 2
          };
        }
      case "delete":
        return {
          ingredients: state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid),
          sum: state.sum - action.payload.price
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    };
  };
  const [constructorState, constructorDispatcher] = React.useReducer(constructorReducer, initialConstructorState);

  return (
    <div className={styles.app}>
      <AppHeader />
      {!ingredients.hasError && ingredients.data.length ? (
        <main className={styles.app__main}>
          <BurgerIngredients data={ingredients.data} toggleModal={openIngredientModal} />
          <BurgerContext.Provider value={{constructorState, constructorDispatcher}}>
            <BurgerConstructor toggleModal={openOrderModal} />
          </BurgerContext.Provider>
        </main>
      ) : ingredients.hasError && console.log(ingredients.error)}

      
      {modalState && (
        <Modal toggleModal={toggleModal}>
          {currentModal === 'ingredient' ?
            <IngredientDetails ingredient={modalIngredient} /> :
            <OrderDetails orderInfo={orderInfo.data} />
          }
        </Modal>)}
    </div>
  );
};

export default App;
