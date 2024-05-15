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

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        username,
        password,
        email,
        nama,
      });
      console.log(response.data);

      if (response.status === 201) {
        navigate("/");
        alert("silahkan login dengan akun yang sudah anda daftarkan!");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Sudah Punya Akun?
            <span className="text-amber-400">
              <Link to="/"> Login!</Link>
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
                  required
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
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={handleNamaChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
          </form>
          <div className="text-xs text-red-600 font-semibold mt-4">
            {errorMessage}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleRegister} className="bg-amber-600">
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
