import jwt from "jsonwebtoken";
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import OTPupdate from "../models/OTP.js";

export const controller = {
    generateJWT: function (req, res) {
        User.findOne(
            { _id: req.body.id, username: req.body.username },
            (err, user) => {
                if (err)
                    return res
                        .status(500)
                        .send({ message: "Error al verificar el usuario" });
                if (!user)
                    return res
                        .status(404)
                        .send({ message: "El usuario no existe" });
                jwt.sign(
                    {
                        _id: req.body.id,
                        username: req.body.username,
                    },
                    "secretkey",
                    (err, token) => {
                        return res.status(201).send({ token });
                    }
                );
            }
        );
    },
    sendOTP: function (req, res) {
        jwt.verify(req.token, "secretkey", (err, authData) => {
            if (err) {
                return res
                    .status(403)
                    .send({ message: "Acceso no autorizado" });
            } else {
                OTP.findOneAndUpdate(
                    {
                        userId: req.body.userId,
                        username: req.body.username,
                    },
                    {
                        userId: req.body.userId,
                        username: req.body.username,
                        otpValue: req.body.otpValue,
                    },
                    (err, otpUpdated) => {
                        if (err)
                            return res.status(500).send({
                                message:
                                    "Error al recuperar los registros OTPs",
                            });
                        if (!otpUpdated) {
                            let createOTP = new OTP();
                            createOTP.userId = req.body.userId;
                            createOTP.username = req.body.username;
                            createOTP.otpValue = req.body.otpValue;
                            createOTP.save((err, otpStored) => {
                                if (err) {
                                    return res.status(500).send({
                                        message:
                                            "Error al crear el registro de OTP",
                                    });
                                }
                                if (!otpStored) {
                                    return res.status(500).send({
                                        message: "No se ha guardado el OTP",
                                    });
                                }
                                if (otpStored) {
                                    return res
                                        .status(201)
                                        .send({ otp: otpStored });
                                }
                            });
                        }
                        if (otpUpdated) {
                            return res.status(201).send({ otp: otpUpdated });
                        }
                    }
                );
            }
        });
    },

    verifToken: function (req, res, next) {
        const bearedHeader = req.headers["authorization"];
        if (typeof bearedHeader !== "undefined") {
            const bearerToken = bearedHeader.split(" ")[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(403).send({ message: "Acceso no autorizado" });
        }
    },
};
