export const notes = {
	Aside: {
		side: "what stands beside the main region and stays put",
		children: "the main region",
	},
	Navigator: {
		mark: "the crest of the product this surface belongs to",
		owner: "the scope the name sits under, set quieter than the name",
		home: "where the lockup goes when a reader takes it",
		look: "plain sets the name in the display face, exact sets the whole strip as an identifier",
		stick: "keep the strip in place while the document scrolls",
		title: "the name of the surface this navigator belongs to",
		line: "one line of supporting text",
		children: "the ways out of this surface",
	},
	Board: {
		title: "the board heading",
		look: "held keeps the body padded, flush gives the whole body to what fills it, bare keeps only its composition",
		line: "optional supporting text under the heading",
		seat: "an optional anchor a link can reach",
		children: "the rows and controls inside the board",
	},
	Button: {
		children: "the label inside the button",
		sign: "a symbol drawn after the label",
		label: "a text label when children are absent",
		press: "called when the button is pressed",
		look: "solid or quiet visual emphasis",
		wide: "fill the available width",
		busy: "mark the button as working and refuse presses",
		halt: "refuse presses without claiming to be working",
		submit: "submit the nearest form",
	},
	Carousel: {
		items: "the ordered values and accessible labels available to show",
		value: "the value shown now",
		label: "the accessible name of the bounded sequence",
		pause: "the action label that stops automatic rotation",
		play: "the action label that resumes automatic rotation",
		beat: "milliseconds an automatic value remains on screen",
		lease: "milliseconds a pointer choice remains under manual control",
		fade: "milliseconds shared by the incoming and outgoing layers",
		change: "called when the shown value changes",
		children: "the specimen rendered for the shown value",
	},
	Card: {
		title: "the heading of the card",
		children: "the body of the card",
	},
	Cell: {
		span: "how many columns of the grid this cell takes",
		start: "the column it starts at, when the place is chosen",
		look: "start keeps its content intrinsic, fill gives the remaining row to it",
		children: "what stands in the cell",
	},
	Check: {
		label: "the words beside the box",
		held: "whether the box is currently ticked",
		change: "called with the next ticked state",
		look: "a box to tick or a switch to throw",
	},
	Code: {
		text: "the source text to display",
		name: "an optional file name shown above",
		copy: "show a copy control",
	},
	Copy: {
		text: "the text placed on the clipboard",
	},
	Course: {
		look: "bare for a run that states no space, plain for one that does, raise and well for the surface it carries",
		full: "give the run at least the viewport left beneath the navigation band",
		children: "the region the run centres on the page measure",
	},
	Face: {
		name: "the person or thing the face stands for",
		src: "an optional picture to show instead of initials",
	},
	Field: {
		label: "the field label",
		value: "the current field value",
		change: "called with the next field value",
		kind: "plain text or password input",
		hint: "optional placeholder text",
	},
	Fold: {
		label: "the words on the closed fold",
		open: "whether the fold stands open",
		children: "what the fold hides",
	},
	Footer: {
		text: "the colophon line the product speaks for itself",
		children: "optional content for the footer",
	},
	Forge: {
		host: "the origin of the forge that hosts the repository",
		repo: "the owner and name of a repository",
	},
	Frame: {
		children: "the whole page inside the shell",
	},
	Grid: {
		look: "cells of one height, or each at its own",
		cols: "a fixed column count, or nothing to fill by cell width",
		flow: "fold into one narrow column, or hold the declared structure",
		children: "the cells to lay out",
	},
	Head: {
		text: "the section heading",
		seat: "an optional anchor a link can reach",
	},
	Hero: {
		title: "the largest line on the page",
		line: "one line under the title",
		mark: "an optional glyph beside the title",
		look: "plain for an ordinary page title, claim for the surface's one proposition",
	},
	Item: {
		children: "the contents of one item",
	},
	Ledger: {
		atoms: "the word and count pairs to tally",
	},
	Line: {
		name: "the primary row text",
		meta: "optional secondary text",
		children: "optional controls or tags on the far side",
	},
	Link: {
		look: "text stands in prose, nav stands in a strip",
		here: "this link is the surface the reader is on",
		label: "the visible link text",
		href: "the link destination",
	},
	List: {
		children: "the list items",
	},
	Menu: {
		value: "the choice standing now, marked in the list",
		sign: "the shape the trigger shows in place of its label",
		look: "cue is a button, bare is a mark in a strip",
		label: "the words on the button that opens it",
		items: "the value and label of each entry",
		open: "whether the list stands open",
		choose: "called with the value that was picked",
	},
	Meter: {
		label: "what the bar is measuring",
		value: "a share between zero and one, or nothing while it waits",
	},
	Modal: {
		title: "the name of what the dialog is asking",
		open: "whether the dialog holds the screen",
		children: "the contents of the dialog",
	},
	Nav: {
		look: "a bar across the top or a list down the side",
		links: "the label, target, and live state of each entry",
	},
	Note: {
		text: "the message to show",
		mood: "calm or warning emphasis",
	},
	Sign: {
		name: "which symbol to draw",
		look: "a cue beside text, or a plate that carries weight",
		label: "what the symbol means, when it stands alone",
	},
	Pick: {
		label: "the label above the choices",
		value: "the value chosen now",
		choices: "the value and label pairs on offer",
		change: "called with the next chosen value",
	},
	Rail: {
		stops: "the ordered stops along the rail",
	},
	Search: {
		value: "the current query text",
		change: "called with the next query text",
		hint: "optional placeholder text",
	},
	Sheet: {
		children: "the controls and copy on the bounded surface",
	},
	Shell: {
		children: "the complete product surface",
		tone: "the light or dark preference for this surface",
		system: "the design system whose tokens dress this surface",
		slide:
			"how long the atoms take to reach their next values, instead of cutting to them",
		fade: "how long the whole surface takes to disappear or return",
		shown: "whether the surface is presently visible",
		settled: "called when the surface finishes fading out or in",
	},
	Split: {
		children: "the contents placed at opposite sides",
	},
	Stage: {
		look: "view and strip frame a specimen, pane is the surface itself, show exhibits it, open holds one stable field without a frame",
		label: "the optional identity set large behind a show",
		meta: "the optional sequence or measure beside a show's identity",
		children:
			"the one thing the stage frames, centred and cropped to its measure",
	},
	Table: {
		heads: "the column headings",
		rows: "the cells of each row in column order",
	},
	Tabs: {
		tabs: "the value and label of each tab",
		value: "the tab standing open",
		change: "called with the next open tab",
		beat: "how long each tab stands open on its own, until a reader takes one",
	},
	Tag: {
		text: "the short tag text",
		look: "a filled tag or an outlined one",
		mood: "calm or warning emphasis",
	},
	Text: {
		children: "one paragraph of prose",
	},
	Tip: {
		look: "over opens above what it explains, under opens below it",
		text: "the words the tip carries",
		children: "what the tip explains",
	},
	Toast: {
		notes: "the messages waiting to be read aloud",
		mood: "calm or warning emphasis",
	},
};
