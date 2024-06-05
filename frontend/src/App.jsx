import react, { useState } from "react";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    vote: "",
  });

  const handleSubmitHandler = async (e) => {
    e.preventDefault();

    if (!(state.email && state.email && state.vote)) {
      return alert("ALl Fileds are required");
    }

    const apiEndPoint = "http://localhost:5050/vote";
    const response = await fetch(apiEndPoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(state),
    });

    const data = await response.json();
    alert(data.message);
    setState({ name: "", email: "", vote: "" });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form className="voting-form" onSubmit={handleSubmitHandler}>
        <h1>Vote for favorite Bike Brand</h1>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Full Name
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="enter your full name..."
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="enter your email address..."
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vote" className="form-label">
            Bike Company
          </label>
          <select name="vote" className="form-control" onChange={handleChange}>
            <option value="">Select a Bike Company</option>
            <option value="yamaha">Yamaha</option>
            <option value="royal enfield">Royal Enfield</option>
            <option value="bajaj">Bajaj</option>
            <option value="hero">Hero</option>
            <option value="honda">Honda</option>
            <option value="BMW">BMW</option>
          </select>
        </div>
        <button type="submit" className="btn">
          Save your Vote
        </button>
      </form>
    </div>
  );
};

export default App;
