import logo from './logo.svg';
import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import Card from "./components/Card.js";
import ParticlesBg from "particles-bg";
import './App.css';

function App() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const responseURL =
      "https://api.hackillinois.org/event/";

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    fetch(responseURL, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((res2) => {

        var events = res2["events"] 
        var cards_list = [];
        for (var obj of events) {
          cards_list.push({
            name: obj.name,
            description: obj.description,
            startTime: obj.startTime,
            endTime: obj.endTime,
          });
        }

        cards_list.sort((a, b) => (a.startTime > b.startTime) ? 1 : -1)

        console.log(cards_list)

        setCardData(cards_list);
      });
  }, []);

  var itemList;
  itemList = [];

  if (cardData.length > 0) {
    itemList = cardData.map((item) => (
      <ul>
        <Row>
          <Card
            name={item.name}
            description={item.description}
            startTime={item.startTime}
            endTime={item.endTime}
          />
        </Row>
      </ul>
    ));
  }


  return (
    <div className="App">
      <header>

          <h1 style={{padding:"2%"}}> Events </h1>
          <div style={{ width: "100%", marginTop: "2%" }}>
            <div
              className="scrollbar scrollbar-juicy-peach"
              style={{
                marginLeft: "12%",
                overflowX: "hidden",
                overflowY: "scroll",
                width: "70%",
                height: "600px"
              }}
            >
            <ParticlesBg type="square" bg={true} style={{ height: "100%" }} />
 
            {itemList}
              
            </div>
          </div>
        </header>
    </div>
  );
}

export default App;
