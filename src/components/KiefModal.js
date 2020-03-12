import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {seedNames} from "../service/HashkingsAPI";
import {Dropdown} from "primereact/dropdown";
import _ from "lodash";
import {StateContext} from "../App";

export default function KiefModal({
  isOpen,
  toggleModal,
  availableBuds,
  availableKiefbox,
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
    if (username && bud && availableKiefbox > 0) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_craft_kief";
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
        header="Craft Kief"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500, background: "#000000"}}
        onHide={() => toggleModal("craftKiefModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="craftKiefModal"
      >
        {availableBuds.length === 0 && (
          <p><b>Sorry, you don't have any buds</b></p>
        )}
        {availableKiefbox < 1 && <p>Sorry, you don't have any Kief Boxes. Please visit the market.</p>}
        {availableBuds.length > 0 && availableKiefbox > 0 && (
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
              label={isSubmitting ? "Crafting" : "Craft Kief"}
              onClick={handleSubmit}
            />
          </>
        )}
      </Dialog>
    </>
  );
}
