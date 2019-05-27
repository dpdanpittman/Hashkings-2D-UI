import React, {useContext, useState, useRef, useEffect} from "react";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {seedNames, HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import {InputText} from "primereact/inputtext";
import {Growl} from "primereact/growl";

export default function GiftSeed() {
  const {username} = useContext(StateContext);
  const [seed, setSeed] = useState();
  const [to, setTo] = useState("");
  const [validatedTo, setValidatedTo] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {steemConnectAPI} = useContext(StateContext);
  const growl = useRef(null);

  const [userSeeds, setUserSeeds] = useState([]);
  const hashkingsApi = new HashkingsAPI();

  useEffect(() => {
    hashkingsApi.getUserGarden(username).then(garden => {
      setUserSeeds(garden.availableSeeds);
    });
  }, [username]);

  const gifted = error => {
    if (error) {
      growl.current.show({
        severity: "error",
        summary: "Sorry, something went wrong",
        detail: "Please try again"
      });
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    hashkingsApi.steemUserExists(to).then(username => {
      if (username && username === to) {
        setValidatedTo(username);
      } else {
        setValidatedTo();
      }
    });
  }, [to]);

  const handleSubmit = async () => {
    if (validatedTo && username && seed) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_give_seed";
      const custom_JSON = JSON.stringify({
        to: validatedTo,
        seed: seed.strain,
        qual: seed.xp
      });

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        gifted
      );
    }
  };

  let buttonLabel = "Gift";
  if (isSubmitting) buttonLabel = "Gifting";
  if (!username) buttonLabel = "Login to gift";

  return (
    <>
      <Growl ref={growl} />
      <div className="p-col-12 p-md-4">
        <h1 className="section-heading">Gift a seed</h1>

        <InputText
          className="form-input"
          value={to}
          onChange={e => setTo(e.target.value)}
          placeholder="STEEM user to send to"
        />
        <Dropdown
          className="form-input"
          disabled={isSubmitting || !username}
          optionLabel="name"
          value={seed}
          id="name"
          options={userSeeds.map(seed => ({
            ...seed,
            name: `${seedNames[seed.strain]} - ${seed.xp} XP`
          }))}
          style={{width: "100%"}}
          onChange={e => {
            setSeed(e.value);
          }}
          placeholder="Choose a seed..."
        />
        {validatedTo && (
          <div>
            <h2>{validatedTo}</h2>
            <img
              alt="avatar"
              src={`https://steemitimages.com/u/${validatedTo}/avatar/small`}
            />
          </div>
        )}
      </div>

      <div className="p-col-12 p-md-4">
        <Button
          disabled={isSubmitting || !username || !validatedTo | !seed}
          label={buttonLabel}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}
