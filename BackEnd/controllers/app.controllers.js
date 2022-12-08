import App from "../models/App.js";
import { uploadImage } from "../libs/claudinary.js";
import { APP_INFO_ID } from "../config.js";
import fs from "fs-extra";

export const controller = {
    setAppInfo: async function (req, res) {
        const setAppInfo = new App();
        const params = req.body;
        let image;

        if (req.files.appLogo) {
            const result = await uploadImage(req.files.appLogo.tempFilePath);
            image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
            await fs.remove(req.files.appLogo.tempFilePath);
        }

        setAppInfo.appName = params.appName;
        setAppInfo.appLogo = image;

        setAppInfo.save((err, infoSaved) => {
            if (err) {
                return res.status(500).send({
                    message: "Error al configurar la informacion de la App",
                });
            }
            if (!infoSaved) {
                return res.status(500).send({
                    message:
                        "No se ha podido configurar la informacion de la App",
                });
            }
            if (infoSaved) {
                return res.status(200).send({ user: infoSaved });
            }
        });
    },

    getAppInfo: function (req, res) {
        App.findById(APP_INFO_ID, (err, appInfo) => {
            if (err)
                return res.status(500).send({
                    message: "Error al recuperar la informacion de la App",
                });
            if (!appInfo)
                return res
                    .status(404)
                    .send({ message: "No existe informacion de la App" });
            return res.status(200).json(appInfo);
        });
    },
};
