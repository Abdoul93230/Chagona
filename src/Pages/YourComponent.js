import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";

function YourComponent() {
  const [photo, setPhoto] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (allowedImageTypes.includes(selectedFile.type)) {
        setPhoto(selectedFile);
      } else {
        alert(
          "Le fichier sélectionné n'est pas une image valide (JPEG, PNG, GIF, WebP autorisés)."
        );
      }
    }
  };

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handleSave = () => {
    // Utilisez l'objet editorRef pour accéder à l'image modifiée
    const editedPhoto = editorRef.current.getImage();

    // Envoyez editedPhoto vers votre base de données ou effectuez d'autres opérations nécessaires
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
      {photo && (
        <>
          <AvatarEditor
            ref={editorRef}
            image={photo}
            width={200}
            height={200}
            border={10}
            scale={scale}
          />
          <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={scale}
            onChange={handleScaleChange}
          />
          <button onClick={handleSave}>Enregistrer</button>
        </>
      )}
    </div>
  );
}

export default YourComponent;
