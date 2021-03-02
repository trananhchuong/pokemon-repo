import { lazy } from 'react';

const Generations = lazy(() => import('./components/generations/Generations'));


export const Routes = [
    { id: '/generations', component: Generations, exact: true },
];
