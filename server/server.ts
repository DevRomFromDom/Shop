import path from "path";
import Product from "./src/models/Product";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { SearchRequest } from "./types";
const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017", {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("connected to DB");
    } catch (e) {
        console.log(e);
    }
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.get("/", (req, res) => {
        res.send("server is up and running");
    });

    app.use(express.static(path.resolve(__dirname, "../shop/public")));

    app.post("/api", async (req, res) => {
        try {
            const newProduct = new Product({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                parameters: req.body.parameters,
            });
            newProduct.save((err) => {
                if (err) throw err;
                console.log("add new product!");
            });
        } catch (e) {
            console.log(e);
        }
        res.send(req.statusCode);
    });

    app.post("/api/search/all", async (req, res) => {
        try {
            const { query, parameters }: SearchRequest = req.body;
            if (query.name === "" && query.parameter === "") {
                const reqObj = {};
                Object.entries(parameters).forEach(([param, values]) => {
                    if (values.length > 0) {
                        reqObj[`parameters.${param}`] = values;
                    }
                });
                const data = await Product.find(reqObj).exec();
                res.json(data);
            }
            if (query.name !== "" && query.parameter === "") {
                const reqObj = {
                    name: { $regex: `${query.name}`, $options: "i" },
                };
                Object.entries(parameters).forEach(([param, values]) => {
                    if (values.length > 0) {
                        reqObj[`parameters.${param}`] = values;
                    }
                });

                const data = await Product.find(reqObj).exec();
                res.json(data);
            }
            if (query.name === "" && query.parameter !== "") {
                console.log(query.parameter);
                const reqObj = {
                    $where: `function () {
                        for (let key in this) {
                            if (typeof this[key] === "object") {
                                for (let k in this[key]) {
                                    if ((new RegExp("${query.parameter}", "i")).test(String(this[key][k]))) {
                                        return true
                                    }
                                }
                            }
                        }
                        return false;
                    }`,
                };
                Object.entries(parameters).forEach(([param, values]) => {
                    if (values.length > 0) {
                        reqObj[`parameters.${param}`] = values;
                    }
                });
                const data = await Product.find(reqObj).exec();
                res.json(data);
            }
            if (query.name !== "" && query.parameter !== "") {
                const reqObj = {
                    name: { $regex: `${query.name}`, $options: "i" },
                    $where: `function () {
                        for (let key in this) {
                            if (typeof this[key] === "object") {
                                for (let k in this[key]) {
                                    if ((new RegExp("${query.parameter}", "i")).test(String(this[key][k]))) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    }`,
                };
                Object.entries(parameters).forEach(([param, values]) => {
                    if (values.length > 0) {
                        reqObj[`parameters.${param}`] = values;
                    }
                });
                const data = await Product.find(reqObj).exec();
                res.json(data);
            }
        } catch (err) {
            console.log(err);
        }
    });

    app.post("/api/parameters", async (req, res) => {
        const name = req.body.name;
        const param = req.body.parameter;
        if (name === "" && param === "") {
            const products = await Product.find({});
            if (products.length !== 0) {
                const parameterKeys = Object.keys(
                    products[0].parameters
                ).filter((key) => key !== "$init");
                const distinctValues = parameterKeys.reduce((acc, key) => {
                    const values = Array.from(
                        new Set(products.map((pr) => pr.parameters[key]))
                    );
                    acc[key] = values;
                    return acc;
                }, {});
                res.json(distinctValues);
            } else res.json({});
        }
        if (name !== "" && param === "") {
            const products = await Product.find({
                name: { $regex: `${name}`, $options: "i" },
            });
            if (products.length !== 0) {
                const parameterKeys = Object.keys(
                    products[0].parameters
                ).filter((key) => key !== "$init");
                const distinctValues = parameterKeys.reduce((acc, key) => {
                    const values = Array.from(
                        new Set(products.map((pr) => pr.parameters[key]))
                    );
                    acc[key] = values;
                    return acc;
                }, {});
                res.json(distinctValues);
            } else res.json({});
        }
        if (name === "" && param !== "") {
            const products = await Product.find({
                $where: `function () {
                        for (let key in this) {
                            if (typeof this[key] === "object") {
                                for (let k in this[key]) {
                                    if ((new RegExp("${param}", "i")).test(String(this[key][k]))) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    }`,
            });
            if (products.length !== 0) {
                const parameterKeys = Object.keys(
                    products[0].parameters
                ).filter((key) => key !== "$init");
                const distinctValues = parameterKeys.reduce((acc, key) => {
                    const values = Array.from(
                        new Set(products.map((pr) => pr.parameters[key]))
                    );
                    acc[key] = values;
                    return acc;
                }, {});
                res.json(distinctValues);
            } else res.json({});
        }
        if (name !== "" && param !== "") {
            const products = await Product.find({
                name: { $regex: `${name}`, $options: "i" },
                $where: `function () {
                        for (let key in this) {
                            if (typeof this[key] === "object") {
                                for (let k in this[key]) {
                                    if ((new RegExp("${param}", "i")).test(String(this[key][k]))) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    }`,
            });
            if (products.length !== 0) {
                const parameterKeys = Object.keys(
                    products[0].parameters
                ).filter((key) => key !== "$init");
                const distinctValues = parameterKeys.reduce((acc, key) => {
                    const values = Array.from(
                        new Set(products.map((pr) => pr.parameters[key]))
                    );
                    acc[key] = values;
                    return acc;
                }, {});
                res.json(distinctValues);
            } else res.json({});
        }
    });

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../shop/public", "index.html"));
    });

    app.use((err, res, req) => {
        console.log(err);
        res.status(500).send("somthing broke!!!");
    });

    server.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    });
})();
