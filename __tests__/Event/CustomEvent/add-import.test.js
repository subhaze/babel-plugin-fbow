const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
obj.addEventListener("cat", function(e) { process(e.detail) });
var event = new CustomEvent("cat", {
  detail: {
    hazcheeseburger: true
  }
});
obj.dispatchEvent(event);
`;

it("adds import for CustomEvent constructor once", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
	});
	expect(code).toMatchSnapshot();
});
