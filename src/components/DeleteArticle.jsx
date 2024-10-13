import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db, storage } from '../firebaseConfig'
import { deleteObject, ref } from 'firebase/storage'

const DeleteArticle = ({ id, imgUrl }) => {

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "articles", id))
            toast("Article deleted succesfully", { type: "success" });
            const storageRef = ref(storage, imgUrl)
            await deleteObject(storageRef);

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='items-start flex my-2'>
            <button onClick={handleDelete} className='bg-red-700 p-2 hover:bg-red-500'>Delete</button>
        </div>
    )
}

export default DeleteArticle