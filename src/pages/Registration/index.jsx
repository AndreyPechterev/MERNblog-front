import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, fetchAuthRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: "Pypokeeee",
            email: "testwewe@mail.ru",
            password: "1234561",
        },
        mode: "onChange",
    });

    if (isAuth) {
        return <Navigate to="/" />;
    }

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuthRegister(values));
        if ('token' in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="Полное имя"
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    fullWidth
                    {...register("fullName", { required: "Укажите fullName" })}
                />
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                    {...register("email", { required: "Укажите почту" })}
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    fullWidth
                    {...register("password", { required: "Укажите password" })}
                />
                <Button size="large" type="submit" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
