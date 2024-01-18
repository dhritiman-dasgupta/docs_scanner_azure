// src/components/WebcamComponent.tsx

import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { Button } from '@mui/material';

const Camera = ({ webcamRef }: { webcamRef: React.RefObject<Webcam> }) => {


    useEffect(() => {
        const initializeCamera = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log("usb", devices);

            // Find the desired camera (you may need to adjust this based on your device label)
            const usbCamera = devices.find(device => device.deviceId === 'abb9bba4a05dd3ee4bca4d7945efb40990043b7a38fa18ce56fbbe3fb448b5e3');

            // If a USB camera is found, set the deviceId for getUserMedia
            if (usbCamera) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia();

                    if (webcamRef.current?.video) {
                        webcamRef.current.video.srcObject = stream;
                    }
                } catch (error) {
                    console.error('Failed to access the camera with 4K resolution:', error);
                }
            } else {
                console.error('USB camera not found.');
            }
        };

        initializeCamera();
    }, []);


    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ borderRadius: "20px" }}
            />
        </div >
    );
};

export default Camera;
