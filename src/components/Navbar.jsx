
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='w-full'>
            <div className="w-[90%] mx-auto">
                <div className='flex items-center justify-between'>
                    <h1>Blog</h1>

                    <Link to='/' className='hover:bg-green-700 hover:p-2 hover:text-white'>
                        Home
                    </Link>

                    <div className='flex gap-4 items-center'>
                        <p className='text-lg'>Profile</p>
                        <button className='p-2 bg-blue-700 text-white'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar