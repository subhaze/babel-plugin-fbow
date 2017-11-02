const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
// @no-fbow
const a = document.querySelector("a");
const div = document.querySelector("div");
a.remove();
div.remove();
`;

it("adds import for remove once", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
	});
	expect(code).toMatchSnapshot();
});
