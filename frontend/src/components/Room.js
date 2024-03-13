import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Room = (props) => {
  const [guest_can_pause, set_guest_can_pause] = useState(2);
  const [vote_to_skip, set_vote_to_skip] = useState(true);
  const [ishost, sethost] = useState(true);
  const { roomCode } = useParams();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          guest_can_pause : {guest_can_pause}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          {" "}
          vote_to_skip : {vote_to_skip.toString()}{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          {" "}
          ishost : {ishost.toString()}{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          {" "}
          roomCode : {roomCode}{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color={"Primary"} to="/" component={Link}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};
export default Room;
