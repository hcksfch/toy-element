import { beforeAll, describe, expect, test, vi } from "vitest";
import { DOMWrapper, mount, type VueWrapper } from "@vue/test-utils";

import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";

const onChange = vi.fn();

let wrapper: VueWrapper,
  headers: DOMWrapper<HTMLElement>[],
  contents: DOMWrapper<HTMLElement>[];

let firstHeader: DOMWrapper<HTMLElement>,
  secondHeader: DOMWrapper<HTMLElement>,
  disabledHeader: DOMWrapper<HTMLElement>,
  firstContent: DOMWrapper<HTMLElement>,
  secondContent: DOMWrapper<HTMLElement>,
  disabledContent: DOMWrapper<HTMLElement>;

describe("Collapse.vue", () => {
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={["a"]} {...{ onChange }}>
          <CollapseItem title="title a" name="a">
            content a
          </CollapseItem>
          <CollapseItem title="title b" name="b">
            content b
          </CollapseItem>
          <CollapseItem title="title c" name="c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["ErIcon"],
        },
        attachTo: document.body,
      },
    );

    headers = wrapper.findAll(".er-collapse-item__header");
    contents = wrapper.findAll(".er-collapse-item__wrapper");

    firstHeader = headers[0]!;
    secondHeader = headers[1]!;
    disabledHeader = headers[2]!;
    firstContent = contents[0]!;
    secondContent = contents[1]!;
    disabledContent = contents[2]!;
  });

  test("测试基础结构以及对应文本", () => {
    expect(headers.length).toBe(3);
    expect(contents.length).toBe(3);
    expect(firstHeader.text()).toBe("title a");
    expect(firstContent.isVisible()).toBeTruthy();
    expect(secondHeader.classes()).not.toContain("is-active");
    expect(secondContent.isVisible()).toBeFalsy();
    expect(firstContent.text()).toBe("content a");
    expect(secondContent.text()).toBe("content b");
  });

  test("点击标题展开/关闭内容", async () => {
    await firstHeader.trigger("click");
    expect(firstContent.isVisible()).toBeFalsy();
    await secondHeader.trigger("click");
    expect(secondHeader.classes()).toContain("is-active");
    expect(secondContent.isVisible()).toBeTruthy();

    expect(firstHeader.classes()).not.toContain("is-active");
    expect(firstContent.isVisible()).toBeFalsy();
  });

  test("发送正确的事件", async () => {
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith([]);
    expect(onChange).toHaveBeenLastCalledWith(["b"]);
  });

  test("disabled 内容", async () => {
    expect(disabledHeader.classes()).toContain("is-disabled");
    onChange.mockClear();
    await disabledHeader.trigger("click");
    expect(disabledContent.isVisible()).toBeFalsy();
    expect(onChange).not.toHaveBeenCalled();
  });

  test("modelValue 变更", async () => {
    wrapper.setValue(["b"], "modelValue");
    await wrapper.vm.$nextTick();
    expect(secondHeader.classes()).toContain("is-active");
    expect(firstHeader.classes()).not.toContain("is-active");
  });

  test("手风琴模式", async () => {
    wrapper = mount(
      () => (
        <Collapse modelValue={["a"]} accordion {...{ onChange }}>
          <CollapseItem title="title a" name="a">
            content a
          </CollapseItem>
          <CollapseItem title="title b" name="b">
            content b
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["ErIcon"],
        },
        attachTo: document.body,
      },
    );

    headers = wrapper.findAll(".er-collapse-item__header");
    contents = wrapper.findAll(".er-collapse-item__wrapper");

    firstHeader = headers[0]!;
    secondHeader = headers[1]!;

    firstContent = contents[0]!;
    secondContent = contents[1]!;
    await firstHeader.trigger("click");
    await secondHeader.trigger("click");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(["b"]);
    expect(firstHeader.classes()).not.toContain("is-active");
    expect(secondHeader.classes()).toContain("is-active");
  });

  test("手风琴模式 错误处理", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    mount(
      () => (
        <Collapse modelValue={["a", "b"]} accordion {...{ onChange }}>
          <CollapseItem title="title a" name="a">
            content a
          </CollapseItem>
          <CollapseItem title="title b" name="b">
            content b
          </CollapseItem>
          <CollapseItem title="title c" name="c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["ErIcon"],
        },
      },
    );
    expect(warn.mock.calls).toMatchInlineSnapshot(
      `[
  [
    [ErUIError: [ErCollapse]:accordion mode should only have one active item],
  ],
]
`,
    );
  });
});
