import { useState, useEffect } from 'react'
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const articleRef = collection(db, "articles");
        const q = query(articleRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articles);
            console.log(articles);
        })
    }, []);
    return (
        <div>
            {articles.length === 0
                ?
                (
                    <div>
                        <p>No Articles found</p>
                    </div>
                )
                :
                (
                    <div className='py-4 grid grid-cols-1 '>
                        {articles.map((article) => (
                            <div key={article.id} className='border h-72 flex flex-col justify-between items-start'>
                                <div className='h-[200px] w-full'>
                                    <img src={article.imgUrl} alt="" className='object-cover w-full h-full' />
                                </div>
                                <div className='p-2'>
                                    <h1 className='text-left text-lg'>
                                        {article.title}
                                        <span className='ml-10 text-gray-400 text-sm'>
                                            {article.topic}
                                        </span>
                                    </h1>
                                    <div className='flex flex-col items-start'>
                                        <p>{article.description}</p>
                                        <p className='items-end'>{article.createdAt?.toDate().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default Articles