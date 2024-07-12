import { JSX, createSignal } from "solid-js";
import Styles from "./login.module.css";

// Login is the component where you insert you credentials
// as an user in the node
const Login = (): JSX.Element => {
  const [url, setUrl] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");

  // TODO implement this in other ticket
  const login = () => {};

  return (
    <div class={Styles.page}>
      <div class={Styles.loginColumn}>
        <h3>Log in</h3>

        <div class={Styles.container}>
          <h4>username</h4>
          <input
            type="text"
            value={url()}
            class={Styles.textInput}
            onChange={(event) => setUrl(event.target.value)}
          />

          <h4>password</h4>
          <input
            type="password"
            value={password()}
            class={Styles.textInput}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button class={Styles.button} onClick={() => login()}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
