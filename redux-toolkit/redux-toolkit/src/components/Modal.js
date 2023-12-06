import { useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { closeModal } from '../features/modal/modalSlice'

const Modal = () => {
  const dispatch = useDispatch()
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>Bütün ürünler kaldırılsın mı?</h4>
        <div className='btn-container'>
          <button
            className='confirm-btn'
            onClick={() => {
              dispatch(clearCart())
              dispatch(closeModal())
            }}
          >
            Onayla
          </button>
          <button className='clear-btn' onClick={() => dispatch(closeModal())}>
            İptal
          </button>
        </div>
      </div>
    </aside>
  )
}
export default Modal
