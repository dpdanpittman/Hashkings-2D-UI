import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {gardenNames} from "../service/HashkingsAPI";
import {Dropdown} from "primereact/dropdown";
import _ from "lodash";
import {StateContext} from "../App";

export default function WaterModal({
  isOpen,
  toggleModal,
  activeGardens,
  username
}) {
  const [garden, setGarden] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {steemConnectAPI} = useContext(StateContext);

  useEffect(() => {
    if (!isOpen) {
      setGarden();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const watered = error => {
    if (error) {
      setIsSubmitting(false);
    } else {
      toggleModal();
    }
  };

  const handleSubmit = () => {
    if (username && garden) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_water";
      const custom_JSON = JSON.stringify({plants: [garden.id]});

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        watered
      );
    }
  };

  return (
    <>
      <Dialog
        header="Water your Garden"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500}}
        onHide={() => toggleModal("waterModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="waterModal"
      >
        {activeGardens.length === 0 ? (
          <p>Sorry, you don't have any active gardens</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="garden">Garden</label>
            <Dropdown
              optionLabel="name"
              id="garden"
              value={garden}
              options={_.uniqBy(activeGardens, garden => garden.id[0]).map(
                garden => ({...garden, name: gardenNames[garden.id[0]]})
              )}
              style={{width: "100%"}}
              onChange={e => {
                setGarden(e.value);
              }}
              placeholder="Choose a garden..."
            />
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Watering" : "Water"}
              onClick={handleSubmit}
            />
          </form>
        )}
      </Dialog>
    </>
  );
}
