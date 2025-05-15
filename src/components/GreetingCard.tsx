import React from "react";

interface GreetingCardProps {
    name: string;
    age?: number;
    isBirdthday?: boolean;
}

const GreetingCard: React.FC<GreetingCardProps> = ({ name, age, isBirthday }) => {
    return (
        <div className="greeting-card">
            <h1>Cześć, {name}!</h1>
            {age !== undefined && <p>Wszystkiego najlepszego z okazji urodzin</p>}
        </div>
    );
};

export default GreetingCard;