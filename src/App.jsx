import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const baseUrl = "http://localhost:8080";

  /* 
    useState() 안에 무엇을 넣느냐에 따라서
    input값이 기본으로  1.[]객체로 생성이 됨    2. "" 빈값으로 생성이 됨  3. null 널값으로 생성이 됨
  */
  const [items, setItems] = useState([]);
  const [input, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

  /*
    useEffect[] : 리액트 열렸을 때 한번만 실행될수 있게하는 hook.
    hook이란?? --> 함수형 컴포넌트에서 여러 state나 생명주기에서 사용하는 기술들을 use로 시작하는 hook으로 대신 사용할 수 있게 한다.
  */
  useEffect(() => {
    getItem();
  }, []);

  // 비동기 호출을 할 수 있게 도와주는 함수
  async function getItem() {
    await axios // async await을 통해서 axios를 호출해서 응답 받을때까지 기다린다.
      .get(baseUrl + "/api/items/list")
      .then((response) => {            // then 성공했을때
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {     // catch 실패했을때
        console.log(error);
      });
  }

  function updateItem(id) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        console.log("item.id = " + item.id);
        console.log("item.itemStatus = " + item.itemStatus);
        // Toggle the item's status based on the current status
        return {
          ...item,
          itemStatus: item.itemStatus === "ON_SALE" ? "SOLD_OUT" : "ON_SALE",
        };
      }
      return item;
    });
  
    setItems(updatedItems);
  
    axios
      .patch(baseUrl + "/api/items/status/" + id, {})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  } 

  function deleteItem(id) {
    const deleteItem = async () => {
      await axios
        .delete(baseUrl + "/api/items/" + id, {})
        .then((response) => {     // then 성공했을때
          console.log(response.data);
          setItems(
            items.filter((item) => item.id !== id)
          )
        })
        .catch((error) => {   // catch 실패했을때
          console.log("error : " + error);
        })
    }
    deleteItem();
    console.log("상품이 삭제됨");
  }

  function createItem(e) {
    e.preventDefault();  // 화면 새로고침 방지

    const createItem = async () => {
      await axios
        .post(baseUrl + "/api/items", {
          itemName: input,
          price: input2,
          stockNumber: input3,
          content: input4
        })
        .then((response) => {
          console.log(response.data)
          setInput1("");
          setInput2("");
          setInput3("");
          setInput4("");
          getItem();
        })
        .catch((error) => {
          console.log(error);
        })
    }
    createItem();
    console.log("상품이 추가됨");
  }

  // 데이터를 입력할 공간
  function changeText1(e) {
    e.preventDefault();       // 화면 새로고침 깜빡이 방지
    setInput1(e.target.value);
    console.log("input에 어떤값이 들어가지? " + input);
  }
  // 데이터를 입력할 공간
  function changeText2(e) {
    e.preventDefault();       // 화면 새로고침 깜빡이 방지
    setInput2(e.target.value);
    console.log("input2에 어떤값이 들어가지? " + input2);
  }
  // 데이터를 입력할 공간
  function changeText3(e) {
    e.preventDefault();       // 화면 새로고침 깜빡이 방지
    setInput3(e.target.value);
    console.log("input3에 어떤값이 들어가지? " + input3);
  }
  // 데이터를 입력할 공간
  function changeText4(e) {
    e.preventDefault();       // 화면 새로고침 깜빡이 방지
    setInput4(e.target.value);
    console.log("input4에 어떤값이 들어가지? " + input4);
  }

  return (
    <>
      <h1>react-challenge-study-backend</h1>
      <form onSubmit={createItem}>
          <p><label>상품 이름 : <input type="text" required={true} value={input} onChange={changeText1} /></label></p>
          <p><label>상품 가격 : <input type="text" required={true} value={input2} onChange={changeText2} /></label></p>
          <p><label>상품 재고개수 : <input type="text" required={true} value={input3} onChange={changeText3} /></label></p>
          <p><label>상품 설명 : <input type="text" required={true} value={input4} onChange={changeText4} /></label></p>
          
          <input type="submit" value="Create"/>
      </form>

      {
        items
          ? items.map((item) => {   // item 데이터가 있을경우
            return (
              <div key={item.id}>
                <label>  
                  {item.itemName} &nbsp;
                </label>
                <label>
                  {item.price}&nbsp;
                </label>
                <label>
                  {item.stockNumber} &nbsp;
                </label>
                <label>
                  {item.content} &nbsp;
                </label>
                <label onClick={() => updateItem(item.id)}>
                  {item.itemStatus}
                </label>
                <label onClick={() => deleteItem(item.id)}>&nbsp;❌</label>
              </div>
            );
          })
          : null  // item 데이터가 없을경우 null 반환  
      }
    </>
  );
}

export default App;
