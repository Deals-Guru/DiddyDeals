// SliderGrid.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const SliderGrid = ({ sliders, onAddSlider, onEditSlider, onDeleteSlider }) => {
  return (
    <div className="section-card">
      <div className="section-header">
        <h2 className="section-title">Slider Management</h2>
        <button 
          onClick={onAddSlider}
          className="add-button purple-button"
        >
          <FontAwesomeIcon icon={faPlus} /> Add Slider
        </button>
      </div>
      
      <div className="grid-container">
        {sliders.map(slider => (
          <div key={slider.id} className="grid-item">
            <div className="grid-image-container">
              {slider.imageUrl && (
                <img 
                  src={slider.imageUrl} 
                  alt={slider.title} 
                  className="grid-image"
                />
              )}
              <div className="grid-overlay">
                <h3 className="grid-title">{slider.title}</h3>
                <p className="grid-description">{slider.description}</p>
              </div>
              <div className="grid-actions">
                <button
                  onClick={() => onEditSlider(slider)}
                  className="grid-action-button edit-grid-button"
                >
                  <FontAwesomeIcon icon={faEdit} size="xs" />
                </button>
                <button
                  onClick={() => onDeleteSlider(slider.id)}
                  className="grid-action-button delete-grid-button"
                >
                  <FontAwesomeIcon icon={faTrash} size="xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {sliders.length === 0 && (
          <div className="empty-state">
            No sliders found. Add your first slider!
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderGrid;