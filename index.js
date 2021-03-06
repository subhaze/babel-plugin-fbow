const importMap = require("./importMap");

const MemberExpressionKeys = Object.keys(importMap.MemberExpression);
const NewExpressionKeys = Object.keys(importMap.NewExpression);

module.exports = function main({ types: t }) {
	const addedFills = [];
	let addPolyfills = true;
	function addImport(path, polyfillPath) {
		if (addedFills.includes(polyfillPath)) return;
		addedFills.push(polyfillPath);
		const importDec = t.importDeclaration([], t.stringLiteral(polyfillPath));

		importDec._blockHoist = 3; // eslint-disable-line
		const programPath = path.find(p => p.isProgram());
		programPath.unshiftContainer("body", importDec);
	}

	return {
		name: "for-better-or-worse",
		visitor: {
			Program(path, state) {
				if (state.file.opts.sourceType === "script") return;
				const lineComments = state.file.ast.comments.filter(
					c => c.type === "CommentLine" && !!c.value.match(/@no-fbow/gi),
				);
				addPolyfills = !lineComments.length;
			},
			MemberExpression(path, state) {
				if (state.file.opts.sourceType === "script" || !addPolyfills) return;
				if (t.isIdentifier(path.node.property)) {
					if (MemberExpressionKeys.includes(path.node.property.name)) {
						addImport(
							path,
							importMap.MemberExpression[path.node.property.name],
						);
					}
				}
			},
			NewExpression(path, state) {
				if (state.file.opts.sourceType === "script" || !addPolyfills) return;
				if (t.isIdentifier(path.node.callee)) {
					if (NewExpressionKeys.includes(path.node.callee.name)) {
						addImport(path, importMap.NewExpression.CustomEvent);
					}
				}
			},
		},
	};
};
