import React from "react";
import { FC } from 'react';
import { Figure } from "../models/figures/Figure";
interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
    return(
        <div className="lost">
            <h3>{title}</h3>
            {figures.map(figure => (
                <div key={figure.id} className="lost-figure">
                    {figure.name} {figure.logo && <img className="lost-figure__logo" src={figure.logo} alt={figure.name} />}
                </div>
            ))}
        </div>
    );
} 

export default LostFigures;