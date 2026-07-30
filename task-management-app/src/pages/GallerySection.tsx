import React from 'react';
import './GallerySection.css';

export const GallerySection: React.FC<{
  id?: string;
  title: string;
  specRef: string;
  children: React.ReactNode;
}> = ({ id, title, specRef, children }) => (
  <section id={id} className="gallery-section">
    <div className="gallery-section__header">
      <h2 className="gallery-section__title">{title}</h2>
      <span className="gallery-section__spec">{specRef}</span>
    </div>
    <div className="gallery-section__body">{children}</div>
  </section>
);

export const GalleryRow: React.FC<{ label?: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="gallery-row">
    {label && <span className="gallery-row__label">{label}</span>}
    <div className="gallery-row__content">{children}</div>
  </div>
);
