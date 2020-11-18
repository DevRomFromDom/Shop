import React, { useState } from "react";
import Search from "./components/Search/Search";
import AddProduct from "./components/AddProduct/AddProduct";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, ThemeProvider, FLAT_THEME } from "@skbkontur/react-ui";

export const SearchValueContext = React.createContext<string>("");

export default function App() {
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState<string>("");

    const searchValueSend = () => {
        setSearchValue(inputValue);
        setInputValue("");
    };

    return (
        <Router>
            <SearchValueContext.Provider value={searchValue}>
                <ThemeProvider value={FLAT_THEME}>
                    <div className="App">
                        <div className="head"></div>
                        <div className="navbar">
                            <div className="shop">Магазин</div>
                            <form className="search_form" autoComplete="off">
                                <input
                                    className="input_search"
                                    placeholder="Искать товары"
                                    name="search"
                                    type="text"
                                    autoFocus
                                    value={inputValue}
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                />
                                <Link to="/">
                                    <button
                                        className="search_button"
                                        onClick={() => searchValueSend()}
                                    >
                                        Найти
                                    </button>
                                </Link>
                            </form>
                            <div className="addproduct">
                                <Link to="/addproduct">
                                    <Button use="success">
                                        Добавить товар
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="view">
                            <div className="body_view">
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
