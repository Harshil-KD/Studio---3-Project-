import React, { useEffect, useState } from 'react';
import { useUserId } from "./Firebase/userContext";
import { collection, getDocs } from "firebase/firestore";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { db } from "./Firebase/firebase";
import UserNavbar from './userNavbar';
import "../CSS/UserOverviewPage.css";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1971', '#19FF8C'];

function UserOverviewPage() {
  const [transactionData, setTransactionData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const { userId } = useUserId();

  useEffect(() => {
    const fetchPieChartData = async () => {
      if (!userId) return;
  
      // Fetch account data
      const accountsRef = collection(db, "users", userId, "accounts");
      const accountsSnapshot = await getDocs(accountsRef);
      const fetchedAccounts = accountsSnapshot.docs.map(doc => ({
        accountType: doc.data().accountType,
        accountBalance: parseFloat(doc.data().accountBalance),
      }));
  
      // Transform data for pie chart
      const chartData = fetchedAccounts.map(account => ({
        name: account.accountType,
        value: account.accountBalance,
      }));
  
      setAccountData(chartData);
    };
  
    fetchPieChartData();
  }, [userId]);
  
  useEffect(() => {
    const fetchBarChartData = async () => {
      if (!userId) return;
  
      const fetchedTransactions = [];
      const accountsRef = collection(db, "users", userId, "accounts");
      const accountsSnapshot = await getDocs(accountsRef);
  
      for (const doc of accountsSnapshot.docs) {
        const transactionsCollectionRef = collection(doc.ref, "transactions");
        const transactionsSnapshot = await getDocs(transactionsCollectionRef);
        const accountName = doc.data().accountName;
  
        transactionsSnapshot.forEach(transactionDoc => {
          fetchedTransactions.push({
            accountName: accountName,
            amount: parseFloat(transactionDoc.data().amount),
          });
        });
      }
  
      // Group transactions by account name
      const transactionsByAccount = fetchedTransactions.reduce((acc, { accountName, amount }) => {
        if (!acc[accountName]) {
          acc[accountName] = { Debit: 0, Credit: 0 };
        }
        if (amount < 0) {
          acc[accountName].Debit -= amount;
        } else {
          acc[accountName].Credit += amount;
        }
        return acc;
      }, {});
  
      // Format data for bar chart
      const formattedData = Object.keys(transactionsByAccount).map(accountName => ({
        accountName,
        Debit: transactionsByAccount[accountName].Debit,
        Credit: transactionsByAccount[accountName].Credit,
      }));
  
      setTransactionData(formattedData);
    };
  
    fetchBarChartData();
  }, [userId]);

  return (
    <div>
      <UserNavbar />
      <div style={{ textAlign: 'center', paddingTop: '20px' }}>
  <h1>Overview of accounts in Graph Form</h1>
</div>
<div className="charts-container">
  <div className="chart-heading">
    <h2>Pie Chart: Account Balances</h2>
  </div>
  <div className="pie-chart">
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={accountData}
          cx="50%"
          cy="50%"
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
    </ResponsiveContainer>
  </div>
  <div className="chart-heading">
    <h2>Bar Chart: Transaction History</h2>
  </div>
  <div className="bar-chart">
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={transactionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="accountName" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Credit" fill="#82ca9d" />
        <Bar dataKey="Debit" fill="#ff6961" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div> 
 </div>
   
  );
}

export default UserOverviewPage;
