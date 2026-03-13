import { makeInstaller } from "@toy-elementhh/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import printLogo from "./printLogo";
import "@toy-elementhh/theme/index.css";
import components from "./components";

printLogo();

library.add(fas);
const installer = makeInstaller(components);

export * from "@toy-elementhh/components";
export default installer;
