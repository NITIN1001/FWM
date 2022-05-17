import { database } from "firebase";
import React from "react";
import firebase from "firebase";
import { useNavigate, useLocation } from "react-router-dom";

function Assign() {
  const itemsRef = database().ref("/DA_profile");
  const assignedRef = database().ref("/Assigned");
  const user = firebase.auth().currentUser;
  const [itemsArray, setItemsArray] = React.useState([]);
  const [assignedArray, setassignedArray] = React.useState([]);

  const location = useLocation();
  const navigate = useNavigate();

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

  function handleSubmit(email, name, phno) {
    database().ref("Assigned").push({
      user_mail: location.state.email,
      deliveryagent_mail: email,
      deliveryagent_name: name,
      deliveryagent_phno: phno,
    });
    alert("Delivery Agent Assigned Successful");
    navigate("/home");
  }
  return (
    <div>
      {itemsArray.length > 0 ? (
        <div style={{ marginTop: "5%" }}>
          {itemsArray.map((item, index) => {
            {
              const list = [];
              assignedArray.map((agent) => {
                list.push(agent.deliveryagent_mail);
              });
              var flag = 0;
              for (var i = 0; i < list.length; i++) {
                if (item.email === list[i]) {
                  flag = 1;
                }
              }
              if (flag === 0) {
                return (
                  <table
                    key={index}
                    style={{
                      borderColor: "#2ECC71",
                      borderWidth: 5,
                      width: "60%",
                      marginLeft: "22%",
                      borderBottom: "2px solid white",
                      backgroundColor: "DarkSlateGrey",
                      color: "white",
                      fontFamily: "revert",
                      opacity: 0.95,
                      borderCollapse: "collapse",
                      fontSize: 20,
                    }}
                  >
                    <tr style={{ backgroundColor: "black" }}>
                      <th colSpan="4">DELIVERY AGENT</th>
                    </tr>
                    <tr
                      style={{
                        color: "dodgerblue",
                        backgroundColor: "white",
                        textAlign: "center",
                      }}
                    >
                      <th style={{ width: "40%" }}>Mail</th>
                      <th style={{ width: "25%" }}>Name</th>
                      <th style={{ width: "25%" }}>Mobile Number</th>
                      <th
                        rowSpan="2"
                        style={{
                          width: "10%",
                          textAlign: "end",
                          paddingTop: "20px",
                        }}
                      >
                        <button
                          style={{
                            color: "white",
                            backgroundColor: "red",
                            width: "100%",
                            padding: "5px",
                            borderColor: "red",
                            fontSize: 15,
                            marginTop: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleSubmit(item.email, item.name, item.phno);
                          }}
                        >
                          Assign
                        </button>
                      </th>
                    </tr>
                    <tr>
                      <td style={{ color: "white", textAlign: "center" }}>
                        {item.email}
                      </td>
                      <td style={{ color: "white", textAlign: "center" }}>
                        {item.name}
                      </td>
                      <td style={{ color: "white", textAlign: "center" }}>
                        {item.phno}
                      </td>
                    </tr>
                  </table>
                );
              }
            }
          })}
        </div>
      ) : (
        <div>
          <h3 style={{ alignSelf: "center", top: "30%" }}>
            NO DELIVERY AGENT AVAILABLE
          </h3>
        </div>
      )}
    </div>
  );
}
export default Assign;
