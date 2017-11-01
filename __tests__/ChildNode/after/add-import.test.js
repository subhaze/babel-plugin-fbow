const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
const a = document.querySelector("a");
const div = document.querySelector("div");
a.after(div);
div.after(a);
`;

it("adds import for after once", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
	});
	expect(code).toMatchSnapshot();
});
