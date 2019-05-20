import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {gardenNames} from "../service/HashkingsAPI";
import {MultiSelect} from "primereact/multiselect";
import {StateContext} from "../App";

export default function WaterModal({
  isOpen,
  toggleModal,
  activeGardens,
  username
}) {
  const [gardens, setGardens] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {steemConnectAPI} = useContext(StateContext);

  useEffect(() => {
    if (!isOpen) {
      setGardens([]);
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
    if (username && gardens.length > 0) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_water";
      const custom_JSON = JSON.stringify({plants: gardens.map(g => g.id)});

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        watered
      );
    }
  };

  const waterGardens = activeGardens.map(garden => {
    let name = `${gardenNames[garden.id[0]]} - ${garden.id}`;

    const waterActions = garden.care
      .filter(care => care[1] === "watered")
      .sort((a, b) => b[0] - a[0]);

    if (waterActions.length > 0) {
      name = `${name} - Last watered: Block ${waterActions[0][0]}`;
    } else {
      name = `${name} - Last watered: Never`;
    }

    return {
      id: garden.id,
      name
    };
  });

  const selectedGardensTemplate = option => {
    if (option) {
      return <span>{`${option.id} `}</span>;
    } else {
      return <span>Choose some gardens...</span>;
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
          <>
            <label htmlFor="garden">Garden</label>
            <MultiSelect
              style={{width: "100%"}}
              optionLabel="name"
              value={gardens}
              options={waterGardens}
              onChange={e => setGardens(e.value)}
              filter={true}
              selectedItemTemplate={selectedGardensTemplate}
            />
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Watering" : "Water"}
              onClick={handleSubmit}
            />
          </>
        )}
      </Dialog>
    </>
  );
}
