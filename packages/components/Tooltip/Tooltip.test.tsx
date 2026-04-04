import { describe, test, it, expect, vi, beforeEach } from "vitest";
import { withInstall } from "@toy-elementhh/utils";
import { mount } from "@vue/test-utils";
import { ErTooltip } from ".";
import Tooltip from "./Tooltip.vue";

vi.mock("@popperjs/core");

const onVisibleChange = vi.fn();

describe("Tooltip/index.ts", () => {
  it("should be exported with witInstall", () => {
    expect(ErTooltip.install).toBeDefined();
  });

  it("should be exported Tooltip component", () => {
    expect(ErTooltip).toBe(Tooltip);
  });

  test("should enhance Tooltip component", () => {
    const enhancedTooltip = withInstall(Tooltip);
    expect(enhancedTooltip).toBe(ErTooltip);
  });

  test("should apply specific enhancements", () => {
    const enhancedTooltip = withInstall(Tooltip);
    expect(enhancedTooltip).toHaveProperty("install");
  });
});

describe("Tooltip.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  test("basic tooltip", async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Tooltip
            content="hello tooltip"
            trigger="click"
            {...{ onVisibleChange }}
          >
            <button id="trigger">trigger</button>
          </Tooltip>
        </div>
      ),
      {
        attachTo: document.body,
      },
    );

    const triggerArea = wrapper.find("#trigger");
    expect(triggerArea.exists()).toBeTruthy();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeFalsy();

    triggerArea.trigger("click");
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeTruthy();
    expect(wrapper.get(".er-tooltip__popper").text()).toBe("hello tooltip");
    expect(onVisibleChange).toHaveBeenCalledWith(true);

    triggerArea.trigger("click");
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeFalsy();
    expect(onVisibleChange).toHaveBeenCalledTimes(2);

    await vi.runAllTimers();

    triggerArea.trigger("click");
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeTruthy();

    wrapper.get("#outside").trigger("click");
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeFalsy();
    expect(onVisibleChange).toHaveBeenCalledTimes(4);

    wrapper.unmount();
  });

  test("tooltip with hover trigger", async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: "test",
        trigger: "hover",
      },
    });
    wrapper.find(".er-tooltip__trigger").trigger("mouseenter");
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeTruthy();

    wrapper.find(".er-tooltip").trigger("mouseleave");
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeFalsy();
  });

  test("tooltip with contextmenu trigger", async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: "test",
        trigger: "contextmenu",
      },
    });
    wrapper.find(".er-tooltip__trigger").trigger("contextmenu");
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeTruthy();
  });

  test("tooltip with manual trigger", async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: "test",
        manual: true,
      },
    });

    wrapper.vm.show();
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeTruthy();
    wrapper.vm.hide();
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeFalsy();

    wrapper.setProps({ disabled: true });
    await vi.runAllTimers();
    wrapper.vm.show();
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeFalsy();
  });

  test("diabled tooltip", async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: "test",
        disabled: true,
      },
    });

    wrapper.find(".er-tooltip__trigger").trigger("click");
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeFalsy();
  });

  test("tooltip with virtual trigger node", async () => {
    const virtualRef = document.createElement("div");
    let wrapper = mount(Tooltip, {
      props: {
        virtualRef,
        virtualTriggering: true,
      },
    });

    wrapper.setProps({ virtualRef });
    await vi.runAllTimers();

    virtualRef.dispatchEvent(new Event("mouseenter"));
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeTruthy();

    wrapper.setProps({ trigger: "click" });
    await vi.runAllTimers();
    virtualRef.dispatchEvent(new Event("click"));
    await vi.runAllTimers();
    expect(wrapper.find(".er-tooltip__popper").exists()).toBeTruthy();

    wrapper.unmount();
  });
});
