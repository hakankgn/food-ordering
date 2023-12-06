import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderItems from '../../orderItems'

const url = 'https://mocki.io/v1/51f76ebc-2c88-4953-86f8-82887dccfa53'

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.quantity = cartItem.quantity + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.quantity = cartItem.quantity - 1
    },
    calculateTotals: (state) => {
      let quantity = 0
      let total = 0
      state.cartItems.forEach((item) => {
        quantity += item.quantity
        total += item.quantity * item.price
      })
      state.quantity = quantity
      state.total = total
    },
  },
  extraReducers: function (builder) {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false
      state.cartItems = action.payload
    })
    builder.addCase(getCartItems.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
