import React from 'react';


import MaterialTable from "material-table";

import { Collapse } from '@material-ui/core';

// import { AddBox, ArrowDownward } from "@material-ui/icons";


export default class PostTable extends React.Component {

    constructor(props) {
        super(props);
        // set up initial state
        this.state = {
            columns:[
                { title: "date", field: "date", type:"date" },
                { title: "first name", field: "firstname" },
                { title: "last name", field: "lastname" },
                { title: "location", field: "location"},
                {
                title: "post title",
                field: "title",
                // lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
                }
            ],
            data: [
                { firstname: "user", lastname: "test", location: "Vancouver", title: "help me!", date:"2020-05-08" }
            ]
        }
    }

    handleOnEdit() {
        // show posting page 
        console.log("route to edit post page")
    }

    // componentDidMount() {
    //     // set up initial state
    //     console.log("component did mount")
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     // show edited posts 
    //     console.log("component did update")
    // }

    render() {

        return (
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    title="all posts"
                    columns={this.state.columns}
                    // interate all posts from the user
                    data={this.state.data}

                    editable={{
                        // onRowUpdate: (newData, oldData) =>
                        //   new Promise((resolve, reject) => {
                        //     setTimeout(() => {
                        //       {
                        //         const data = this.state.data;
                        //         const index = data.indexOf(oldData);
                        //         data[index] = newData;
                        //         this.setState({ data }, () => resolve());
                        //       }
                        //       resolve()
                        //     }, 1000)
                        //   }),

                        onRowUpdate: (e) =>
                            this.handleOnEdit(e),

                        onRowDelete: oldData =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              {
                                let data = this.state.data;
                                const index = data.indexOf(oldData);
                                data.splice(index, 1);
                                this.setState({ data }, () => resolve());
                              }
                              resolve()
                            }, 1000)
                          }),
                      }}

                />

      </div>
        );
    }

}