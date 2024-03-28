import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from 'components/users';
import { Spinner } from 'components';

const Images = () => {
    const [isoImages, setISOImages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getISOImages = async () => {
        try {
            const res = await axios.get('/api/proxmox/getImages');
            setISOImages(res.data || []);
        } catch (err) {
            console.error('Error fetching ISO images:', err);
        }
    };

    const addISOImage = async (file) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            await axios.post('/api/proxmox/postImages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await getISOImages(); // Refresh the ISO images list after adding
        } catch (err) {
            console.error('Error adding ISO image:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getISOImages();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            addISOImage(file);
        }
    };

    return (
        <Layout>
            <div className="container">
                <h1 className="my-4">Proxmox ISO Images</h1>
                <div className="row">
                    {isoImages ? (
                        isoImages.map((image, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{image.volid}</h5>
                                        {/* Add more details or actions if needed */}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col">
                            <Spinner />
                        </div>
                    )}
                </div>
                <div className="text-center mt-4">
                    <input type="file" accept=".iso" onChange={handleFileChange} disabled={isLoading} />
                    <label className="btn btn-primary" htmlFor="fileInput">
                        {isLoading ? 'Uploading...' : 'Upload ISO Image'}
                    </label>
                </div>
            </div>
        </Layout>
    );
};

export default Images;
