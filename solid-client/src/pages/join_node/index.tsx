import { JSX, createSignal } from "solid-js";
import Styles from "./join_node.module.css";

// JoinNode is the component where you register what's the node
// that the app is going to connect to
const JoinNode = (): JSX.Element => {
  const [url, setUrl] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");

  // TODO implement this in other ticket
  const connectToNode = () => {};

  return (
    <div class={Styles.page}>
      <div class={Styles.loginColumn}>
        <h3>Insert node info</h3>

        <div class={Styles.container}>
          <h4>Node's url</h4>
          <input
            type="text"
            value={url()}
            class={Styles.textInput}
            onChange={(event) => setUrl(event.target.value)}
          />

          <h4>Node's password</h4>
          <input
            type="password"
            value={password()}
            class={Styles.textInput}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button class={Styles.button} onClick={() => connectToNode()}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default JoinNode;
