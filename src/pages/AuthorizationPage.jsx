import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import getKeys from "./../lib/getKeys";
import axios from "axios";
import dateToString from "../lib/dateToString";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rePassword: '',
  });
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let emptyKeys = getKeys(formData);

    if (formData["password"] != formData["rePassword"]) {
      emptyKeys.push("password");
      emptyKeys.push("rePassword");
    }

    if (errors.length > 0 || emptyKeys.length > 0) {
      setErrors(emptyKeys);
      return;
    } else {
      try {
        const accountData = {
          email: formData.email,
          password: formData.password,
          creation_date: dateToString(new Date()),
          balance: 0,
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
        await axios.post("http://localhost:8800/account", accountData);
      } catch (err) {
        console.log(err);
      }

      navigate("/");
    }
  }

  return (
    <>
      <form
        className="py-4"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col space-y-2">
          <TextInput
            title={"First Name"}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required={true}
            error={errors.includes("firstName")}
          />
          <TextInput
            title={"Last Name"}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required={true}
            error={errors.includes("lastName")}
          />
          <TextInput
            title={"Email"}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
            error={errors.includes("email")}
          />
          <TextInput
            title={"Password"}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            error={errors.includes("password")}
            icon={
              <>
                <button
                  onClick={(e) => {
                    setShowPassword(!showPassword);
                    e.preventDefault();
                  }}
                >
                  {
                    showPassword ?
                      <Eye size={32} /> :
                      <EyeSlash size={32} />
                  }
                </button>
              </>
            }
          />
          <TextInput
            title={"Re-enter password"}
            type={showPassword ? "text" : "password"}
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            required={true}
            error={errors.includes("rePassword")}
            icon={
              <>
                <button
                  onClick={(e) => {
                    setShowPassword(!showPassword);
                    e.preventDefault();
                  }}
                >
                  {
                    showPassword ?
                      <Eye size={32} /> :
                      <EyeSlash size={32} />
                  }
                </button>
              </>
            }
          />
          <div className="py-2 w-full">
            <Button
              type={"submit"}
              onClick={(e) => handleFormSubmit(e)}
              className={"w-full uppercase font-bold"}
            >
              Submit
            </Button>
          </div>
        </div>
        <p className="py-2 text-sm text-red">
          {formData["password"] != formData["rePassword"] ?
            "Passwords need to match." : null
          }
        </p>
      </form>
    </>
  )
}

function LogInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password == "") {
      setErrors(emptyKeys);
      return;
    } else {
      try {
        const accountData = {
          email: formData.email,
          password: formData.password,
        };
        let res = await axios.get("http://localhost:8800/verify-account", {
          params: accountData
        });
        localStorage.setItem("user", res.data.account_id);
        console.log(localStorage.getItem("user"));
      } catch (err) {
        console.log(err);
      }
      
      navigate("/");
    }
  }

  return (
    <>
      <form
        className="py-4"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col space-y-2">
          <TextInput
            title={"Email"}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
            error={errors.includes("email")}
          />
          <TextInput
            title={"Password"}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            error={errors.includes("password")}
            icon={
              <>
                <button
                  onClick={(e) => {
                    setShowPassword(!showPassword);
                    e.preventDefault();
                  }}
                >
                  {
                    showPassword ?
                      <Eye size={32} /> :
                      <EyeSlash size={32} />
                  }
                </button>
              </>
            }
          />
          <div className="py-2 w-full">
            <Button
              type={"submit"}
              onClick={(e) => handleFormSubmit(e)}
              className={"w-full uppercase font-bold"}
            >
              Submit
            </Button>
          </div>
        </div>
        <p className="py-2 text-sm text-red">
          {/* If password does not match records */}
        </p>
      </form>
    </>
  )
}


export default function AuthorizationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search)
  const [signUp, setSignUp] = useState(false);

  // Update state when query params are received 
  useEffect(() => {
    let param = queryParams.get("sign-up");
    setSignUp(param == "true" ? true : false);
    console.log(signUp)
  }, [queryParams]);

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col text-3xl font-bold uppercase">
          Vintage Movie Store
        </div>
        {signUp === true ? (
          <>
            <SignUpPage />
          </>
        ) : (
          <>
            <LogInPage />
          </>
        )}
        <button className="underline" onClick={() => {
          setSearchParams({ ["sign-up"]: !signUp });
        }}>
          {signUp === true ?
            `Already have an account? Click here to log in.`
            :
            `Don't have an account? Click here to sign up.`
          }
        </button>
        <Link className="underline mt-8" to={"/"}>
          Click here to go to the website.
        </Link>
      </div>
    </>
  )
}