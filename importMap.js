module.exports = {
	MemberExpression: {
		closest: "fbow/Element/closest",
		matches: "fbow/Element/matches",
		after: "fbow/ChildNode/after",
		before: "fbow/ChildNode/before",
		remove: "fbow/ChildNode/remove",
		replaceWith: "fbow/ChildNode/replaceWith",
		append: "fbow/ParentNode/append",
		prepend: "fbow/ParentNode/prepend",
	},
	NewExpression: {
		CustomEvent: "fbow/Event/CustomEvent",
	},
};
