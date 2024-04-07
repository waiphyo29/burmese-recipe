
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import HomePage from './page/HomePage';
import FavoritePage from './page/FavoritePage';
import DetailPage from './page/DetailPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/:recipeId' element={<DetailPage/>}/>
        <Route path='/favorite' element={<FavoritePage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
