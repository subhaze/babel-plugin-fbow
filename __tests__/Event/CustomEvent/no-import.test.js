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

it("doesn't add CustomEvent constructor import", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
		sourceType: "script",
	});
	expect(code).toMatchSnapshot();
});
