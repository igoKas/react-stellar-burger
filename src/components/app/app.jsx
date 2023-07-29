import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/Ingredient-details";
import OrderDetails from "../order-details/order-details";
import { BurgerContext } from "../../utils/burgerContext";

function App() {
  const getIngredientsEndpoint = 'https://norma.nomoreparties.space/api/ingredients';
  const postOrderEndpoint = 'https://norma.nomoreparties.space/api/orders';

  const [ingredients, setIngredients] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  const [modalState, setModalState] = React.useState(false);
  const [modalIngredient, setModalIngredient] = React.useState({});
  const [currentModal, setCurrentModal] = React.useState('');
  const [orderInfo, setOrderInfo] = React.useState({
    isLoading: false,
    hasError: false,
    data: ''
  });

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const openIngredientModal = (ingredient) => {
    constructorDispatcher({type: 'add', payload: ingredient});
    setModalIngredient(ingredient);
    toggleModal();
    setCurrentModal('ingredient');
  };

  const openOrderModal = () => {
    postOrderInfo();
    toggleModal();
    setCurrentModal('order');
  };

  const postOrderInfo = () => {
    setOrderInfo(prevOrderInfo => ({...prevOrderInfo, isLoading: true}));
    fetch(postOrderEndpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'ingredients': constructorState.ingredients.map(ingregient => ingregient._id)})
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => setOrderInfo(prevOrderInfo => ({...prevOrderInfo, data: data.order.number.toString(), hasError: false, isLoading: false})))
      .catch(e => {
        console.log(e)
        setOrderInfo(prevOrderInfo => ({...prevOrderInfo, hasError: true, isLoading: false, error: e}))
      });
  };

  const getIngredients = () => {
    setIngredients(prevIngredients => ({ ...prevIngredients, isLoading: true }));
    fetch(getIngredientsEndpoint)
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => setIngredients(prevIngredients => ({ ...prevIngredients, data: data.data, hasError: false, isLoading: false })))
      .catch(e => {
        console.log(e)
        setIngredients(prevIngredients => ({ ...prevIngredients, hasError: true, isLoading: false, error: e }));
      });
  };

  React.useEffect(() => {
    getIngredients();
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
          ingredients: [...state.ingredients.filter(ingredient => ingredient._id !== action.payload._id)],
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
