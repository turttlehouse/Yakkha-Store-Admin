import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Status } from "../../types/status";

interface UserDataType{
    email : string,
    password : string
}


const Login = () => {
    const { status} = useAppSelector(state=>state.auth)
    // console.log(status);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();


    const [userData,setUserData]= useState<UserDataType>({
        email : "",
        password : ""
    })
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name,value} = e.target

    setUserData({
        ...userData,
        [name] : value
    })


  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(userData);
    dispatch(login(userData));
  }

  React.useEffect(()=>{
    if(status === Status.SUCCESS){
        navigate("/")
    }else{
        navigate("/login")
    }
  },[status,dispatch])
  return (
    <>
    {/* Pages: Sign In: Boxed */}

    {/* Page Container */}
    <div
        id="page-container"
        className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
      >
        {/* Page Content */}
        <main id="page-content" className="flex max-w-full flex-auto flex-col">
          <div className="relative mx-auto flex min-h-dvh w-full max-w-10xl items-center justify-center overflow-hidden p-4 lg:p-8">
            {/* Sign In Section */}
            <section className="w-full max-w-xl py-6">
              {/* Header */}
              <header className="mb-10 text-center">
                <h1 className="mb-2 inline-flex items-center gap-2 text-2xl font-bold">
                  <svg
                    className="hi-mini hi-cube-transparent inline-block size-5 text-blue-600 dark:text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Yakkha Store</span>
                </h1>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Welcome, please sign in to your dashboard
                </h2>
              </header>
              {/* END Header */}
  
              {/* Sign In Form */}
              <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
                <div className="grow p-5 md:px-16 md:py-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        onChange={handleChange}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                      />
                    </div>
                   
                    
                    <div className="space-y-1">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <input
                        onChange={handleChange}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <div className="mb-5 flex items-center justify-between gap-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            id="remember_me"
                            name="remember_me"
                            className="size-4 rounded border border-gray-200 text-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900 dark:checked:border-transparent dark:checked:bg-blue-500 dark:focus:border-blue-500"
                          />
                          <span className="ml-2 text-sm">Remember me</span>
                        </label>
                        <a
                          href="#"
                          className="inline-block text-sm font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-6 py-3 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
                      >
                        <svg
                          className="hi-mini hi-arrow-uturn-right inline-block size-5 opacity-50"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Login</span>
                      </button>
                      
                      
                    </div>
                  </form>
                </div>
                
              </div>
              {/* END Sign In Form */}
           
            </section>
            {/* END Sign In Section */}
          </div>
        </main>
        {/* END Page Content */}
      </div>
      {/* END Page Container */}
  
      {/* END Pages: Sign In: Boxed */}
    </>
    )
    {/* END Page Container */}

    {/* END Pages: Sign In: Boxed */}

  
}

export default Login