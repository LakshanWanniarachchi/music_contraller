import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";

const Room = () => {
  const [guest_can_pause, setGuestCanPause] = useState(false);
  const [vote_to_skip, setVoteToSkip] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [message, setMessage] = useState("");
  const { roomCode } = useParams();

  useEffect(() => {
    // Fetch room details or perform any other initialization tasks
    // You can use the roomCode here to fetch room-specific data
    // For now, we're just setting dummy values
    setGuestCanPause(true);
    setVoteToSkip(true);
    setIsHost(true);
  }, [roomCode]);

  const handleLeaveRoom = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions)
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        setMessage(data.Message);
        // You may choose to redirect to another page after leaving the room
        // Example:
        // history.push('/some-other-route');
      })
      .catch((error) => {
        console.error("Error leaving room:", error);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Guest Can Pause: {guest_can_pause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Vote to Skip: {vote_to_skip.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Is Host: {isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Room Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Message: {message}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={handleLeaveRoom}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
