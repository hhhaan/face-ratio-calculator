import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage, TestPage } from '@/pages/MainPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
