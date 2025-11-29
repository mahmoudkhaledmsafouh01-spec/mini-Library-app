import { Library } from "./model.js";
import { LibraryView } from "./view.js";
import { LibraryController } from "./controller.js";

const app = new LibraryController(new Library(), new LibraryView());
