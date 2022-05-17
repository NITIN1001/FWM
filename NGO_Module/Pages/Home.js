import React from "react";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-bootstrap";
import Sidebar from "./Sidenav";
import MotionHoc from "./MotionHoc";
import { database } from "firebase";
import food from "./food.png";
import qty from "./qty.png";
import time from "./time.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function HomeComponent() {
  const [error, setError] = useState("");
  const [userMail, setUserMail] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const itemsRef = database().ref("/items");
  const assignedRef = database().ref("/Assigned");
  const [itemsArray, setItemsArray] = React.useState([]);
  const [assignedArray, setassignedArray] = React.useState([]);

  React.useEffect(() => {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      const items = Object.values(data);
      setItemsArray(items);
    });
  }, []);

  React.useEffect(() => {
    assignedRef.on("value", (snapshot) => {
      let data1 = snapshot.val();
      const items1 = Object.values(data1);
      setassignedArray(items1);
    });
  }, []);

  function handleSubmit(mail) {
    try {
      setError("");
      setLoading(true);

      navigate("/assign", { state: { id: 1, email: mail } });
    } catch {
      setError("Failed to Accept");
    }

    setLoading(false);
  }
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Sidebar />
      <div>
        <div style={{ marginTop: "4%" }}>
          <center>
            <h1 style={{ color: "DarkOrchid", fontFamily: "verdana" }}>
              AVAILABLE REQUESTS
            </h1>
          </center>

          {itemsArray.map((item, index) => {
            {
              const list = [];
              assignedArray.map((agent) => {
                list.push(agent.user_mail);
              });
              {
                var flag = 0;
                for (var i = 0; i < list.length; i++) {
                  if (item.mail === list[i]) {
                    flag = 1;
                  }
                }
                if (flag === 0) {
                  return (
                    <table
                      key={index}
                      style={{
                        width: "60%",
                        marginLeft: "22%",
                        borderBottom: "2px solid white",
                        backgroundColor: "DarkSlateGrey",
                        color: "white",
                        opacity: 0.95,
                        borderCollapse: "collapse",
                        fontFamily: "verdana",
                      }}
                    >
                      <tr style={{ backgroundColor: "black" }}>
                        <th
                          style={{
                            color: "dodgerblue",
                            textAlign: "left",
                            padding: "8px",
                            fontFamily: "verdana",
                          }}
                        >
                          USER DETAILS
                        </th>
                        <th
                          style={{
                            color: "tomato",
                            textAlign: "left",
                            padding: "8px",
                            fontFamily: "verdana",
                          }}
                          colSpan="2"
                        >
                          ITEM DETAILS
                        </th>
                      </tr>
                      <tr>
                        <td
                          rowSpan="3"
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            width: "50%",
                          }}
                        >
                          {item.mail}
                        </td>
                        <td style={{ width: "30%" }}>
                          <img
                            src={food}
                            style={{
                              width: "10%",
                            }}
                          ></img>
                          FOOD
                        </td>
                        <td style={{ fontSize: 18 }}>{item.name}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "30%" }}>
                          <img src={qty} style={{ width: "10%" }}></img>
                          QUANTITY
                        </td>
                        <td style={{ fontSize: 18 }}>{item.quantity}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "30%" }}>
                          <img src={time} style={{ width: "10%" }}></img>
                          COOKED TIME
                        </td>

                        <td style={{ fontSize: 18 }}>{item.c_time}</td>
                      </tr>
                      <tr>
                        <td
                          colSpan="3"
                          style={{ paddingTop: "10px", textAlign: "center" }}
                        >
                          <button
                            style={{
                              width: "15%",
                              color: "white",
                              backgroundColor: "red",
                              fontSize: 15,
                              padding: 5,
                              fontFamily: "inherit",
                              borderRadius: "5px",
                              borderRight: "2px solid black",
                              borderBottom: "2px solid black",
                              borderLeft: "1px solid white",
                              borderTop: "1px solid white",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleSubmit(item.mail);
                            }}
                          >
                            Accept
                          </button>
                        </td>
                      </tr>
                    </table>
                  );
                }
              }
            }
          })}
        </div>
      </div>
    </div>
  );
}
const Home = MotionHoc(HomeComponent);
export default Home;
