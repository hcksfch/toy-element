import type { Meta, StoryObj } from "@storybook/vue3";
import { ErCollapse, ErCollapseItem } from "toy-elementhh";

import "toy-elementhh/dist/theme/Collapse.css";

type Story = StoryObj<typeof ErCollapse>;

const meta: Meta<typeof ErCollapse> = {
  title: "Components/Collapse",
  component: ErCollapse,
  subcomponents: { ErCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args: any) => ({
    components: { ErCollapse, ErCollapseItem },
    setup() {
      return { args };
    },
    template: `
      <er-collapse v-bind="args">
      <er-collapse-item title="title a" name="a">
        <div>this is content a</div>
      </er-collapse-item>
      <er-collapse-item title="title b" name="b">
        <div>this is content b</div>
      </er-collapse-item>
      <er-collapse-item title="title c disable" name="c" disabled>
        <div>this is content c</div>
      </er-collapse-item>
      </er-collapse>
      `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;
