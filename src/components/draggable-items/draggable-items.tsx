import styles from "./draggable-items.module.css";
import { useRef, FC } from 'react';
import { deleteIngredient, moveIngredient } from '../../services/burger-constructor-slice';
import { useDispatch } from '../../utils/hooks';
import { useDrop, useDrag, XYCoord } from "react-dnd";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../utils/types";

type Props = {
	ingredient: Ingredient;
	index: number;
}

type DragItem = {
	index: number;
	id: string;
	type: string;
}

const DraggableItem: FC<Props> = ({ ingredient, index }) => {
	const dispatch = useDispatch();

	const ref = useRef<HTMLLIElement>(null)
	const [, drop] = useDrop({
		accept: 'constructorElement',
		hover: (item: DragItem, monitor) => {
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
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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
		<li ref={ref} className={styles.scrollItem} style={{ opacity }}>
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

export default DraggableItem;