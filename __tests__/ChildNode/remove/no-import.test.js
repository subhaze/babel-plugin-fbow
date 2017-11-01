const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
const a = document.querySelector("a");
const div = document.querySelector("div");
a.remove();
div.remove();
`;

it("doesn't add remove import", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
		sourceType: "script",
	});
	expect(code).toMatchSnapshot();
});
