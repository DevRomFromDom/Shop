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
            const reqObject = query ? { name: query } : {};
            Object.entries(parameters).forEach(([param, values]) => {
                if (values.length > 0) {
                    reqObject[`parameters.${param}`] = values;
                }
            });
            const data = await Product.find(reqObject).exec();
            res.json(data);
        } catch (err) {
            console.log(err);
        }
    });

    app.get("/api/parameters", async (req, res) => {
        const products = await Product.find({});
        const parameterKeys = Object.keys(products[0].parameters).filter(
            (key) => key !== "$init"
        );
        const distinctValues = parameterKeys.reduce((acc, key) => {
            const values = Array.from(
                new Set(products.map((pr) => pr.parameters[key]))
            );
            acc[key] = values;
            return acc;
        }, {});
        res.json(distinctValues);
    });
    app.post("/api/search/name", async (req, res) => {
        await Product.find({ name: req.body.name.name }, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.json(data);
        });
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
