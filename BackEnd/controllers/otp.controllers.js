import jwt from "jsonwebtoken";
import User from "../models/User.js";
import OTP from "../models/OTP.js";

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
        OTP.findOneAndUpdate(
            {
                userId: req.body.userId,
                username: req.body.username,
            },
            {
                userId: req.body.userId,
                username: req.body.username,
                otpValue: req.body.otpValue,
                socketId: req.body.socketId,
            },
            (err, otpUpdated) => {
                if (err)
                    return res.status(500).send({
                        message: "Error al recuperar los registros OTPs",
                    });
                if (!otpUpdated) {
                    let createOTP = new OTP();
                    createOTP.userId = req.body.userId;
                    createOTP.username = req.body.username;
                    createOTP.otpValue = req.body.otpValue;
                    createOTP.socketId = req.body.socketId;
                    createOTP.save((err, otpStored) => {
                        if (err) {
                            return res.status(500).send({
                                message: "Error al crear el registro de OTP",
                            });
                        }
                        if (!otpStored) {
                            return res.status(500).send({
                                message: "No se ha guardado el OTP",
                            });
                        }
                        if (otpStored) {
                            return res.status(201).send({ otp: otpStored });
                        }
                    });
                }
                if (otpUpdated) {
                    return res.status(201).send({ otp: otpUpdated });
                }
            }
        );
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

    getOTPinfo: function (req, res, next) {
        OTP.findOne(
            { userId: req.query.userId, username: req.query.username },
            (err, otp) => {
                if (err)
                    return res
                        .status(500)
                        .send({ message: "Error al recuperar el OTP" });
                if (!otp)
                    return res
                        .status(404)
                        .send({ message: "El OTP no existe" });
                return res.status(200).send({ otp });
            }
        );
    },
};
