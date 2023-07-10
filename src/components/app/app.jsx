import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/Ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients';

  const [ingredients, setIngredients] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });
  const [modalState, setModalState] = React.useState(false);
  const [modalIngredient, setModalIngredient] = React.useState({});
  const [currentModal, setCurrentModal] = React.useState('');

  const toggleModal = () => {
    setModalState(!modalState);
  }

  const openIngredientModal = (ingredient) => {
    setModalIngredient(ingredient);
    toggleModal();
    setCurrentModal('ingredient');
  }

  const openOrderModal = () => {
    toggleModal();
    setCurrentModal('order');
  }

  React.useEffect(() => {
    const getData = () => {
      setIngredients(prevIngredients => ({ ...prevIngredients, isLoading: true }));
      fetch(url)
        .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => setIngredients(prevIngredients => ({ ...prevIngredients, data: data.data, hasError: false, isLoading: false })))
        .catch(e => {
          setIngredients(prevIngredients => ({ ...prevIngredients, hasError: true, isLoading: false, error: e }));
        });
    };
    getData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {!ingredients.hasError && ingredients.data.length ? (
        <main className={styles.app__main}>
          <BurgerIngredients data={ingredients.data} toggleModal={openIngredientModal} />
          <BurgerConstructor data={ingredients.data} toggleModal={openOrderModal} />
        </main>
      ) : ingredients.hasError && console.log(ingredients.error)}

      
      {modalState && (
        <Modal toggleModal={toggleModal}>
          {currentModal === 'ingredient' ?
            <IngredientDetails ingredient={modalIngredient} /> :
            <OrderDetails />
          }
        </Modal>)}
    </div>
  );
}

export default App;
