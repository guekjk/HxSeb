import { useState } from 'react';
import './WeddingCard.css';

const CARD_IMAGE_URL =
  'https://github.com/user-attachments/assets/eabf1fcf-b0da-44cf-a22c-353fe0a1a39b';

export default function WeddingCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card-scene">
      <div
        className={`card${isOpen ? ' card--open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close wedding card' : 'Open wedding card'}
      >
        <div className="card__face card__face--front">
          <div className="card__front-content">
            <span className="card__front-icon">💌</span>
            <p className="card__front-hint">Click to open</p>
          </div>
        </div>
        <div className="card__face card__face--back">
          <img
            src={CARD_IMAGE_URL}
            alt="Wedding invitation for Samantha Petra and Harley Thomas"
            className="card__image"
          />
        </div>
      </div>
    </div>
  );
}
