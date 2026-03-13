import type { StoryObj, Meta, ArgTypes } from "@storybook/vue3";
import { ref, watch } from "vue";
import { fn } from "@storybook/test";
import { ErAlert, type AlertInstance } from "toy-elementhh";
import "toy-elementhh/dist/theme/Alert.css";

type Story = StoryObj<typeof ErAlert> & { argTypes?: ArgTypes };

const meta: Meta<typeof ErAlert> = {
  title: "Example/Alert",
  component: ErAlert,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "info", "danger"],
    },
    effect: {
      control: "select",
      options: ["light", "dark"],
    },
    center: {
      control: "boolean",
    },
  },
  args: {
    onClose: fn(),
  },
};

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: "标题",
    description: "这是一段描述",
    type: "success",
    effect: "light",
    closable: true,
    showIcon: true,
    visible: true,
  } as any,
  render: (args: { visible: boolean }) => ({
    components: { ErAlert },
    setup() {
      const alertRef = ref<AlertInstance>();
      watch(
        () => args.visible,
        (newVal: boolean) => {
          if (newVal) {
            alertRef.value?.open();
          } else {
            alertRef.value?.close();
          }
        },
      );
      return { args, alertRef };
    },
    template: `<ErAlert v-bind="args" ref="alertRef" />`,
  }),
};

export default meta;
