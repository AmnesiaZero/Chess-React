import React, { FC } from "react";

interface ModalRulesProps {
  setVisible: (v: boolean) => void;
}

const ModalRules: FC<ModalRulesProps> = ({ setVisible }) => {
  return (
    <div className="modal-container">
      <div className="modal__close" onClick={() => setVisible(false)}>
        Закрыть
      </div>
      <div className="modal__rules">
        <h1 className="modal__title">Правила</h1>
        <ol className="modal__list">
          <li className="modal__list__item">
             Никому не рассказывать об этих шахматах.
          </li>
          <li className="modal__list__item">
             Никому не рассказывать об этих шахматах.
          </li>
          <li className="modal__list__item">
             Игра рассчитана на двух людей, играющих с одного устройства.
          </li>
          <li className="modal__list__item">
             Победителем считается тот, кто набрал больше всего очков. Очки набираются при убийстве фигуры противника.
          </li>
          <li className="modal__list__item">
             Короля можно убить. Кто убил короля, тот и победил.
          </li>
          <li className="modal__list__item">
             Присутствует элемент рандома. Когда пешка добирается до конца,
            игроку не представляется выбор фигуры. Она выбирается случайнм
            образом. Есть вероятность, что пешка как была пешкой, так и
            останется.
          </li>
          <li className="modal__list__item">
             При своем первом ходе, пешка может перепрыгнуть через своего
            союзника и издать боевой клич.
          </li>
          <li className="modal__list__item">
             Не всё в этой жизни будет идти так, как ты хочешь...
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ModalRules;
