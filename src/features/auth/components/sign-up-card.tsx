import { FC, useState } from "react";
import { SignInFlow } from "@/features/auth/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard: FC<SignUpCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => setPending(false));
  };

  const handleProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };
  
  return (
    <Card className="w-full h-full p-8 ">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium">
          Sign up to continue
        </CardTitle>
      </CardHeader>
      <CardDescription>Use your email and password to sign in.</CardDescription>
      {!!error && (
          <div className="bg-destructive/15 text-sm p-3 rounded-md flex items-center gap-x-2 text-destructive mb-6">
            <TriangleAlert className="size-4" />
            <p>{error}</p>
          </div>
        )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit= {handlePasswordSignUp} className="space-y-2.5">
        <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            type="text"
            className="w-full"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
            className="w-full"
            required
          />
          <Button type="submit" className="w-full" disabled={pending}>
            continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-3">
          <Button
            disabled={pending}
            variant="outline"
            className="w-full relative"
            onClick={() => handleProviderSignUp("google")}
          >
            {/*<svg className="size-5 absolute top-3 left-2.5">
              <use href="/icons.svg#google"></use>
            </svg>*/}
            <FcGoogle className="size-5 absolute top-2.5 left-2.5"/>
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            variant="outline"
            className="w-full relative"
            onClick={() => handleProviderSignUp("github")}
          >
            {/*<svg className="size-5 absolute top-3 left-2.5">
              <use href="/icons.svg#google"></use>
            </svg>*/}
            <FaGithub className="size-5 absolute top-2.5 left-2.5"/>
            Continue with Github
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Already have an account?
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
