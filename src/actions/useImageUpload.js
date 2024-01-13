// useImageUpload.js
import { useState } from 'react';

const useImageUpload = () => {
    const [imageUrl, setImageUrl] = useState('');

    const handleImageUpload = async (file) => {
        try {
            if (!file) {
                console.error('No photo file provided');
                return null;
            }

            const formDataImage = new FormData();
            formDataImage.append('photo', file);

            const response = await fetch('http://localhost:8000/upload-photo/', {
                method: 'POST',
                body: formDataImage,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                const imageUrl = await response.json();
                console.log('Image upload successful. Photo URL:', imageUrl.photo_url);
                setImageUrl(imageUrl.photo_url);
                return imageUrl.photo_url;
            } else {
                console.error('Failed to upload image');
                console.error('Server response:', await response.json());
                return null;
            }
        } catch (error) {
            console.error('Error during image upload:', error);
            return null;
        }
    };

    return { imageUrl, handleImageUpload };
};

export default useImageUpload;
