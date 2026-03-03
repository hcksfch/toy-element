import { makeInstaller } from "@toy-elementhh/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import components from "./components";
import "@toy-elementhh/theme/index.css";

library.add(fas);
const installer = makeInstaller(components);

export * from "../components";
export default installer;
