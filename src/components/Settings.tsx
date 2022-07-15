import React, { FC, useState } from "react";
import ModalRules from "./ModalRules";

interface SettingsProps {
  rapid: number;
  setRapid: (value: number) => void;
  blackPlayerName: string;
  setWhitePlayerName: (value: string) => void;
  whitePlayerName: string;
  setBlackPlayerName: (value: string) => void;
  setStartGame: (value: boolean) => void;
}

const Settings: FC<SettingsProps> = ({
  setRapid,
  rapid,
  setWhitePlayerName,
  whitePlayerName,
  setBlackPlayerName,
  blackPlayerName,
  setStartGame,
}) => {
  const [isVisible, setVisible] = useState(false);

  function validate() {
    if (rapid != NaN && rapid >= 1 && blackPlayerName != "" && whitePlayerName != "") {
      setStartGame(true);
    } else {
      alert("Заполните все данные корректно");
    }
  }

  return (
    <>
      {isVisible ? (
        <ModalRules setVisible={setVisible}/>
      ) : (
        <form className="settings-container">
          <h1 className="settings__title">Chesspair</h1>
          <label className="settings__label">
            <span>Рапид:</span>
            <input
              required
              type="number"
              onChange={(evt) => setRapid(parseInt(evt.target.value))}
              value={rapid}
              min="1"
            />
          </label>
          <label className="settings__label">
            <span>Имя Белых:</span>
            <input
              required
              type="text"
              onChange={(evt) => setWhitePlayerName(evt.target.value)}
              value={whitePlayerName}
            />
          </label>
          <label className="settings__label">
            <span>Имя Чёрных:</span>
            <input
              required
              type="text"
              onChange={(evt) => setBlackPlayerName(evt.target.value)}
              value={blackPlayerName}
            />
          </label>
          <button
            className="settings__start-game button"
            onClick={validate}
          >
            Начать игру
          </button>
          <a
            className="settings__link"
            href="#"
            onClick={() => setVisible(true)}
          >
            Правила игры
          </a>
        </form>
      )}
    </>
  );
};

export default Settings;
