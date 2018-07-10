import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import conditionalRender, { every, isArray, toArray, all } from "../index";

Enzyme.configure({ adapter: new Adapter() });

const Component = () => (
  <div>
    <h1>MOCK COMPONENT</h1>
  </div>
);

const ConditionalComponent = conditionalRender(Component);

describe("conditionalRender", () => {
  let conditionalCmpt;

  beforeEach(() => {
    conditionalCmpt = mount(<ConditionalComponent condition={false} />);
  });

  it("should detect an array", () => {
    expect(isArray([1, 2, 3])).toBeTruthy();
    expect(isArray("foo")).toBeFalsy();
  });

  it("should convert to an array", () => {
    expect(toArray(1)).toEqual([1]);
    expect(toArray("1")).toEqual(["1"]);
  });

  it("should properly convert an array to a bool", () => {
    expect(every([1, 2, 3])).toEqual(true);
    expect(every([1, 2, ""])).toEqual(false);
  });

  it("should test all the values", () => {
    expect(all([1, 2, 3])).toEqual(true);
    expect(all([1, 2, ""])).toEqual(false);
    expect(all(1)).toEqual(true);
    expect(all("")).toEqual(false);
  });

  it("should render a component when conditions are met", () => {
    conditionalCmpt.setProps({ condition: true });
    expect(conditionalCmpt.find("h1").length).toEqual(1);
  });

  it("should hide a component when conditions are not met", () => {
    conditionalCmpt.setProps({ condition: [true, 1, false] });
    expect(conditionalCmpt.find("h1").length).toEqual(0);
  });
});
