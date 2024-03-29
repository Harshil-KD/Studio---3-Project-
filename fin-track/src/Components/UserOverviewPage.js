import React, { useEffect, useState } from 'react';
import { useUserId } from "./Firebase/userContext";
import { collection, getDocs } from "firebase/firestore";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { db } from "./Firebase/firebase";
import UserNavbar from './userNavbar';
import "../CSS/UserOverviewPage.css";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
    </div>

    
  )
}

export default UserOverviewPage;
