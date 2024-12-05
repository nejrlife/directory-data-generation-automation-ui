import './App.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from "./router";
function App() {
  return (
    <>
      <div className='header'>
        <h2>Sponsored List + Blueroom Data Automation</h2>
        <p>Automate data comparison between Sponsored List and Blueroom Data, generating reports that highlight discrepancies.</p>
      </div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
