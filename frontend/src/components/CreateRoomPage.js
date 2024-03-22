import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useNavigate } from "react-router-dom";

const CreateRoomPage = (props) => {
  const [guestCanpause, setGuestCanpause] = useState(true);
  const [VoteToSkip, setVoteToSkip] = useState(2);

  const navigate = useNavigate();

  const handleGuestCanpauseChange = (event) => {
    setGuestCanpause(event.target.value === true ? true : false);
  };

  const handlesetVoteToSkip = (event) => {
    setVoteToSkip(parseInt(event.target.value));
  };

  const handlesedisplaytVoteToSkip = async () => {
    try {
      const respons = await axios.post("/api/create", {
        guest_can_pause: guestCanpause,

        vote_to_skip: VoteToSkip,
      });

      navigate(`/room/${respons.data.code}`);
      console.log(respons);
    } catch (error) {
      console.error(error);
    }
  };
  // const handlesedisplaytVoteToSkip = () => {
  //   const request = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       guest_can_pause: guestCanpause,

  //       vote_to_skip: VoteToSkip,
  //     }),
  //   };

  //   fetch("/api/create", request)
  //     .then((respons) => respons.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // };

  return (
    <div>
      {" "}
      <Grid container spacing={2}>
        <Grid item xs={6} md={8} align="center">
          <Typography variant="h3">Create A room</Typography>
        </Grid>

        <Grid item xs={6} md={8} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control playback state</div>
            </FormHelperText>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={guestCanpause.toString()}
              name="radio-buttons-group"
              onChange={handleGuestCanpauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="play/pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="no control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={8} align="center">
          <FormControl>
            <TextField
              required
              type="number"
              defaultValue={VoteToSkip}
              inputProps={{
                min: 1,
              }}
              onChange={handlesetVoteToSkip}
            />

            <FormHelperText>
              <div align="center">Vote required to Song Skip</div>
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={8} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handlesedisplaytVoteToSkip}
          >
            {" "}
            Crete Room{" "}
          </Button>
        </Grid>

        <Grid item xs={6} md={8} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            {" "}
            Button{" "}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateRoomPage;
