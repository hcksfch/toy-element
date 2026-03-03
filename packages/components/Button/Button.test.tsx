import { describe, expect, test, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";
import ButtonGroup from "./ButtonGroup.vue";
import Icon from "../Icon/Icon.vue";
import type { ButtonSize, ButtonType } from "./types";

describe("Button.vue", () => {
  it("should has the correct type class when type prop is set", () => {
    const types = [
      "primary",
      "success",
      "warning",
      "danger",
      "info",
    ] as ButtonType[];
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: {
          type,
        },
      });
      expect(wrapper.classes()).toContain(`er-button--${type}`);
    });
  });

  it("should has the correct size class when size prop is set", () => {
    const sizes = ["large", "small", "default"] as ButtonSize[];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: {
          size,
        },
      });
      expect(wrapper.classes()).toContain(`er-button--${size}`);
    });
  });

  it.each([
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])(
    "should has the correct %s class when %s prop is set to true",
    (propName, className) => {
      const wrapper = mount(Button, {
        props: {
          [propName]: true,
        },
        global: {
          stubs: ["Er-Icon"],
        },
      });
      expect(wrapper.classes()).toContain(className);
    },
  );

  it("should has the correct native type attribute when native-type prop is set", () => {
    const wrapper = mount(Button, {
      props: {
        nativeType: "submit",
      },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.element.type).toBe("submit");
  });

  it.each([
    ["withoutThrottle", false],
    ["withThrottle", true],
  ])("emits click event %s", async (_, useThrottle) => {
    const clickSpy = vi.fn();
    const wrapper = mount(() => (
      <Button onClick={clickSpy} {...{ useThrottle, throttleDuration: 400 }} />
    ));
    await wrapper.get("button").trigger("click");
    await wrapper.get("button").trigger("click");
    await wrapper.get("button").trigger("click");
    expect(clickSpy).toBeCalledTimes(useThrottle ? 1 : 3);
  });

  it("should renders the custom tag when tag prop is set", () => {
    const wrapper = mount(Button, {
      props: { tag: "a" },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });

  it("should emits a click event when the button is clicked", async () => {
    const wrapper = mount(Button, {});
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
    // expect(wrapper.emitted().click).toHaveLength(1);
  });

  it("should display the loading icon and not emit click event when button is loading", async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      global: {
        stubs: ["ErIcon"],
      },
    });
    const iconElement = wrapper.findComponent(Icon);
    expect(wrapper.find(".loading-icon").exists()).toBe(true);
    expect(iconElement.exists()).toBeTruthy();
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  const onClick = vi.fn();
  test("basic button", async () => {
    const wrapper = mount(() => (
      <Button type="primary" {...{ onClick }}>
        Button content
      </Button>
    ));

    expect(wrapper.classes()).toContain("er-button--primary");
    expect(wrapper.get("button").text()).toBe("Button content");
    await wrapper.get("button").trigger("click");
    expect(onClick).toHaveBeenCalledOnce();
  });

  test("disabled button", async () => {
    const wrapper = mount(() => (
      <Button disabled {...{ onClick }}>
        Button content
      </Button>
    ));

    expect(wrapper.classes()).toContain("is-disabled");

    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.find("button").element.disabled).toBeTruthy();

    await wrapper.get("button").trigger("click");
    expect(onClick).toHaveBeenCalledOnce();
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  test("loading button", () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        default: "loading button",
      },
      global: {
        stubs: ["ErIcon"],
      },
    });

    expect(wrapper.classes()).toContain("is-loading");

    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.find("button").element.disabled).toBeTruthy();

    wrapper.get("button").trigger("click");
    expect(wrapper.emitted()).not.toHaveProperty("click");

    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("spinner");
  });

  test("icon button", () => {
    const wrapper = mount(Button, {
      props: {
        icon: "arrow-up",
      },
      slots: {
        default: "icon button",
      },
      global: {
        stubs: ["ErIcon"],
      },
    });

    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("arrow-up");
  });
});

describe("ButtonGroup.vue", () => {
  test("basic button group", async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ));

    expect(wrapper.classes()).toContain("er-button-group");
  });

  test("button group size", async () => {
    const sizes = ["large", "small", "default"] as ButtonSize[];
    sizes.forEach((size) => {
      const wrapper = mount(() => (
        <ButtonGroup size={size}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ));

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`er-button--${size}`);
    });
  });
  test("button group type", async () => {
    const types = ["primary", "success", "warning", "danger"] as ButtonType[];
    types.forEach((type) => {
      const wrapper = mount(() => (
        <ButtonGroup type={type}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ));

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`er-button--${type}`);
    });
  });

  test("button group disabled", () => {
    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ));

    const buttonWrapper = wrapper.findComponent(Button);
    expect(buttonWrapper.classes()).toContain("is-disabled");
  });
});
