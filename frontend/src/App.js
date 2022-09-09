import React from 'react';
import { Route, Routes } from "react-router-dom";
import AppRoutes from './appRoutes';
import Home from './home';
import Login from './components/login';
import TodoList from './components/todolist';


function App() {
    
    // let routes = (
    //     <Routes>
    //         <Route exact path='/'>
    //             <Home />
    //         </Route>
    //         <Route exact path='/login'>
    //             <Login />
    //         </Route>
    //         <Route exact path='/todolist'>
    //             <TodoList />
    //         </Route>
    //     </Routes>
    // );

    return (
        <div className="align-middle">
            <AppRoutes />
            {/* <Home /> */}
        </div>
    );
};
export default App;