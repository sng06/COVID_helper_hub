import React, { Component } from "react";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";


// core components

import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

class DashBoard extends Component {
    render() {
        return (
            <div>
                <GridItem xs={12} sm={12} md={8} lg={6}>
                <NavPills
                    color="default"
                    tabs={[
                    {
                        tabButton: "Dashboard 1",
                        tabIcon: Dashboard,
                        tabContent: (
                        <span>
                            <h1> Dashboard 1</h1>
                        </span>
                        )
                    },
                    {
                        tabButton: "Dashboard 2",
                        tabIcon: Dashboard,
                        tabContent: (
                        <span>
                            <h1> Dashboard 2</h1>
                        </span>
                        )
                    },
                    {
                        tabButton: "Dashboard 3",
                        tabIcon: Dashboard,
                        tabContent: (
                        <span>
                            <h1> Dashboard 3</h1>
                        </span>
                        )
                    }
                    ]}
                />
                </GridItem>
            </div>
        )
    }
}

export default DashBoard