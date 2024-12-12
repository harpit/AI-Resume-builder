import React, { useState, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './css/editor.css';

const DraggableSection = ({ id, index, moveSection, removeSection, children, updateSectionContent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState(children);
  const sectionRef = useRef(null);

  const [, dropRef] = useDrop({
    accept: 'section',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'section',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(dropRef(sectionRef));

  const handleSave = () => {
    setIsEditing(false);
    updateSectionContent(index, editorContent);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        if (isEditing) handleSave();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing]);

  return (
    <div
      ref={sectionRef}
      className={`draggable-section ${isEditing ? 'editing' : ''}`}
      style={{
        opacity: isDragging ? 0.7 : 1,
        border: isDragging ? '2px dashed #007bff' : '1px solid transparent',
      }}
    >
      <div className="drag-handle" title="Drag to reorder">
        <i className="fas fa-grip-lines"></i>
      </div>

      {isEditing ? (
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          modules={{ toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }]] }}
        />
      ) : (
        <div className="section-content" dangerouslySetInnerHTML={{ __html: editorContent }} onClick={() => setIsEditing(true)} />
      )}

      <div className="section-controls">
        {isEditing ? (
          <button onClick={handleSave} title="Save Changes">
            <i className="fas fa-check"></i> Save
          </button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} title="Edit Content">
              <i className="fas fa-edit"></i> Edit
            </button>
            <button onClick={() => removeSection(index)} title="Remove Section" className="remove-btn">
              <i className="fas fa-trash"></i> Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DraggableSection;
