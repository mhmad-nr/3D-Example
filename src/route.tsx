import { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { MainLayout } from './layouts';

const Home = lazy(() => import('./pages/SmallVillage'));

const AppRoute = () => {

    return (
        <>

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRoute;


const NotFound = () => {
    return (
        <div className='h-screen flex justify-center items-center text-9xl bg-C4'>Not Found</div>
    )
}
