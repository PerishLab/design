import type { ComponentType, ReactNode } from "react";

export function hook<Props extends object>(
	read: () => Props,
	View: ComponentType<Props>,
): ComponentType {
	return function Hook(): ReactNode {
		return <View {...read()} />;
	};
}
