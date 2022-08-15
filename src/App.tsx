import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Moive from './routes/movie';
import Movies from './routes/movies';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Movies />} />
        <Route path='/movies/:id' element={<Moive />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
