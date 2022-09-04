// React is always needed here, even if it is not directly used
import React from "react";
const { useState, useEffect } = React;
import ReactDOM from "react-dom/client";
import axios from "axios";
import Summary from "./Summary";

// react root
const root = ReactDOM.createRoot(document.querySelector("#root"));

const App = () => {
  // empty value in useState is the default value
  // be defensive

  const [items, setItems] = useState([]);
  // useEffect allows us to do things that are async
  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await axios.get("/api/items");
        setItems(response.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    loadItems();
  }, []);

  // addItem
  const addItem = async () => {
    try {
      const data = Math.ceil(Math.random() * 100);
      const response = await axios.post("/api/items", { data });
      const item = response.data;
      setItems([...items, item]);
    } catch (ex) {
      console.log(ex);
    }
  };

  // destroyItem
  const destroyItem = async (item) => {
    try {
      await axios.delete(`/api/items/${item.id}`);
      setItems(items.filter((i) => i.id !== item.id));
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      <h1> The Numbers App ({items.length})</h1>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              {item.data} <button onClick={() => destroyItem(item)}>x</button>
            </li>
          );
        })}
      </ul>
      <button onClick={addItem}>Add A New Item</button>
      <Summary label="all" items={items} />
      <Summary label="odd" items={items.filter((i) => i.isOdd)} />
      <Summary label="even" items={items.filter((i) => i.isEven)} />
    </div>
  );
};

root.render(<App />);
