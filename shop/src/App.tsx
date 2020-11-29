import React, { useState } from "react";
import Search from "./components/Search/Search";
import AddProduct from "./components/AddProduct/AddProduct";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, ThemeProvider, FLAT_THEME } from "@skbkontur/react-ui";

export const SearchValueContext = React.createContext<object>({});

export default function App() {
    const [inputValueName, setInputValueName] = useState("");
    const [inputValueParameter, setInputValueParameter] = useState("");
    const [searchValue, setSearchValue] = useState<object>({
        name: "",
        parameter: "",
    });

    const searchValueSend = () => {
        setSearchValue({
            name: inputValueName.trim(),
            parameter: inputValueParameter.trim(),
        });
        setInputValueName(inputValueName.trim());
        setInputValueParameter(inputValueParameter.trim());
    };
    const searchAll = () => {
        setSearchValue({
            name: "",
            parameter: "",
        });
        setInputValueParameter("");
        setInputValueName("");
    };
    const addProd = () => {
        setInputValueParameter("");
        setInputValueName("");
    };

    return (
        <Router>
            <SearchValueContext.Provider value={searchValue}>
                <ThemeProvider value={FLAT_THEME}>
                    <div className={styles.App}>
                        <div className={styles.head}></div>
                        <div className={styles.navbar}>
                            <div className={styles.shop}>
                                <Link to="/">
                                    <button
                                        className={styles.shop_button}
                                        onClick={() => searchAll()}
                                    >
                                        Магазин
                                    </button>
                                </Link>
                            </div>

                            <form
                                className={styles.search_form}
                                autoComplete="off"
                            >
                                <input
                                    className={styles.input_search_name}
                                    placeholder="Название"
                                    name="search"
                                    type="text"
                                    autoFocus
                                    value={inputValueName}
                                    onChange={(e) =>
                                        setInputValueName(e.target.value)
                                    }
                                />
                                <input
                                    className={styles.input_search_parameters}
                                    placeholder="Характеристика"
                                    type="text"
                                    value={inputValueParameter}
                                    onChange={(e) =>
                                        setInputValueParameter(e.target.value)
                                    }
                                />
                                <Link to="/">
                                    <button
                                        className={styles.search_button}
                                        onClick={() => searchValueSend()}
                                    >
                                        Найти
                                    </button>
                                </Link>
                            </form>
                            <div className={styles.addproduct}>
                                <Link to="/addproduct">
                                    <Button
                                        use="success"
                                        onClick={() => addProd()}
                                    >
                                        Добавить товар
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.view}>
                            <div className={styles.body_view}>
                                <Switch>
                                    <Route path="/addproduct">
                                        <AddProduct />
                                    </Route>
                                    <Route path="/">
                                        <Search />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </SearchValueContext.Provider>
        </Router>
    );
}
