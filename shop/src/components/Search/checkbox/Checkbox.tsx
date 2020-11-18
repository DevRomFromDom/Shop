import React, { useState } from "react";

export const Checkbox = ({ colors }) => {
    const [color, setColor] = useState(colors);
    const [value, setValue] = useState([]);
    const [inputValue, setItputValue] = useState([]);

    console.log(colors);
    const searchValue = (el) => {
        setItputValue([...inputValue, el]);
    };
    return (
        <div>
            {color
                ? color.map((el, key) => {
                      const text = el;
                      return (
                          <div key={key}>
                              <input
                                  type="checkbox"
                                  value={inputValue}
                                  onChange={(text) => searchValue(text)}
                              />
                              {el}
                          </div>
                      );
                  })
                : null}
        </div>
    );
};
