import React from 'react';

import MaterialTable from "material-table";

import { AddBox, ArrowDownward } from "@material-ui/icons";



export default class PostTable extends React.Component {


    render() {
        return (
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    columns={[
                        { title: "first name", field: "firstname" },
                        { title: "last name", field: "lastname" },
                        { title: "location", field: "location"},
                        {
                        title: "post title",
                        field: "title",
                        // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
                        }
                    ]}
                    data={[
                        { firstname: "user", lastname: "test", location: "Vancouver", title: "help me!" }
                    ]}
                    title="all posts"
                />
      </div>
        );
    }

}