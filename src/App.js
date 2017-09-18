import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      file: null,
      alert: { visible: false, message: "" }
    };

    this.setUser = this.setUser.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setFile = this.setFile.bind(this);
    this.setAlert = this.setAlert.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.postRequest = this.postRequest.bind(this);
    this.getFileContent = this.getFileContent.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.getFileContent(this.state.file);
  }

  getFileContent(file) {
    if (file.type !== "text/csv") {
      this.setAlert(true, "The file should be of type '.csv'");
      return;
    }

    this.setAlert(false);

    let reader = new FileReader();

    reader.onload = this.postRequest;
    reader.readAsText(file);
  }

  postRequest(fileContent) {
    let destinationUrl =
      "https://myapp-unpredicted-mirk.cfapps.sap.hana.ondemand.com/test";
    let encriptedPassword = btoa(`${this.state.user}:${this.state.password}`);

    fetch(destinationUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encriptedPassword}`,
        "Content-Type": "text/csv"
      },
      body: fileContent.currentTarget.result,
      mode: "cors"
    })
      .then(response => alert("Request sucessfully sent!"))
      .catch(error => console.log(error));
  }

  setUser(event) {
    this.setState({ user: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  setFile(event) {
    this.setState({ file: event.target.files[0] });
  }

  setAlert(isVisible, message) {
    this.setState({ alert: { visible: isVisible, message: message } });
  }

  closeBtn(event) {
    this.setAlert(false);
  }

  render() {
    return (
      <div className="App">
        {this.state.alert.visible ? (
          <div className="alert">
            <span onClick={this.closeBtn} className="closebtn">
              &times;
            </span>
            {this.state.alert.message}
          </div>
        ) : null}
        <div className="App-header">
          <h2>Tasks Generator</h2>
        </div>
        <form className="form" onSubmit={this.onSubmit}>
          <label htmlFor="user">USER:</label>
          <input
            id="user"
            type="text"
            value={this.state.user}
            onChange={this.setUser}
            required
          />
          <label htmlFor="password">PASSWORD:</label>
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.setPassword}
            required
          />
          <input
            id="upload"
            type="file"
            onChange={this.setFile}
            accept=".csv"
            required
          />
          <button type="submit" className="button">
            Create Tasks
          </button>
        </form>
      </div>
    );
  }
}

export default App;
