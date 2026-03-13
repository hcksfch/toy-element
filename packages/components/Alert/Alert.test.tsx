import { describe, it, expect, vi } from "vitest";
import type { AlertType } from "./types";
import { mount } from "@vue/test-utils";
import Alert from "./Alert.vue";
import ErIcon from "../Icon/Icon.vue";
import { ErAlert } from "./index";
import { withInstall } from "@toy-elementhh/utils";

describe("Alert.vue", () => {
  const title = "Test Alert";
  const desc = "This is a test description";

  it("should render the alert with default props", () => {
    const wrapper = mount(Alert, {
      props: {
        title,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ["ErIcon"],
      },
    });
    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).toContain(desc);

    const iconElement = wrapper.findComponent(ErIcon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("xmark");

    const wrapper2 = mount(() => (
      <Alert title={title} description={desc}></Alert>
    ));
    expect(wrapper2.text()).toContain(title);
    expect(wrapper2.text()).toContain(desc);
  });

  it.each([
    ["info", "circle-info"],
    ["success", "check-circle"],
    ["warning", "circle-exclamation"],
    ["danger", "circle-xmark"],
    ["error", "circle-xmark"],
    ["non-compliance", "circle-info"],
  ])("should has the correct icon when props type is %s", (type, iconName) => {
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: false,
        showIcon: true,
        type: type as AlertType,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ["ErIcon"],
      },
    });
    const iconElement = wrapper.findComponent(ErIcon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe(iconName);
  });

  it("should emit close event when close icon is clicked", () => {
    const onClose = vi.fn();
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: true,
        showIcon: false,
        onClose,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ["ErIcon"],
      },
    });
    wrapper.findComponent(ErIcon).trigger("click");
    expect(onClose).toHaveBeenCalled();
  });

  it("should allow custom content via slots", () => {
    const wrapper = mount(Alert, {
      props: {
        title: "test title",
      },
      slots: {
        default: desc,
        title,
      },
    });
    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).toContain(desc);
    expect(wrapper.text()).not.toContain("test title");
  });

  it("should support centering text", () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        description: desc,
        center: true,
      },
    });
    const rootNode = wrapper.find(".er-alert");
    expect(rootNode.classes()).toContain("text-center");
  });

  it("should not render close icon when closable is false", () => {
    const wrapper = mount(Alert, {
      props: {
        closable: false,
      },
    });
    const closeIcon = wrapper.find(".er-alert__close");
    expect(closeIcon.exists()).toBeFalsy();
  });
});

describe("Alert/index", () => {
  it("should be exported with withInstall()", () => {
    expect(ErAlert.install).toBeDefined();
  });
  it("component should be exported", () => {
    expect(ErAlert).toBe(Alert);
  });

  it("should enhance Alert component", () => {
    const EnhancedAlert = withInstall(Alert);
    expect(EnhancedAlert).toBe(ErAlert);
  });

  it("should apply specific enhance", () => {
    const enhancedAlert = withInstall(Alert);
    expect(enhancedAlert).toHaveProperty("install");
  });
});
