import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        dispatch(fetchAuthMe());
    },[]);

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<FullPost />} path="/posts/:id" />
                    <Route element={<AddPost />} path="/posts/:id/edit" />
                    <Route element={<AddPost />} path="/add-post" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Registration />} path="/register" />
                </Routes>
            </Container>
        </>
    );
}

export default App;
