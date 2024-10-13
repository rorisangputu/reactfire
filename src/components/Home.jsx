
import AddArticle from './AddArticle'
import Articles from './articles'

const Home = () => {
    return (
        <div className='w-full'>
            <div className='w-[90%] mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className=''>
                        <AddArticle />
                    </div>
                    <div className=''>
                        <Articles />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home