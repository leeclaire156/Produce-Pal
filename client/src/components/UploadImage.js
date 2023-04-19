import React, { useState } from "react";
import axios from "axios";

export default function Cloudinary() {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function uploadSingleImage(base64) {
        setLoading(true);
        axios
            .post("http://localhost:3000/uploadImage", { image: base64 })
            .then((res) => {
                setUrl(res.data);
                alert("Image uploaded Succesfully");
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    function uploadMultipleImages(images) {
        setLoading(true);
        axios
            .post("http://localhost:3000/uploadMultipleImages", { images })
            .then((res) => {
                setUrl(res.data);
                alert("Image uploaded Succesfully");
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    const uploadImage = async (event) => {
        const files = event.target.files;
        console.log(files.length);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }

        const base64s = [];
        for (var i = 0; i < files.length; i++) {
            var base = await convertBase64(files[i]);
            base64s.push(base);
        }
        uploadMultipleImages(base64s);
    };

    function UploadInput() {
        return (
            <input
                onChange={uploadImage}
                id="dropzone-file"
                type="file"
                multiple
            />
        )
    }


    return (
        <div className="flex justify-center flex-col m-8 ">
            <div>
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Upload Photo
                </h2>
            </div>
            <div>
                {url && (
                    <div>
                        Access you file at{" "}
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                    </div>
                )}
            </div>
            <div>
                {loading ? (
                    <div className="flex items-center justify-center">
                        Wait! Wait! Wait!
                        {/* <img src={assets} />{" "} */}
                    </div>
                ) : (
                    <UploadInput />
                )}
            </div>
        </div>
    );
}