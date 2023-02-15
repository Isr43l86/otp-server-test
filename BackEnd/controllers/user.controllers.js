import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const controller = {
    test: function (req, res) {
        return res.status(200).send("hello world");
    },
    createUser: function (req, res) {
        const newUser = new User();
        const params = req.body;

        newUser.username = params.username;
        newUser.password = params.password;
        newUser.twoFactorAuthentication.activated = false;

        newUser.save((err, userStored) => {
            if (err) {
                return res
                    .status(500)
                    .send({ message: "Error al crear el usuario" });
            }
            if (!userStored) {
                return res
                    .status(500)
                    .send({ message: "No se ha guardado el usuario" });
            }
            if (userStored) {
                return res.status(200).send({ user: userStored });
            }
        });
    },

    enable2FA: function (req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            {
                twoFactorAuthentication: {
                    activated: true,
                    typeOfDelivery: req.body.typeOfDelivery || "plain_text",
                },
            },
            (err, userUpdated) => {
                if (err)
                    return res
                        .status(500)
                        .send({ message: "Error al activar el 2FA" });
                if (!userUpdated)
                    return res.status(404).send({
                        message: "No se puedo activar el 2FA",
                    });
                return res.status(201).send({ user: userUpdated });
            }
        );
    },

    disable2FA: function (req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            {
                twoFactorAuthentication: {
                    activated: false,
                },
            },
            (err, userUpdated) => {
                if (err)
                    return res
                        .status(500)
                        .send({ message: "Error al desactivar el 2FA" });
                if (!userUpdated)
                    return res.status(404).send({
                        message: "No se puedo desactivar el 2FA",
                    });
                return res.status(201).send({ user: userUpdated });
            }
        );
    },
    authUser: function (req, res) {
        if (req.body.username === null)
            return res.status(404).send({ message: "El usuario no existe" });

        User.findOne(
            { username: req.body.username, password: req.body.password },
            (err, user) => {
                if (err)
                    return res
                        .status(500)
                        .send({ message: "Error al recuperar al usuario" });
                if (!user)
                    return res
                        .status(404)
                        .send({ message: "El usuario no existe" });
                return res.status(200).send({ user });
            }
        );
    },
};
