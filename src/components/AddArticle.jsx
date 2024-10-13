import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react'
import { db, storage } from '../firebaseConfig';
import { toast } from 'react-toastify';

const AddArticle = () => {
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        topic: "",
        description: "",
        image: "",
        createdAt: Timestamp.now().toDate()
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });

    }

    const handlePublish = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.topic || !formData.image) {
            alert('Please fill in all fields');
            return
        }

        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, formData.image);
        uploadImage.on("state_changed", (snapshot) => {
            const progresspercent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progresspercent)
        },
            (err) => {
                console.log(err);
            },
            () => {
                setFormData({
                    title: "",
                    image: "",
                    topic: "",
                    description: "",

                });
                setProgress(0);

                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    const articleRef = collection(db, "articles");
                    addDoc(articleRef, {
                        title: formData.title,
                        description: formData.description,
                        imgUrl: url,
                        topic: formData.topic,
                        createdAt: Timestamp.now().toDate()
                    })
                        .then(() => {
                            toast("Article added successfully", { type: "success" });
                            setProgress(0);
                        })
                        .catch(err => {
                            toast("Error adding article: ", err, { type: "error" });
                        })
                });
            }
        );




    }
    return (
        <div className='border p-3 my-3 bg-lime-50' >
            <h2 className='text-xl font-bold py-5'>Create Article</h2>
            <form action="" onSubmit={handlePublish} className='flex flex-col items-start gap-4'>
                <div className='flex flex-col items-start gap-2'>
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
                        name="title"
                        className='form-control border p-2'
                        id=""
                        value={formData.title}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                {/* Select Dropdown */}
                <div className='flex flex-col items-start gap-2'>
                    <label htmlFor="topic">Topic</label>
                    <select
                        id="topic"
                        name='topic'
                        className='form-control h-10 w-44 border p-1'
                        value={formData.topic}
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="">Select a topic</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                        <option value="Finance">Finance</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <label htmlFor="">Description</label>
                    <textarea
                        name="description"
                        id="" cols="40" rows="5"
                        className='border w-full p-1'
                        value={formData.description}
                        onChange={(e) => handleChange(e)}
                    ></textarea>
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <label htmlFor="">Image</label>
                    <input
                        type="file"
                        name='image'
                        accept='image/*'
                        className='bg-white p-4 w-full border'
                        onChange={(e) => handleImageChange(e)}
                    />
                    {progress === 0 ? null : (
                        <div
                            className='my-2 text-white text-center w-full'
                            style={{
                                width: `${progress}%`,
                                backgroundColor: `rgba(0, 0, 255, ${progress / 100})` // Blue color with increasing opacity
                            }}>
                            {`Uploading image ${progress}%`}
                        </div>
                    )}
                </div>
                <button type='submit' className='bg-white text-black border p-2'>Submit</button>
            </form>


        </div>
    )
}

export default AddArticle