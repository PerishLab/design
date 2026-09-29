export const notes = {
	Aside: {
		side: "立在主区旁边并保持不动的内容",
		children: "主区内容",
	},
	Navigator: {
		mark: "这块界面所属产品的徽记",
		owner: "名字所在的域,排得比名字安静",
		home: "读者接住这枚锁型时去往何处",
		look: "plain 用展示字排名字,exact 把整条排成标识符",
		stick: "文档滚动时让这条留在原处",
		title: "这条导航所属界面的名字",
		line: "一行辅助文字",
		children: "离开这块界面的所有出口",
	},
	Board: {
		title: "面板标题",
		look: "held 让主体保持内边距,flush 把整个主体交给填充它的东西",
		line: "标题下方的可选辅助文字",
		seat: "可选的锚点,供链接抵达",
		children: "面板内的行与控件",
	},
	Button: {
		children: "按钮内的文字",
		sign: "画在文字之后的符号",
		label: "没有子节点时使用的文字标签",
		press: "按钮被按下时调用",
		look: "实心或安静的视觉强调",
		wide: "是否占满可用宽度",
		busy: "标记按钮正在工作并拒绝按压",
		halt: "拒绝按压但并不声称正在工作",
		submit: "是否提交最近的表单",
	},
	Card: {
		title: "卡片的标题",
		children: "卡片的正文",
	},
	Cell: {
		span: "这一格占据栅格的几列",
		start: "起始列,用于指定位置时",
		children: "格子里放置的内容",
	},
	Check: {
		label: "方框旁的文字",
		held: "方框当前是否被勾选",
		change: "勾选状态变化时以新值调用",
		look: "可勾选的方框或可拨动的开关",
	},
	Code: {
		text: "要展示的源码文本",
		name: "可选的文件名,显示在上方",
		copy: "是否显示复制控件",
	},
	Copy: {
		text: "写入剪贴板的文本",
	},
	Course: {
		look: "bare 不陈述空间,plain 陈述空间,raise 与 well 各自陈述它承载的表面",
		full: "让这一道至少占据导航带之下的一屏",
		children: "这一道在页面度量上居中承载的区域",
	},
	Face: {
		name: "这张面孔所代表的人或物",
		src: "可选的图片,用以替代缩写",
	},
	Field: {
		label: "字段标签",
		value: "当前字段值",
		change: "字段变化时以新值调用",
		kind: "普通文本或密码输入",
		hint: "可选的占位提示文字",
	},
	Fold: {
		label: "折叠状态下显示的文字",
		open: "当前是否展开",
		children: "折叠所隐藏的内容",
	},
	Footer: {
		text: "产品自己署上的版本说明行",
		children: "页脚的可选内容",
	},
	Forge: {
		host: "承载该仓库的代码平台源",
		repo: "仓库的所有者与名称",
	},
	Frame: {
		children: "外壳内的整个页面",
	},
	Grid: {
		look: "格子等高,或各自然高",
		cols: "固定列数,留空则按单元宽度自动填充",
		flow: "窄处折成一列,或维持声明的结构",
		children: "要排布的单元格",
	},
	Head: {
		text: "区块标题",
		seat: "可选的锚点,供链接抵达",
	},
	Hero: {
		title: "页面上最大的一行",
		line: "标题下的一行文字",
		mark: "标题旁的可选字形",
		look: "plain 用于普通页面标题,claim 用于界面的唯一命题",
	},
	Item: {
		children: "单个条目的内容",
	},
	Ledger: {
		atoms: "要统计的词与计数对",
	},
	Line: {
		name: "行的主要文字",
		meta: "可选的次要文字",
		children: "另一侧的可选控件或标签",
	},
	Link: {
		look: "text 站在散文里,nav 站在带子里",
		here: "这条链接就是读者当前所在的界面",
		label: "可见的链接文字",
		href: "链接目标",
	},
	List: {
		children: "列表项",
	},
	Menu: {
		value: "当前站着的那个选择,在列表里被标出",
		sign: "触发处以形状代替文字时画的那一个",
		look: "cue 是一颗按钮,bare 是一条带子里的一个记号",
		label: "打开菜单的按钮上的文字",
		items: "每个条目的值与文字",
		open: "列表当前是否展开",
		choose: "被选中时以该值调用",
	},
	Meter: {
		label: "这条进度条在度量什么",
		value: "0 到 1 之间的比例,留空表示仍在等待",
	},
	Modal: {
		title: "对话框所询问之事的名称",
		open: "对话框当前是否占据屏幕",
		children: "对话框的内容",
	},
	Nav: {
		look: "横贯顶部的条或沿边竖排的列表",
		links: "每个条目的文字、目标与当前态",
	},
	Note: {
		text: "要显示的消息",
		mood: "平静或警告强调",
	},
	Sign: {
		name: "画哪一个符号",
		look: "文字旁的提示,还是有分量的图版",
		label: "符号独自出现时,它代表什么",
	},
	Pick: {
		label: "选项上方的标签",
		value: "当前选中的值",
		choices: "可供选择的值与标签对",
		change: "选择变化时以新值调用",
	},
	Rail: {
		stops: "轨道上有序的站点",
	},
	Search: {
		value: "当前的查询文本",
		change: "查询文本变化时被调用",
		hint: "可选的占位提示文字",
	},
	Sheet: {
		children: "有限界面中的控件与文字",
	},
	Shell: {
		children: "完整的产品界面",
		tone: "这块界面的浅色或深色偏好",
		system: "为这块界面赋予令牌的设计系统",
		slide: "原子滑到下一组值要花多久,而不是直接切过去",
	},
	Split: {
		children: "分置两侧的内容",
	},
	Stage: {
		look: "view 与 strip 为样例取景,pane 自身就是表面,show 为一个样例展开陈列场",
		label: "show 背后放大的可选身份",
		meta: "show 身份旁的可选序号或度量",
		children: "展台取景的那一件东西,居中,超出即裁",
	},
	Table: {
		heads: "各列的表头",
		rows: "按列序排列的每行单元格",
	},
	Tabs: {
		tabs: "每个标签页的值与文字",
		value: "当前展开的标签页",
		change: "切换时以新的标签页调用",
		beat: "每个标签页自己站多久,直到读者接手为止",
	},
	Tag: {
		text: "简短的标签文字",
		look: "填充标签或描边标签",
		mood: "平静或警告强调",
	},
	Text: {
		children: "一段正文",
	},
	Tip: {
		look: "over 开在被解释之物的上方,under 开在下方",
		text: "提示所承载的文字",
		children: "提示所解释的对象",
	},
	Toast: {
		notes: "等待被朗读的消息",
		mood: "平静或警告强调",
	},
};
