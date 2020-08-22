import React from "react";
import axios from "axios";

export default class Komennonlähetys extends React.Component {
    state = {
        ip: "",
        nimi: ""
    };

    handleSubmit = event => {
        event.preventDefault();

        const lahetys = {
            ip: this.state.ip,
            avain: this.state.avain
        };

        axios.post("http://" + ip, { avain }).then(res => {
            console.log(res);
        });
    };
}
