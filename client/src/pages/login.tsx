import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/router";
import styles from "../styles/Auth.module.css";

const Login = () => {
  const { login } = useLogin();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    await login(data);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="id" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="id" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
