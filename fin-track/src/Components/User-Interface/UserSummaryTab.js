import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function UserSummaryTab() {
  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="income" title="Profit">
          Tab content for Profit
        </Tab>
        <Tab eventKey="expense" title="Expense">
          Tab content for Expense
        </Tab>
      </Tabs>
    </>
  );
}

export default UserSummaryTab;
