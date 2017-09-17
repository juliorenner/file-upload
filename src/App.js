import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { user: "", password: "", file: "" };

    this.setUser = this.setUser.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setFile = this.setFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.postRequest = this.postRequest.bind(this);
    this.getFileContent = this.getFileContent.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.getFileContent(this.state.file);
  }

  getFileContent(file) {
    let reader = new FileReader();

    reader.onload = this.postRequest;
    reader.readAsText(file);
  }

  postRequest(fileContent) {
    let destinationUrl =
      "https://myapp-unpredicted-mirk.cfapps.sap.hana.ondemand.com/api/rest/createtasks";
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

  render() {
    return (
      <div className="App">
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
          />
          <label htmlFor="password">PASSWORD:</label>
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.setPassword}
          />
          <input
            id="upload"
            type="file"
            onChange={this.setFile}
            accept=".csv"
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
