const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
// @no-fbow
const a = document.querySelector("a");
const div = document.querySelector("div");
a.before(div);
div.before(a);
`;

it("adds import for before once", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
	});
	expect(code).toMatchSnapshot();
});
