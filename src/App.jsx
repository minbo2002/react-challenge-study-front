import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const baseUrl = "http://localhost:8080";

  const [items, setItems] = useState([]);

  useEffect(() => {
    getTodos();
  }, []); // [] 리액트 열렸을 때 한번만 실행하는 게 하는 것!

  async function getTodos() {
    await axios // 다 받을 때까지 기다리는 것
      .get(baseUrl + "/api/items/list")
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1>react-challenge-study-backend</h1>
      {items.map((item) => {
        return (
          <div key={item.id}>
            {item.itemName} &nbsp;
            {item.price} &nbsp;
            {item.stockNumber} &nbsp;
            {item.content} &nbsp;
            {item.itemStatus}
          </div>
        );
      })}
    </>
  );
}

export default App;
