/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Camera from '../../shared/camera/Camera'
import Navbar from '../../shared/navbar/Navbar'
import ImageList from '../../shared/imageList/ImageList'
import { Button, Container } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf'

import "./home.css";
import Webcam from 'react-webcam'


const Home = () => {
    const webcamRef = useRef<Webcam>(null);
    const [imageArray, setImageArray] = useState<string[]>([]);
    const dataURItoBlob = (dataURI: string) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const deleteImageByIndex = (indexToDelete: number) => {
        const updatedArray = imageArray.filter((_, index) => index !== indexToDelete);
        setImageArray(updatedArray);
    };


    const captureHighQualityImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 4096; // 4K width
        canvas.height = 2394; // 4K height
        const context = canvas.getContext('2d');

        if (context && webcamRef.current?.video) {
            // Capture the full-size image
            context.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);

            // Define the crop dimensions
            // const cropLeft = 1005;
            // const cropTop = 700;
            // const cropRight = 1100;
            // const cropBottom = 550;
            // // Calculate the new dimensions after cropping
            // const cropX = cropLeft;
            // const cropY = cropTop;
            // const cropWidth = canvas.width - cropLeft - cropRight;
            // const cropHeight = canvas.height - cropTop - cropBottom;

            // // Crop the image
            // const croppedImage = context.getImageData(cropX, cropY, cropWidth, cropHeight);

            // // Set canvas dimensions to cropped size
            // canvas.width = cropWidth;
            // canvas.height = cropHeight;

            // // Draw the cropped image onto the canvas
            // context.putImageData(croppedImage, 0, 0);

            // Convert the canvas content to a data URL
            const highQualityImage = canvas.toDataURL('image/png');

            if (highQualityImage) {
                setImageArray(prev => [...prev, highQualityImage]);
            }
        }
    };

    const capture = () => {
        if (webcamRef.current) {
            captureHighQualityImage();
        }
    };
    const generatePDFFromDataURIs = (dataURIs: any[]) => {
        const pdf = new jsPDF();

        dataURIs.forEach((dataURI, index) => {
            const blob = dataURItoBlob(dataURI);
            const url = URL.createObjectURL(blob);

            if (index !== 0) {
                pdf.addPage();
            }

            pdf.addImage(url, 'JPEG', 15, 60, 180, 160); // Adjust dimensions as needed
        });
        pdf.save('generated.pdf');
    };

    const handleGeneratePDF = useCallback(() => {
        generatePDFFromDataURIs(imageArray);
    }, [generatePDFFromDataURIs, imageArray]);

    const handleKeyDown = useCallback((event: any) => {
        console.log(event.keyCode)
        if (event.keyCode === 13) {
            handleGeneratePDF();
        }
        else if (event.keyCode === 32) {
            capture();
        }
    }, [capture, handleGeneratePDF]);

    useEffect(() => {
        const onKeyDown = (event: any) => {
            handleKeyDown(event);
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="home-main-container">
            <Navbar />
            <div className='render-container'>
                <Container className='image-and-btn-container'>
                    <Camera webcamRef={webcamRef} />
                    <div className='btn-container'>
                        <div className="title-container">
                            <span className='title'>Portable
                                Document Scanner
                            </span>
                            <span className='sub-title'>Empower your mobility with our ultra-compact document scanner, turning every space into a productive scanning hub.</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <button className='button-79' onClick={capture} data-action="capture" tabIndex={0}>
                                Capture
                            </button>
                            <button className='button-80' onClick={handleGeneratePDF} data-action="generatePDF" tabIndex={0}>
                                Make Pdf
                            </button>
                        </div>
                    </div>
                </Container>
                <Container>
                    <div style={{ marginTop: "2rem" }}>
                        <ImageList imageArray={imageArray} deleteImageByIndex={deleteImageByIndex} />
                    </div>
                </Container>
            </div >
        </div >
    )
}

export default Home