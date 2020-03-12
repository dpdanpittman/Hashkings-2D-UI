import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {gardenNames, seedNames} from "../service/HashkingsAPI";
import {Dropdown} from "primereact/dropdown";
import _ from "lodash";
import {StateContext} from "../App";

export default function OilModal({
  isOpen,
  toggleModal,
  availableBuds,
  availableVacovens,
  username
}) {
  const [bud, setBud] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {steemConnectAPI} = useContext(StateContext);
  useEffect(() => {
    if (!isOpen) {
      setBud();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const crafted = error => {
    if (error) {
      setIsSubmitting(false);
    } else {
      toggleModal();
    }
  };

  const handleSubmit = () => {
    if (username && bud && availableVacovens > 0) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_craft_oil";
      const custom_JSON = JSON.stringify({
        buds: bud.strain
      });

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        crafted
      );
    }
  };

  return (
    <>
      <Dialog
        header="Craft Oil"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500, background: "#000000"}}
        onHide={() => toggleModal("craftOilModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="craftOilModal"
      >
        {availableBuds.length === 0 && (
          <p><b>Sorry, you don't have any buds</b></p>
        )}
        {availableVacovens < 1 && <p>Sorry, you don't have any Vac Ovens. Please visit the market.</p>}
        {availableBuds.length > 0 && availableVacovens > 0 && (
          <>
            <label htmlFor="bud">Bud</label>
            <Dropdown
              optionLabel="name"
              value={bud}
              id="bud"
              options={_.uniqBy(availableBuds, bud => bud.strain).map(
                bud => ({
                  ...bud,
                  name: `${seedNames[bud.strain]}`
                })
              )}
              style={{width: "100%"}}
              onChange={e => {
                setBud(e.value);
              }}
              placeholder="Choose a nug..."
            />
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Crafting" : "Craft Oil"}
              onClick={handleSubmit}
            />
          </>
        )}
      </Dialog>
    </>
  );
}
