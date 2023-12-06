import { useSelector, useDispatch } from 'react-redux'
import OrderItem from './OrderItem'
import { clearCart } from '../features/cart/cartSlice'
import { openModal } from '../features/modal/modalSlice'
const OrderList = () => {
  const dispatch = useDispatch()
  const { cartItems, quantity, total } = useSelector((store) => store.cart)
  if (quantity < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>Sepetiniz</h2>
          <h4>Boş</h4>
        </header>
      </section>
    )
  }
  return (
    <section className='cart'>
      <header>
        <h2>Sepetiniz</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <OrderItem key={item.id} {...item} />
        })}
      </div>
      <footer>
        <hr />
        <h4>
          Toplam Tutar: <span>{total}</span>
        </h4>
        <button className='cart-clear' onClick={() => dispatch(openModal())}>
          Sepeti Temizle
        </button>
      </footer>
    </section>
  )
}
export default OrderList
