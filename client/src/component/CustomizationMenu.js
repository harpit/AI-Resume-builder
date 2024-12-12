// CustomizationMenu Component (Updated)
import React, { useState } from 'react';
import './css/customizationMenu.css';

const CustomizationMenu = ({
  onThemeChange,
  onFontChange,
  onColorChange,
  applyPalette,
}) => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const colorPalettes = [
    {
      name: 'Ocean Breeze',
      headingColor: '#1E3D59',
      paragraphColor: '#4CAF50',
    },
    {
      name: 'Sunset Glow',
      headingColor: '#FF5733',
      paragraphColor: '#FFC300',
    },
    {
      name: 'Mint Fresh',
      headingColor: '#2ECC71',
      paragraphColor: '#1ABC9C',
    },
    {
      name: 'Royal Elegance',
      headingColor: '#6C3483',
      paragraphColor: '#5DADE2',
    },
    {
      name: 'Custom', // Option for user-defined colors
      headingColor: '',
      paragraphColor: '',
    },
  ];

  const handlePaletteChange = (palette) => {
    if (palette.name === 'Custom') return; // Custom option requires individual color input
    applyPalette(palette.headingColor, palette.paragraphColor);
  };

  return (
    <div className="customization-menu">
      <h3>Customization Menu</h3>
      
      {/* Existing customization options */}
      <div className="customization-item">
        <label>Theme:</label>
        <select onChange={(e) => onThemeChange(e.target.value)}>
          <option value="default">Default</option>
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
        </select>
      </div>

      <div className="customization-item">
        <label>Font:</label>
        <select onChange={(e) => onFontChange(e.target.value)}>
          <option value="Helvetica">Helvetica</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      <div className="customization-item">
        <label>Text Color:</label>
        <input type="color" onChange={(e) => onColorChange(e.target.value)} />
      </div>

      {/* Color Palette Selection */}
      <div className="customization-item">
        <label>Color Palette:</label>
        <select onChange={(e) => handlePaletteChange(colorPalettes.find(p => p.name === e.target.value))}>
          {colorPalettes.map((palette) => (
            <option key={palette.name} value={palette.name}>
              {palette.name}
            </option>
          ))}
        </select>
      </div>

      {/* Custom heading and paragraph color for 'Custom' palette */}
      {backgroundColor === 'Custom' && (
        <div className="customization-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <label>Custom Heading Color:</label>
          <input
            type="color"
            onChange={(e) => applyPalette(e.target.value, null)}
          />

          <label>Custom Paragraph Color:</label>
          <input
            type="color"
            onChange={(e) => applyPalette(null, e.target.value)}
          />
        </div>
      )}

      <button className="reset-btn" onClick={() => applyPalette('#000000', '#000000')}>
        Reset to Default
      </button>
    </div>
  );
};

export default CustomizationMenu;
