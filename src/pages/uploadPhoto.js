import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UploadPhoto() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // Added state for preview
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage)); // Preview the selected image
    }
  };

  const postDetails = async () => {
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "vibesincampus");
      data.append("cloud_name", "vibesincampus");

      // Apply transformations
      // data.append("transformation", "resize:scale:width_1000,quality:auto,format:auto");
      // data.append("transformation", "quality:auto:low");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/vibesincampus/image/upload",
        {
          method: "post",
          body: data,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Upload to Cloudinary failed");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      setUrl(cloudinaryData.url);

      PostPic(cloudinaryData.url);

      //  console.log(cloudinaryData.url)
    } catch (error) {
      setIsLoading(false);

      console.error("Error uploading image to Cloudinary:", error);
      // Handle the error here
    }
  };

  const PostPic = (imageUrl) => {
    try {
      fetch("https://vibes-incampus-server.vercel.app/uploadprofilepic", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          photo: imageUrl, // Use the imageUrl obtained from Cloudinary
        }),
      })
        .then((res) => {
          if (!res.ok) {
            setIsLoading(false);

            throw new Error("Update profile picture failed");
          }
          return res.json();
        })
        .then((data) => {
          setIsLoading(false);

          // console.log("Profile picture updated successfully:", data);
          // You can add further handling or update UI as needed here
          navigate("/profile");
        })
        .catch((err) => {
          setIsLoading(false);

          console.error("Error updating profile picture:", err);
        });
    } catch (error) {
      setIsLoading(false);

      console.error("Error updating profile picture:", error);
    }
  };

  // useEffect(() => {
  //   if (image) {
  //     postDetails();
  //   }
  // }, [image]);

  return (
    <div>
      <img
        className="w-[50%] mx-[25%] mt-[10%]"
        src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
        alt="vibes logo"
      />

      <h2 className="text-center text-2xl font-r tracking-wider my-3 text-gray-800">
        Your Profile Pic
      </h2>
      <h2 className="text-center text-xl font-r tracking-wider mt-2 mb-6 text-gray-500">
        Choose Square Photo
      </h2>

      <div className="mb-2 mx-[12%] font-r tracking-wider">
        <input
          className="w-full px-3 py-1 rounded-md border-2 border-gray-300 focus:outline-purple-500 bg-white"
          type="file"
          id="photo"
          name="photo"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          // Changed the onChange handler
          placeholder="Profile Picture"
        />
      </div>

      {previewImage && (
        <div className="mx-[12%] my-12">
          <img
            className="w-full"
            src={previewImage}
            alt="Selected Image Preview"
          />
        </div>
      )}

      <div className="mx-[12%] mt-10 font-r tracking-wide">
        <button
          onClick={() => {
            postDetails();
          }}
          disabled={isLoading}
          className={`${
            isLoading ? "bg-purple-500" : "bg-purple-600 py-2"
          } w-full  rounded-md text-white text-center overflow-hidden`}
        >
          {isLoading ? (
            <img
              className="h-9 mx-auto z-10"
              src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
              alt="Loading"
            /> // Replace with your loading image path
          ) : (
            <div>Upload</div>
          )}
        </button>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default UploadPhoto;

// import React, { useState, useEffect } from "react";
// import React, { useState } from "react";
// import FileInput from "../components/fileinput";

// function UploadPage() {
//   const [image, setImage] = useState("");

//   const onImageSelected = (selectedImg) => {
//     setImage(selectedImg);
//     console.log(selectedImg)
//   };

//   return (
//     <div>
//       <FileInput onImageSelected={onImageSelected} />

//       <p>{image}</p>
//     </div>
//   );
// }

// export default UploadPage;

// import { useNavigate } from "react-router-dom";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "../components/cropImage";

//   const navigate = useNavigate();
//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null); // Added state for preview
//   const [isLoading, setIsLoading] = useState(false);
//   const [updatedimg, setUpdatedimg] = useState("");

//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   // Handle file input change
//   const handleFileChange = (event) => {
//     const selectedImage = event.target.files[0];
//     if (selectedImage) {
//       setImage(selectedImage);
//       setPreviewImage(URL.createObjectURL(selectedImage)); // Preview the selected image
//     }
//   };

//   const postDetails = async () => {
//     setIsLoading(true);

//     try {
//       console.log("3");
//       const croppedImageUrl = await getCroppedImg(
//         // previewImage,
//         image,
//         croppedAreaPixels
//       );

//       console.log("5");

//       const data = new FormData();
//       // data.append("file", image);
//       // data.append("file", cropPreviewImage);
//       data.append("file", await fetch(croppedImageUrl).then((r) => r.blob()));

//       data.append("upload_preset", "vibesincampus");
//       data.append("cloud_name", "vibesincampus");

//       const cloudinaryResponse = await fetch(
//         "https://api.cloudinary.com/v1_1/vibesincampus/image/upload",
//         {
//           method: "post",
//           body: data,
//           headers: {
//             "X-Requested-With": "XMLHttpRequest",
//           },
//         }
//       );

//       if (!cloudinaryResponse.ok) {
//         throw new Error("Upload to Cloudinary failed");
//       }

//       const cloudinaryData = await cloudinaryResponse.json();
//       PostPic(cloudinaryData.url);

//       //  console.log(cloudinaryData.url)
//     } catch (error) {
//       setIsLoading(false);

//       console.error("Error uploading image to Cloudinary:", error);
//       // Handle the error here
//     }
//   };

//   const PostPic = (imageUrl) => {
//     try {
//       fetch("http://localhost:5000/uploadprofilepic", {
//         method: "put",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + localStorage.getItem("jwt"),
//         },
//         body: JSON.stringify({
//           photo: imageUrl, // Use the imageUrl obtained from Cloudinary
//         }),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             setIsLoading(false);

//             throw new Error("Update profile picture failed");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setIsLoading(false);

//           // console.log("Profile picture updated successfully:", data);
//           // You can add further handling or update UI as needed here
//           navigate("/profile");
//         })
//         .catch((err) => {
//           setIsLoading(false);

//           console.error("Error updating profile picture:", err);
//         });
//     } catch (error) {
//       setIsLoading(false);

//       console.error("Error updating profile picture:", error);
//     }
//   };

//   // useEffect(() => {
//   //   if (image) {
//   //     postDetails();
//   //   }
//   // }, [image]);

//   const onCancel = () => {
//     setPreviewImage(null);
//   };

//   // const onCropComplete = (croppedArea, croppedAreaPixels) => {
//   //   // console.log(croppedArea, croppedAreaPixels);
//   //   setCroppedAreaPixels(croppedAreaPixels);
//   //   // setPreviewImage(null);
//   //   postDetails();

//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     if (croppedAreaPixels) {
//       console.log("2");
//       console.log(croppedArea, croppedAreaPixels);

//       setCroppedAreaPixels(croppedAreaPixels);
//       // postDetails();
//     }
//   };

//   const onCropButtonClick = () => {
//     console.log("1");
//     onCropComplete(); // Call onCropComplete when the crop button is clicked
//     postDetails();
//   };

//   return (
//     <div>
//       {!previewImage && (
//         <div>
//           <img
//             className="w-[50%] mx-[25%] mt-[10%]"
//             src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
//             alt="vibes logo"
//           />

//           <h2 className="text-center text-2xl font-r tracking-wider my-6 text-gray-800">
//             Your Profile Pic
//           </h2>

//           <div className="mb-2 mx-[12%] font-r tracking-wider">
//             <input
//               className="w-full px-3 py-1 rounded-md border-2 border-gray-300 focus:outline-purple-500 bg-white"
//               type="file"
//               id="photo"
//               name="photo"
//               accept=".jpg,.jpeg,.png"
//               onChange={handleFileChange}
//               // Changed the onChange handler
//               placeholder="Profile Picture"
//             />
//           </div>
//         </div>
//       )}

//       {/* {previewImage && (
//         <div className="mx-[12%] my-12">
//           <img
//             className="w-full"
//             src={previewImage}
//             alt="Selected Image Preview"
//           />
//         </div>
//       )} */}

//       {previewImage && (
//         <div className="mx-[12%] my-12">
//           <div className="fixed top-0 left-0 right-0 bottom-40 bg-black">
//             <Cropper
//               image={previewImage}
//               crop={crop}
//               zoom={zoom}
//               aspect={4 / 5}
//               onCropChange={setCrop}
//               onCropComplete={onCropComplete}
//               onZoomChange={setZoom}
//               OnCancel={onCancel}
//             />
//           </div>
//           <div className="fixed bottom-0 left-0 h-60 bg-black w-dvw px-[12%] z-10">
//             <button
//               onClick={onCropButtonClick}
//               className={`${
//                 isLoading ? "bg-purple-500" : "bg-purple-400 py-3"
//               } w-[78%] absolute top-10  rounded-md text-white text-center overflow-hidden hover:border-2 border-purple-500`}
//             >
//               Crop
//             </button>
//             <button
//               onClick={onCancel}
//               className={`${
//                 isLoading ? "bg-purple-500" : "bg-white py-3"
//               } w-[78%] absolute top-28  rounded-md text-gray-700 text-center overflow-hidden hover:border-2 border-purple-500`}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <br />
//       <br />
//       <br />
//     </div>
//   );
// }

// export default UploadPhoto;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Cropper from "react-easy-crop";
// // import { getCroppedImg } from "../components/cropImage";

// function UploadPhoto() {
//   const navigate = useNavigate();
//   const [image, setImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null); // Added state for preview
//   const [isLoading, setIsLoading] = useState(false);
//   const [updatedimg, setUpdatedimg] = useState("");

//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   // Handle file input change
//   const handleFileChange = (event) => {
//     const selectedImage = event.target.files[0];
//     if (selectedImage) {
//       setImage(selectedImage);
//       setPreviewImage(URL.createObjectURL(selectedImage)); // Preview the selected image
//     }
//   };

//   const createImage = (url) =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.addEventListener("load", () => resolve(image));
//     image.addEventListener("error", (error) => reject(error));
//     image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
//     image.src = url;
//   });

// function getRadianAngle(degreeValue) {
//   return (degreeValue * Math.PI) / 180;
// }

// /**
//  * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
//  * @param {File} image - Image File url
//  * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
//  * @param {number} rotation - optional rotation parameter
//  */
//  const getCroppedImg = async (image,
//   croppedAreaPixels) => {
//   const image = await createImage(image);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   const maxSize = Math.max(image.width, image.height);
//   const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

//   // set each dimensions to double largest dimension to allow for a safe area for the
//   // image to rotate in without being clipped by canvas context
//   canvas.width = safeArea;
//   canvas.height = safeArea;

//   // translate canvas context to a central location on image to allow rotating around the center.
//   ctx.translate(safeArea / 2, safeArea / 2);
//   ctx.rotate(getRadianAngle(rotation));
//   ctx.translate(-safeArea / 2, -safeArea / 2);

//   // draw rotated image and store data.
//   ctx.drawImage(
//     image,
//     safeArea / 2 - image.width * 0.5,
//     safeArea / 2 - image.height * 0.5
//   );
//   const data = ctx.getImageData(0, 0, safeArea, safeArea);

//   // set canvas width to final desired crop size - this will clear existing context
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;

//   // paste generated rotate image with correct offsets for x,y crop values.
//   ctx.putImageData(
//     data,
//     Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
//     Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
//   );

//   // As Base64 string
//   // return canvas.toDataURL('image/jpeg');

//   // As a blob
//   return new Promise((resolve) => {
//     canvas.toBlob((file) => {
//       console.log(file);
//       resolve(URL.createObjectURL(file));
//     }, "image/jpeg");
//   });
// }

//   const postDetails = async () => {
//     setIsLoading(true);

//     try {
//       console.log("3");
//       const croppedImageUrl = await getCroppedImg(
//         // previewImage,
//         image,
//         croppedAreaPixels
//       );

//       console.log("5");

//       const data = new FormData();
//       // data.append("file", image);
//       // data.append("file", cropPreviewImage);
//       data.append("file", await fetch(croppedImageUrl).then((r) => r.blob()));

//       data.append("upload_preset", "vibesincampus");
//       data.append("cloud_name", "vibesincampus");

//       const cloudinaryResponse = await fetch(
//         "https://api.cloudinary.com/v1_1/vibesincampus/image/upload",
//         {
//           method: "post",
//           body: data,
//           headers: {
//             "X-Requested-With": "XMLHttpRequest",
//           },
//         }
//       );

//       if (!cloudinaryResponse.ok) {
//         throw new Error("Upload to Cloudinary failed");
//       }

//       const cloudinaryData = await cloudinaryResponse.json();
//       PostPic(cloudinaryData.url);

//       //  console.log(cloudinaryData.url)
//     } catch (error) {
//       setIsLoading(false);

//       console.error("Error uploading image to Cloudinary:", error);
//       // Handle the error here
//     }
//   };

//   const PostPic = (imageUrl) => {
//     try {
//       fetch("http://localhost:5000/uploadprofilepic", {
//         method: "put",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + localStorage.getItem("jwt"),
//         },
//         body: JSON.stringify({
//           photo: imageUrl, // Use the imageUrl obtained from Cloudinary
//         }),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             setIsLoading(false);

//             throw new Error("Update profile picture failed");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setIsLoading(false);

//           // console.log("Profile picture updated successfully:", data);
//           // You can add further handling or update UI as needed here
//           navigate("/profile");
//         })
//         .catch((err) => {
//           setIsLoading(false);

//           console.error("Error updating profile picture:", err);
//         });
//     } catch (error) {
//       setIsLoading(false);

//       console.error("Error updating profile picture:", error);
//     }
//   };

//   // useEffect(() => {
//   //   if (image) {
//   //     postDetails();
//   //   }
//   // }, [image]);

//   const onCancel = () => {
//     setPreviewImage(null);
//   };

//   // const onCropComplete = (croppedArea, croppedAreaPixels) => {
//   //   // console.log(croppedArea, croppedAreaPixels);
//   //   setCroppedAreaPixels(croppedAreaPixels);
//   //   // setPreviewImage(null);
//   //   postDetails();

//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     if (croppedAreaPixels) {
//       console.log("2");
//       console.log(croppedArea, croppedAreaPixels);

//       setCroppedAreaPixels(croppedAreaPixels);
//       // postDetails();
//     }
//   };

//   const onCropButtonClick = () => {
//     console.log("1");
//     onCropComplete(); // Call onCropComplete when the crop button is clicked
//     // postDetails();
//   };

//   return (
//     <div>
//       {!previewImage && (
//         <div>
//           <img
//             className="w-[50%] mx-[25%] mt-[10%]"
//             src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
//             alt="vibes logo"
//           />

//           <h2 className="text-center text-2xl font-r tracking-wider my-6 text-gray-800">
//             Your Profile Pic
//           </h2>

//           <div className="mb-2 mx-[12%] font-r tracking-wider">
//             <input
//               className="w-full px-3 py-1 rounded-md border-2 border-gray-300 focus:outline-purple-500 bg-white"
//               type="file"
//               id="photo"
//               name="photo"
//               accept=".jpg,.jpeg,.png"
//               onChange={handleFileChange}
//               // Changed the onChange handler
//               placeholder="Profile Picture"
//             />
//           </div>
//         </div>
//       )}

//       {/* {previewImage && (
//         <div className="mx-[12%] my-12">
//           <img
//             className="w-full"
//             src={previewImage}
//             alt="Selected Image Preview"
//           />
//         </div>
//       )} */}

//       {previewImage && (
//         <div className="mx-[12%] my-12">
//           <div className="fixed top-0 left-0 right-0 bottom-40 bg-black">
//             <Cropper
//               image={previewImage}
//               crop={crop}
//               zoom={zoom}
//               aspect={4 / 5}
//               onCropChange={setCrop}
//               onCropComplete={onCropComplete}
//               onZoomChange={setZoom}
//               OnCancel={onCancel}
//             />
//           </div>
//           <div className="fixed bottom-0 left-0 h-60 bg-black w-dvw px-[12%] z-10">
//             <button
//               onClick={onCropButtonClick}
//               className={`${
//                 isLoading ? "bg-purple-500" : "bg-purple-400 py-3"
//               } w-[78%] absolute top-10  rounded-md text-white text-center overflow-hidden hover:border-2 border-purple-500`}
//             >
//               Crop
//             </button>
//             <button
//               onClick={onCancel}
//               className={`${
//                 isLoading ? "bg-purple-500" : "bg-white py-3"
//               } w-[78%] absolute top-28  rounded-md text-gray-700 text-center overflow-hidden hover:border-2 border-purple-500`}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <br />
//       <br />
//       <br />
//     </div>
//   );
// }

// export default UploadPhoto;
































// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Cropper from "react-easy-crop";

// import getCroppedImg from "../utils/cropImage";

// function UploadPhoto() {
//   // const inputRef = React.useRef();
//   const navigate = useNavigate();

//   // const triggerFileSelectPopup = () => inputRef.current.click();

//   const [image, setImage] = useState(null);
//   const [croppedArea, setCroppedArea] = useState(null);

//   // const [previewImage, setPreviewImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [img, setImg] = useState("")

//   const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
//     setCroppedArea(croppedAreaPixels);
//   };

//   const onSelectFile = (event) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.readAsDataURL(event.target.files[0]);
//       reader.addEventListener("load", () => {
//         setImage(reader.result);
//       });
//     }
//   };
//   // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   //   const [a, setA] = useState("");

//   const handleFileChange = (event) => {
//     // const selectedImage = event.target.files[0];
//     // if (selectedImage) {
//     //   setImage(selectedImage);
//     //   // setPreviewImage(URL.createObjectURL(selectedImage));
//     // }
//     const croppedImageBlob = getCroppedImg(image, croppedArea);
//       const croppedFile = new File([croppedImageBlob], "cropped-image.jpg");
//       setImg(URL.createObjectURL(croppedFile))
//   };

//   const postDetails = async () => {
//     // const onDownload = () => {
//     //   generateDownload(image, croppedArea);
//     // };




//     setIsLoading(true);

//     try {
//       // const croppedImageBlob = await getCroppedImg(image, croppedArea);
//       // const croppedFile = new File([croppedImageBlob], "cropped-image.jpg");
//       // setImg(URL.createObjectURL(croppedFile))
//       // console.log(croppedFile);
//       console.log(image);
//       console.log(img)

//       const data = new FormData();
//       // data.append("file", image);
//       data.append("file", img);

//       data.append("upload_preset", "vibesincampus");
//       data.append("cloud_name", "vibesincampus");

//       const cloudinaryResponse = await fetch(
//         "https://api.cloudinary.com/v1_1/vibesincampus/image/upload",
//         {
//           method: "post",
//           body: data,
//           headers: {
//             "X-Requested-With": "XMLHttpRequest",
//           },
//         }
//       );

//       if (!cloudinaryResponse.ok) {
//         const errorMessage = await cloudinaryResponse.text();
//         throw new Error(`Upload to Cloudinary failed: ${errorMessage}`);
//       }

//       const cloudinaryData = await cloudinaryResponse.json();
//       console.log("Cloudinary Response:", cloudinaryData);

//       // const cloudinaryData = await cloudinaryResponse.json();
//       postPic(cloudinaryData.url);
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error uploading image to Cloudinary second:", error);
//     }
//   };

//   const postPic = (imageUrl) => {
//     try {
//       fetch("http://localhost:5000/uploadprofilepic", {
//         method: "put",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + localStorage.getItem("jwt"),
//         },
//         body: JSON.stringify({
//           photo: imageUrl,
//         }),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             setIsLoading(false);
//             throw new Error("Update profile picture failed");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setIsLoading(false);
//           navigate("/profile");
//         })
//         .catch((err) => {
//           setIsLoading(false);
//           console.error("Error updating profile picture:", err);
//         });
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error updating profile picture:", error);
//     }
//   };

//   const onCancel = () => {
//     setImage(null);
//   };

//   //   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//   //     if (croppedAreaPixels) {
//   //       console.log("2");
//   //       console.log(croppedArea, croppedAreaPixels);

//   //       setCroppedAreaPixels(croppedAreaPixels);
//   //     }
//   //   };

//   const onCropButtonClick = () => {
//     console.log("1");
//     postDetails();
//     // random();
//   };

//   return (
//     <div>
//       {!image && (
//         <div>
//           <img
//             className="w-[50%] mx-[25%] mt-[10%]"
//             src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
//             alt="vibes logo"
//           />

//           <h2 className="text-center text-2xl font-r tracking-wider my-6 text-gray-800">
//             Your Profile Pic
//           </h2>

//           <div className="mb-2 mx-[12%] font-r tracking-wider">
//             <input
//               className="w-full px-3 py-1 rounded-md border-2 border-gray-300 focus:outline-purple-500 bg-white"
//               type="file"
//               id="photo"
//               name="photo"
//               accept=".jpg,.jpeg,.png"
//               onChange={onSelectFile}
//               placeholder="Profile Picture"
//             />
//           </div>
//         </div>
//       )}

//       {image && (
//         <div className="mx-[12%] my-12">
//           <div className="fixed top-0 left-0 right-0 bottom-40 bg-black">
//             <Cropper
//               image={image}
//               crop={crop}
//               zoom={zoom}
//               aspect={4 / 5}
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//             />
//           </div>
//           <div className="fixed bottom-0 left-0 h-60 bg-black w-dvw px-[12%] z-10">
//             <button
//               onClick={onCropButtonClick}
//               className={`${
//                 isLoading ? "bg-purple-500" : "bg-purple-400 py-3"
//               } w-[78%] absolute top-10  rounded-md text-white text-center overflow-hidden hover:border-2 border-purple-500`}
//             >
//               Crop
//             </button>
//             <button
//               onClick={onCancel}
//               className={`${
//                 isLoading ? "bg-purple-500" : "bg-white py-3"
//               } w-[78%] absolute top-28  rounded-md text-gray-700 text-center overflow-hidden hover:border-2 border-purple-500`}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <br />
//       <br />
//       <br />
//     </div>
//   );
// }

// export default UploadPhoto;
