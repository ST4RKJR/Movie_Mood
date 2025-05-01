import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/main/header/Header";
import Homepage from "./components/main/home/Homepage";
import SingleMoviePage from "./components/reusableComponents/singlePage/SingleMoviePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="movies/:movieId" element={<SingleMoviePage />} />
      </Routes>
    </>
  );
}
export default App;
