import React, { Component, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./Card.css";
import { Container, Row, Col } from "react-grid-system";
import "bootstrap/dist/css/bootstrap.min.css";

function Card(props) {

  const useTimes = props.startTime != 0
  var start = new Date(props.startTime * 1000);
  var end = new Date(props.endTime * 1000);

  var start_end = useTimes ? `${start.toLocaleString()} - ${end.toLocaleString()}` : ""

  const [text, setText] = useState(start_end);

  return (
    <>
    <div className="card" style={{padding : "2%" }} onMouseEnter={() => setText(props.description)} onMouseLeave={() => setText(start_end)}>
        <Row >
          <h1 class style={{ fontSize: "22px" }}>
            {props.name}
          </h1>
        </Row>
        { useTimes || text != "" ? (<Row> {text} </Row> ) : null }
    </div>
    </>

  );
}

export default Card;
