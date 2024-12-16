import React, { Fragment, useEffect, useState } from "react";
import { useUserContext } from "../Context/user";
// import hideButton from "../photos/hide.png";
// import showButton from "../../../show.png";
// import hideButton from ''
import { loginCall } from "../../ApiCalls";
import { useNavigate } from "react-router-dom";
interface User {
  name: string;
  password: string;
  showPassword: boolean;
  // token?: string;
}

function LoginForm() {
  const [user, setUser] = useState<User>({
    name: "",
    password: "",
    showPassword: false,
    // token: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useUserContext();
  // const router = useRouter();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("Token/TruckTrackingSystem");
  //   // console.log("token", token);
  //   if (token) {
  //     // router.push("/");
  //   } else {
  //     // router.push("/login");
  //   }
  // }, [router]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await loginCall({
        username: user.name,
        password: user.password,
      });
      const { accessToken: token } = data.value;

      if (token) {
        localStorage.setItem("Token/TruckTrackingSystem", token);
      }
      login({
        name: user.name,
        token: data.value,
      });
      navigate("/");
    } catch (error) {
      setErrorMessage("Proverite unete podatke");
    }
  };

  const getUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      name: value,
    }));
  };

  const getUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      password: value,
    }));
  };

  const toogleHandler = () => {
    setUser((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };
  return (
    <Fragment>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-10"></div>

      {/* Forma za prijavu */}
      <div className="flex justify-center items-center min-h-screen relative z-20">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Prijava
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Korisničko ime
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={getUserName}
                value={user.name}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Unesite Vase korisničko ime"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Lozinka
              </label>
              <div className="flex items-center gap-2">
                <input
                  type={user.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={getUserPassword}
                  value={user.password}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                  placeholder="Unesite Vasu lozinku"
                  required
                />
                <button
                  type="button"
                  className="p-2 bg-white hover:bg-gray-200 rounded-lg focus:outline-none"
                  onClick={toogleHandler}
                >
                  <img
                    src={
                      user.showPassword
                        ? "/spk/images/show.png"
                        : "/spk/images/hide.png"
                    }
                    height={25}
                    width={25}
                    alt="showPassword"
                  />
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-800 text-3xl">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Prijavi se
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginForm;
