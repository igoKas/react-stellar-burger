import styles from "./draggable-items.module.css";
import { useRef } from 'react'
import { ingredientPropType } from '../../utils/prop-types';
import { deleteIngredient, moveIngredient } from '../../services/burger-constructor-slice';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

function DraggableItem({ ingredient, index }) {
	const dispatch = useDispatch();

	const ref = useRef(null)
	const [, drop] = useDrop({
		accept: 'constructorElement',
		hover: (item, monitor) => {
			if (!ref.current) {
        return
      }
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)  {
				return
			}

			dispatch(moveIngredient({
				fromIndex: dragIndex,
				toIndex: hoverIndex
			}))
			item.index = hoverIndex;
		}
	})

	const [{ isDragging }, drag] = useDrag({
		type: 'constructorElement',
		item: () => {
			return { ingredient, index }
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<li ref={ref} className={styles.scrollItem} style={{opacity}}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={() => dispatch(deleteIngredient(ingredient))}
			/>
		</li>
	)
}

DraggableItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default DraggableItem;