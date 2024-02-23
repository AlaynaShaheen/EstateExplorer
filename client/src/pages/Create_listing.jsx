import React from "react";
import {useState} from 'react';
import {getStorage} from 'firebase/storage';
import {app} from '../firebase';
const App = () => {
  const [files,setFiles]=useState([]);
  // console.log(files);
  const handleImageSubmit=(e)=>{
    if(files.length>0 && files.length<7){
        const promises=[];
        for(let i=0;i<files.length;i++){
          promises.push(storeImage(files[i]));
        }
    }
  };
  const storeImage=async(file)=>{
    return new promises((resolve,reject)=>{
          const storage=getStorage(app);
          const fileName=new Date().getTime()+file.name;
          const uploadTask=uploadBytesResumable(storageRef,file);
          uploadTask.on(
            "state_changed",
            (error)=>{
              reject(error);
            },
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL)=>{
                resolve(DownloadURL);
              });
            }
          )

    });
  }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="100"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            maxLength="100"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            maxLength="100"
            minLength="10"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="beds"
                min="1"
                max="10"
                className="border p-3 border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="baths"
                min="1"
                max="10"
                className="border p-3 border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regular"
                min="1"
                max="10"
                className="border p-3 border-gray-300 rounded-lg"
              />
              <div className="flex flex-colitems-center gap-2">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discount"
                min="1"
                max="10"
                className="border p-3 border-gray-300 rounded-lg"
              />
              <div className="flex flex-colitems-center gap-2">
                <p>Discunted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <p className="font-semibold">Images
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span></p>
            <div className="flex gap-4">
              <input onChange={(e)=>setFiles(e.target.files)} type="file" id="images" accept='image/*' multiple />
              <button type='button' onClick={handleImageSubmit} className="text-green-700 border-green-700 p-3 hover:shadow-lg disabled:opacity-80">Upload</button>
            </div>
            <button className="bg-slate-700 text-white">Create Listing</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default App;
