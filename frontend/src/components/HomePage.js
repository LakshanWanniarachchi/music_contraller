import { Component } from "react";
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import RoomJoin from "./RoomJoin";
import Room from "./Room";
import CreateRoomPage from "./CreateRoomPage";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      RoomCode: null,
    };
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ RoomCode: data.code });
      });
  }

  renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3">House Party</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup variant="contained" color="primary">
            <Button color="primary" component={Link} to="/join">
              Join Room
            </Button>
            <Button color="secondary" component={Link} to="/create">
              Create Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { RoomCode } = this.state;

    return (
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              RoomCode ? (
                <Navigate to={`/room/${RoomCode}`} />
              ) : (
                this.renderHomePage()
              )
            }
          />
          <Route path="/join" element={<RoomJoin />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
