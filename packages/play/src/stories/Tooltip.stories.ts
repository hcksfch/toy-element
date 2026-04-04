import type { Meta, StoryObj } from "@storybook/vue3";

import { fn } from "@storybook/test";
import { ErTooltip } from "toy-elementhh";
import "toy-elementhh/dist/theme/Tooltip.css";

type Story = StoryObj<typeof ErTooltip>;
const meta: Meta<typeof ErTooltip> = {
  title: "Example/Tooltip",
  component: ErTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: { type: "select" },
    },
    placement: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "select" },
    },
  },
  args: {
    "onVisible-change": fn(),
  },
};

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    placement: "top",
    trigger: "hover",
  },
  render: (args) => ({
    components: { ErTooltip },
    setup() {
      return { args };
    },
    template: `<ErTooltip v-bind="args">
        <div style="width: 200px; height: 30px; background: red; padding:auto">trigger</div>
    </ErTooltip>`,
  }),
};

export default meta;
