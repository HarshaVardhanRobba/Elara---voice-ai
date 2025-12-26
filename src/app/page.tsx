"use client";

import { authClient } from "@/lib/auth-client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { 
        data: session, 
        isPending, //loading state
        error, //error object
    } = authClient.useSession() 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onError: () => {
        window.alert("Error creating user");
      },
      onSuccess: () => {
        window.alert("User created successfully");
      }
    });
  }

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password,
    }, {
      onError: () => {
        window.alert("Error creating user");
      },
      onSuccess: () => {
        window.alert("User created successfully");
      }
    });
  }

  if (isPending) {
    return <p>Loading...</p>
  }
  
  if (session) {
    return (
      <div className="max-w-sm mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}!</h1>
        <Button onClick={() => {
          authClient.signOut();
        }}>
          Sign Out
        </Button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-sm mx-auto mt-20">
        <h1 className="text-2xl font-bold mb-4">Error: {error.message}</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
        <Input 
          placeholder="name" 
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <Input 
          placeholder="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Input 
          placeholder="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={onSubmit}>
            Create user
          </Button>
      </div>
        <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
        <Input 
          placeholder="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Input 
          placeholder="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}
