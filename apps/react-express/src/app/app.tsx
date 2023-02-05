import React, { useEffect, useState } from 'react';
import { Message } from '@my-project/api-interfaces';
import { GlobalProvider } from '../context/Global';
// import Layout from '../layout/Global';
import GlobalJoy from '../layout/GlobalJoy';
import HomePage from '../page/home';
import ModalPage from '../page/ModalPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalProvider />,
    children: [
      { 
        path: '/',
        element: <GlobalJoy />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/modal', element: <ModalPage /> },
        ]
      }
    ],
  }
])

const App = () => (<RouterProvider router={router} />)
export default App;
