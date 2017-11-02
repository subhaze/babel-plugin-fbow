const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
// @no-fbow
const a = document.querySelector("a");
const div = document.querySelector("div");
a.closest("div");
div.closest("p");
`;

it("adds import for closest once", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
	});
	expect(code).toMatchSnapshot();
});
