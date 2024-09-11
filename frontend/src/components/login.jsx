import React from 'react'

const Login = () => {
  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
        <div className="w-full border-separate border-spacing-2">
            <h2>Login</h2><br />
            <div className="">
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='Enter Username' className='border border-slate-600 rounded-md' />
            </div>
            <div className="form-group">
                <label htmlFor='password'>Password</label>
                <input type='text' placeholder='Enter Password' className='border border-slate-600 rounded-md' />
            </div>
            <div className="form-group">
                <label htmlFor='role'>Role</label>
                <select name="role" id="role" className='border border-slate-600 rounded-md'> 
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                </select>
            </div>
            <button className='bg-blue-100 p-2 m-3 rounded-md hover:bg-blue-300'>Login</button>
        </div>
    </div>
  )
}

export default Login