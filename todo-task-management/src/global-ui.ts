import type { App } from "vue";
import AppButton from "../components/ui/AppButton.vue";
import AppInput from "../components/ui/AppInput.vue";
import AppTextArea from "../components/ui/AppTextArea.vue";

export default {
  install(app: App) {
    app.component("AppButton", AppButton);
    app.component("AppInput", AppInput);
    app.component("AppTextArea", AppTextArea);
  }
};
