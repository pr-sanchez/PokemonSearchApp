import { memo } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalContainer = ({ pokemon, onCloseModal }) => {
  function renderSecondaryAbility() {
    if (pokemon.abilities[1]?.ability == null) {
      return null;
    }

    return (
      <div>
        <div>Habilidad Secundaria:</div>
        <b>{pokemon.abilities[1].ability.name}</b>
      </div>
    );
  }

  return (
    <div className="information-modal-wrapper">
      <div className="information-modal-content">
        <FontAwesomeIcon
          className="information-modal-content__icon"
          icon={faTimes}
          onClick={onCloseModal}
        />
        <div className="information-modal">
          <div className="information-modal__image-wrapper">
            <img
              className="information-modal__image-source"
              src={pokemon.sprites.front_default}
            />
          </div>
          <div className="information-modal__description-wrapper">
            <div className="information-modal__title">{pokemon.name}</div>
            <div className="information-modal__description">
              <div>Tipo:</div>
              <b>{pokemon.types[0].type.name}</b>
            </div>
            <div>
              <div>Habilidad Principal:</div>
              <b>{pokemon.abilities[0].ability.name}</b>
            </div>
            {renderSecondaryAbility()}
            <div>
              <div>Peso:</div>
              <b>{pokemon.weight} libras</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ModalContainer);
