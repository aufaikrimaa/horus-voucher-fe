import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        }
      );

      //   console.log(response.data);
      const data = response.data;
      const now = new Date();
      const expires = new Date(now.getTime() + 5 * 60 * 60 * 1000);
      const expiresString = expires.toUTCString();
      document.cookie = `token=${data.token}; Secure; SameSite=Strict; Expires=${expiresString}; path=/;`;
      localStorage.setItem("userData", JSON.stringify(data.data));

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Belum Punya Akun?
            <span className="text-amber-400">
              <Link to="/register"> Register!</Link>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </form>
          <div className="text-xs text-red-600 font-semibold mt-4">
            {errorMessage}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleLogin} className="bg-amber-600">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
