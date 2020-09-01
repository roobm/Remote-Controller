import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ReactTooltip from "react-tooltip";
import $ from "jquery";
import axios from "axios";

class App extends Component {
  // luodaan tilallinen array: btnKokoelma
  constructor(props) {
    super(props);
    this.state = { show: true };
    // this.toggleDiv = this.toggleDiv.bind(this);

    this.state = {
      btnKokoelma: [],
    };
    // this.painikkeenPoisto = this.painikkeenPoisto.bind(this);
    this.uusiPainike = this.uusiPainike.bind(this);


  }
  getNapitKannasta = () => {
    axios({ method: "get", url: "HTTP://localhost:3000/getData" }).then(res => {
      this.btnKokoelma = res.data;
      this.btnKokoelma.forEach(function (items) {
      }
      )
      this.setState({ btnKokoelma: this.btnKokoelma })
    });
  };

  napitKantaan = () => {
    let data = {};

    data.ip = document.getElementById("ip").value;
    data.nimi = document.getElementById("nimi").value;
    data.avain = document.getElementById("avain").value;
    axios({
      method: "post",
      url: "HTTP://localhost:3000/postData",
      data: data,
      contentType: "application/json"
    })
  };

  nappienPoistoKannasta = (poisto) => {
    debugger;
    let data = {};
    data.poisto = poisto;
    axios({
      method: "delete",
      url: "HTTP://localhost:3000/deleteData",
      data
    })
  };

  componentWillMount() {
    const napit = this.getNapit();
    this.setState({ napit });
  }
  getNapit() {
    return this.state.btnKokoelma;
  }

  uusiPainike = () => {
    // muodostetaan uusi painike, haetaan uudelle painikkeelle arvot inputeista
    let ip = document.getElementById("ip").value;
    let nimi = document.getElementById("nimi").value;
    let avain = document.getElementById("avain").value;

    // muodostetaan buttoni-objecti, joka on yksi osa btnKokoelman taulukkoa
    let buttoni = { ip: ip, nimi: nimi, avain: avain };

    // kokoelma napeista, joka on alunperin tyhjä state-array componentin alusta
    let btnKokoelma = this.state.btnKokoelma;
    btnKokoelma.push(buttoni); // työnnetään yksittäinen buttoniobjekti btnKokoelma-arrayn sisään
    this.setState({
      // päivitetään arrayn state työnnön jälkeen ajantasalle.
      btnKokoelma
    });
    document.getElementById("ip").value = "";
    document.getElementById("nimi").value = "";
    document.getElementById("avain").value = "";
  };

  componentDidMount() {
    this.getNapit();
  }

  // painikkeenPoisto(nimi) {
  //   let btnKokoelma = this.getNapit(); // "tyhmät napit"
  //   // let btnKokoelma = this.getNapitKannasta(); // Napit kannasta
  //   this.btnKokoelma = [];
  //   const filteredKokoelma = this.btnKokoelma.filter(button => {
  //     return button.nimi !== nimi;
  //   });
  //   this.setState({ btnKokoelma: filteredKokoelma });
  //   console.log(filteredKokoelma);
  // }

  handleClick = (ip, nimi, avain) => {
    // Uuden painikkeen funkkari
    // haetaan e.target.getAttributella muuttujiin arvot
    var osoite = ip;
    var napinNimi = nimi;
    var keyAvain = avain;
    // data.nimi = nimi;
    // data.ip = osoite;
    // data.avain = avain;

    console.log(osoite, napinNimi, keyAvain);
    // lähetetään playerille jquery-komento
    $.post("http://" + ip + "/SendUDP", { key: avain });
  };

  render() {
    let i = -1; // aloitetaan nollasta id:n laskeminen
    const btnKokoelma = this.state.btnKokoelma.map(button => {
      // muuttuja const btnKokoelma, josta mapataan kaikki btnKokoelmassa olevat buttonit
      i++; // lisätään id:tä yhdellä uusien nappien tullessa.
      return (
        // tuodaan näkyviin button, tyylitellään sitä, ja ilmiannetaan objektin
        <button
          className="btn btn-info btn-lg"
          style={{
            width: "8em",
            height: "6em",
            padding: "20px",
            marginRight: "20px",
            marginBottom: "20px"
          }} // stylellä koristellaan uudet napit
          onClick={e =>
            this.handleClick(
              e.target.getAttribute("ip"),
              e.target.getAttribute("avain"),
              e.target.getAttribute("nimi")
            )
          } // annetaan napille arvot
          key={i}
          ip={button.ip}
          avain={button.avain}
          nimi={button.nimi}
        // painikkeenPoisto={this.painikkeenPoisto}
        >
          {button.nimi}
        </button>
      );
    });
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <ReactTooltip place="right" effect="solid" />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div id="inputit">
                <div style={{ padding: "10px", marginTop: "20px" }}>
                  <h6>Luo uusi painike:</h6>
                  <input
                    data-tip="Anna painikkeelle personoiva nimi, joka kuvaa mainoksen sisältöä."
                    id="nimi"
                    type="text"
                    onChange={e => this.setState({ nimi: e.target.value })}
                    placeholder=" Nimi"
                    style={{ width: "200px" }}
                  />
                  <br />
                  <input
                    data-tip="Komennon vastaanottavaan mediatoistimeen asetettu IP-osoite. Esimerkiksi 192.180.1.1:8080"
                    id="ip"
                    type="text"
                    onChange={e => this.setState({ ip: e.target.value })}
                    placeholder=" IP"
                    style={{ width: "200px", marginTop: "5px" }}
                  />
                  <br />
                  <input
                    data-tip="Mediatoistimella olevan materiaalin ja painikkeen yhdistävä avain-key-pari, 
                jota kutsutaan ohjelmalla."
                    id="avain"
                    type="text"
                    onChange={e => this.setState({ avain: e.target.value })}
                    placeholder=" Key"
                    style={{ width: "200px", marginTop: "5px" }}
                  />
                  <br />
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      this.uusiPainike(
                        this.state.nimi,
                        this.state.ip,
                        this.state.avain
                      )
                    }
                  >
                    Lisää painike
              </button>
                  <br></br>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.napitKantaan()}
                  >
                    Lisää painike ja tallenna tietokantaan
              </button>
                  <br></br>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.getNapitKannasta()}
                  >
                    Napit kannasta
              </button>

                  <div>
                    <input
                      data-tip="Kirjoita kenttään poistettavan painikkeen nimi sanatarkasti, huomioiden myös esimerkiksi kirjasinkoot."
                      id="poisto"
                      type="text"
                      onChange={e => this.setState({ nimi: e.target.value })}
                      placeholder=" Poistettavan nimi"
                      style={{ width: "200px", marginTop: "5px" }}
                    />
                    <br />
                    <button
                      className="btn btn-warning"
                      onClick={() => this.nappienPoistoKannasta(this.state.nimi)}
                    >
                      Poista painike
                </button>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div style={{ padding: "10px" }}>
              <h3>Luodut painikkeet:</h3>
              <div>{btnKokoelma}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App