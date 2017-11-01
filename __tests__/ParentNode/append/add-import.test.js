const babel = require("babel-core");
const plugin = require("../../../index.js");

const testCode = `
var parent = document.createElement("div");
var p = document.createElement("p");
var p2 = document.createElement("p");
parent.append(p);
parent.append(p2);
`;

it("adds import for append once", () => {
	const { code } = babel.transform(testCode, {
		plugins: [plugin],
	});
	expect(code).toMatchSnapshot();
});
