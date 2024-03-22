import React, { useEffect, useState } from 'react';
import { useUserId } from "./Firebase/userContext";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { PieChart, Pie, Cell, Legend } from 'recharts';
import UserNavbar from './userNavbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function UserOverviewPage() {
  const [accountData, setAccountData] = useState([]);
  const { userId } = useUserId();

  useEffect(() => {
    const fetchAccountData = async () => {
      const q = query(collection(db, "users", userId, "accounts"));
      const querySnapshot = await getDocs(q);
      const fetchedAccounts = querySnapshot.docs.map(doc => ({
        accountType: doc.data().accountType,
        accountBalance: parseFloat(doc.data().accountBalance),
      }));

      // Transform data for pie chart
      const chartData = fetchedAccounts.reduce((acc, { accountType, accountBalance }) => {
        const existing = acc.find(item => item.name === accountType);
        if (existing) {
          existing.value += accountBalance;
        } else {
          acc.push({ name: accountType, value: accountBalance });
        }
        return acc;
      }, []);

      setAccountData(chartData);
    };

    if (userId) {
      fetchAccountData();
    }
  }, [userId]);

  return (
    <div>
      <UserNavbar />
      <div style={{ textAlign: 'center', paddingTop: '20px' }}>
        <h1>Overview in the Graph Form</h1>
      </div>
      {/* Adjust the minHeight to move the graph up */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh', // Reduced from 80vh to move the graph up
      }}>
        <PieChart width={400} height={400}>
          <Pie
            data={accountData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={(entry) => `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`}
          >
            {accountData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend align="center" verticalAlign="bottom" />
        </PieChart>

        </div>
{/* Adjust the minHeight to move the graph up */}
<div style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh', // Reduced from 80vh to move the graph up
}}>
  <BarChart width={600} height={400} data={accountData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
</div>
      </div>
 


  );


}

export default UserOverviewPage;
