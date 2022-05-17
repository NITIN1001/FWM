import { database } from "firebase";
import React from "react";
import firebase from "firebase";

function Assigned() {
  const assignedRef = database().ref("/Assigned");
  const [assignedArray, setassignedArray] = React.useState([]);
  
  React.useEffect(() => {
    assignedRef.on("value", (snapshot) => {
      let data1 = snapshot.val();
      const items1 = Object.values(data1);
      setassignedArray(items1);
    });
  }, []);
  return (
    <div>
      {assignedArray > 0 ? (
        <div>
          {assignedArray.map((item, index) => {
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
              <tr>
                <th>Customer Mail</th>
                <th>Delivery Agent Mail</th>
                <th>Delivery Agent Name</th>
                <th>Delivery Agent Mobile</th>
              </tr>
              <tr>
                <td>{item.user_mail}</td>
                <td>{item.deliveryagent_mail}</td>
                <td>{item.deliveryagent_name}</td>
                <td>{item.deliveryagent_phno}</td>
              </tr>
            </table>;
          })}
        </div>
      ) : (
        <div>
          <h3 style={{ alignSelf: "center", top: "30%" }}>
            NO DELIVERY AGENT ASSIGNED
          </h3>
        </div>
      )}
    </div>
  );
}
export default Assigned;
