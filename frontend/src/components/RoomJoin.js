import { Grid, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RoomJoin = (props) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} sx={{ marginBottom: "100px" }}>
      <Grid item xs={8} md={12} align="center">
        <Typography variant="h4" component="h4">
          Join Room
        </Typography>
      </Grid>
      <Grid item xs={8} md={12} align="center">
        <TextField
          error={error}
          id="outlined-basic"
          label="Code"
          variant="outlined"
          placeholder="Enter Your Code "
          helperText={error}
          onChange={(event) => {
            setCode(event.target.value);
          }}
        />
      </Grid>
      <Grid item xs={8} md={12} align="center">
        <Button
          variant="contained"
          color={"primary"}
          onClick={() => {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code: code }),
            };
            fetch("/api/joinroom", requestOptions)
              .then((respons) => {
                if (respons.ok) {
                  navigate(`/room/${code}`);
                } else {
                  setError("Room Not Found!");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Enter Room
        </Button>{" "}
      </Grid>
      <Grid item xs={8} md={12} align="center">
        <Button variant="contained" color={"secondary"} to="/" component={Link}>
          Back
        </Button>{" "}
      </Grid>
    </Grid>
  );
};

export default RoomJoin;
