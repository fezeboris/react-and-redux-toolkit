
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset, setValue } from './features/couter/counterSlice'
import './App.css'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <div className="">{count}</div>
      <button onClick={() => {
        dispatch(increment())
      }}>Increment</button>
      <button onClick={() => {
        dispatch(decrement())
      }}>Decrement</button>
      <button onClick={() => {
        dispatch(reset())
      }}>Reset</button>
      <button onClick={() => {
        dispatch(setValue(5))
      }}>set value</button>
    </>
  )
}

export default App
