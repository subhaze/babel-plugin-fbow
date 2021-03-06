const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
// @no-fbow
const a = document.querySelector("a");
const div = document.querySelector("div");
a.after(div);
div.after(a);
`;

it("doesn't add after import", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
	});
	expect(code).toMatchSnapshot();
});
