import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MainPage } from '@/pages/main';

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    {/* <Route path="/test" element={<TestPage />} /> */}
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
