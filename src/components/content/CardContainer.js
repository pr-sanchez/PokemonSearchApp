import { useState, memo } from "react";
import ModalContainer from "../modal/ModalContainer";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardContainer = ({ pokemon }) => {
  // //////////////////////////////////
  // //////////////////////////////////
  // ////// PRIVATE METHODS ///////////
  // //////////////////////////////////
  // //////////////////////////////////

  // Este setState sirve para abrir y cerrar el modal con la info del pókemon. //
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  //////////////////////////////////
  //  //////////////////////////////////
  //  //////// EVENT HANDLERS //////////
  //  //////////////////////////////////
  //  //////////////////////////////////

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  //  //////////////////////////////////
  //  //////////////////////////////////
  //  ////////// RENDERERS /////////////
  //  //////////////////////////////////
  //  //////////////////////////////////

  function renderModal() {
    if (!isModalOpen) {
      return null;
    }

    return <ModalContainer pokemon={pokemon} onCloseModal={handleCloseModal} />;
  }

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
    <div className="information-wrapper">
      <div className="information-content">
        <FontAwesomeIcon
          className="information-content__info-modal"
          icon={faInfoCircle}
          onClick={handleOpenModal}
        />
        <div className="information-content__image">
          <img
            className="information-content__image-source"
            src={pokemon.sprites.front_default}
          />
        </div>
        <div className="information-content__information">
          <div className="information-title">{pokemon.name}</div>
          <div className="information-description-wrapper">
            <div>
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
            {renderModal()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CardContainer);
